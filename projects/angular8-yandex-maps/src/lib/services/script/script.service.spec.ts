import { DOCUMENT } from '@angular/common';
import { inject, TestBed } from '@angular/core/testing';
import { merge } from 'rxjs';
import { ScriptService } from './script.service';
import { YA_CONFIG } from '../../constants/constant';
import { YaConfig } from '../../interfaces/config';

/**
 * @todo Get rid of using a real API, mock all data
 * @see {@link https://github.com/angular/components/blob/master/src/google-maps/testing/fake-google-map-utils.ts}
 */
describe('ScriptService', () => {
  const SCRIPT_ID = '#yandexMapsApiScript';
  const BASE_API_PROTOCOL = 'https://';
  const BASE_API_URL = 'api-maps.yandex.ru/';
  const BASE_API_VERSION = '2.1/';

  let document: Document;
  let window: Window;

  const reset = () => {
    document.querySelectorAll(SCRIPT_ID).forEach((n) => n.remove());
    delete (window as any).ymaps;
  };

  beforeAll(() => {
    document = TestBed.inject(DOCUMENT);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    window = document.defaultView!;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScriptService],
    });
  });

  afterEach(() => {
    reset();
  });

  it('should not append a second script to body when initScript() called in a sequence', (done) => {
    inject([ScriptService], (service: ScriptService) => {
      merge([service.initScript(), service.initScript()]).subscribe(() => {
        const list = document.querySelectorAll(SCRIPT_ID);
        expect(list.length).toEqual(1);

        done();
      });
    })();
  });

  it('should return ymaps when window.ymaps is already defined', (done) => {
    inject([ScriptService], (service: ScriptService) => {
      (window as any).ymaps = { ready: () => Promise.resolve() } as any;

      const spy = spyOn(document.body, 'appendChild');

      service.initScript().subscribe((ymaps) => {
        expect(ymaps).toBeInstanceOf(Object);
        expect(spy).not.toHaveBeenCalled();
        done();
      });
    })();
  });

  it('should create the default script URL without config', (done) => {
    inject([ScriptService], (service: ScriptService) => {
      service.initScript().subscribe(() => {
        const script = document.querySelector(SCRIPT_ID) as HTMLScriptElement;

        expect(script.src).toContain(
          BASE_API_PROTOCOL + BASE_API_URL + BASE_API_VERSION,
        );
        expect(script.src).toContain('lang=ru_RU');

        done();
      });
    })();
  });

  it('should create script URL based on config', (done) => {
    const config: YaConfig = {
      apikey: 'X-X-X',
      lang: 'en_US',
      coordorder: 'latlong',
      load: 'package.full',
      mode: 'release',
      version: '2.1',
    };

    TestBed.resetTestingModule();
    TestBed.overrideProvider(YA_CONFIG, { useValue: config });

    inject([ScriptService], (service: ScriptService) => {
      service.initScript().subscribe(() => {
        const script = document.querySelector(SCRIPT_ID) as HTMLScriptElement;

        expect(script.src).toContain(
          BASE_API_PROTOCOL + BASE_API_URL + BASE_API_VERSION,
        );
        expect(script.src).toContain('apikey=X-X-X');
        expect(script.src).toContain('coordorder=latlong');
        expect(script.src).toContain('load=package.full');
        expect(script.src).toContain('mode=release');

        expect(script.src).not.toContain(`version=${BASE_API_VERSION}`);

        done();
      });
    })();
  });
});
