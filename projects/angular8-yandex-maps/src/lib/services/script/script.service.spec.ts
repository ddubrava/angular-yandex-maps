import { catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { inject, TestBed } from '@angular/core/testing';
import { merge, of } from 'rxjs';
import { YaConfig, YA_MAP_CONFIG } from '../../models/models';
import { ScriptService } from './script.service';

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
    TestBed.overrideProvider(YA_MAP_CONFIG, { useValue: config });

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

  it('should create enterprise API based on config', (done) => {
    const config: YaConfig = {
      apikey: 'X-X-X',
      lang: 'en_US',
      enterprise: true,
    };

    TestBed.resetTestingModule();
    TestBed.overrideProvider(YA_MAP_CONFIG, { useValue: config });

    inject([ScriptService], (service: ScriptService) => {
      // API returns 403 for enterpise + fake apikey so have to catch error
      service
        .initScript()
        .pipe(
          catchError((e: Event) => {
            const target = e.target as HTMLScriptElement;
            expect(target.src).toContain(
              `${BASE_API_PROTOCOL}enterprise.${BASE_API_URL}${BASE_API_VERSION}`,
            );
            expect(target.src).not.toContain('enterprise=true');

            done();

            // Can't throwError as it causes a mess
            return of();
          }),
        )
        .subscribe();
    })();
  });

  it('should return error on API loading error', (done) => {
    const config: YaConfig = {
      apikey: 'X-X-X',
      lang: 'en_US',
      version: 'invalid',
    };

    TestBed.resetTestingModule();
    TestBed.overrideProvider(YA_MAP_CONFIG, { useValue: config });

    inject([ScriptService], (service: ScriptService) => {
      service
        .initScript()
        .pipe(
          catchError((e) => {
            expect(e).toBeInstanceOf(Event);
            done();

            // Can't throwError as it causes a mess
            return of();
          }),
        )
        .subscribe();
    })();
  });
});
