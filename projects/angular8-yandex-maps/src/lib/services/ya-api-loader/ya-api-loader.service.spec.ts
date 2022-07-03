import { YaConfig } from '../../models/ya-config';
import { createReadySpy } from '../../testing/fake-ymaps-utils';
import { YaApiLoaderService } from './ya-api-loader.service';

class FakeHTMLScriptElement {
  onHandlers: Record<string, any> = {};

  async: boolean;

  defer: boolean;

  id: string;

  src: string;

  type: string;

  addEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
    this.onHandlers[type] = listener;
  }

  removeEventListener(): void {}
}

describe('YaApiLoaderService', () => {
  let service: YaApiLoaderService;
  let script: FakeHTMLScriptElement;
  let mockDocument: any;

  beforeEach(() => {
    mockDocument = {
      createElement: jasmine.createSpy('createElement'),
      body: jasmine.createSpyObj('body', ['appendChild']),
    };

    script = new FakeHTMLScriptElement();
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create script with default options if config is not passed', () => {
    service = new YaApiLoaderService(null, mockDocument);

    mockDocument.createElement.and.returnValue(script);
    mockDocument.body.appendChild.and.returnValue(script);

    service.load();

    expect(mockDocument.createElement).toHaveBeenCalled();
    expect(script.type).toBe('text/javascript');
    expect(script.async).toEqual(true);
    expect(script.defer).toEqual(true);
    expect(script.src).toBe('https://api-maps.yandex.ru/2.1/?lang=ru_RU');
    expect(script.id).toBe('yandexMapsApiScript');
    expect(mockDocument.body.appendChild).toHaveBeenCalled();
  });

  it('should use default language if is not passed', () => {
    const config: YaConfig = {
      apikey: 'X-X-X',
    };

    service = new YaApiLoaderService(config, mockDocument);

    mockDocument.createElement.and.returnValue(script);
    mockDocument.body.appendChild.and.returnValue(script);

    service.load();

    expect(script.src).toContain('https://api-maps.yandex.ru/2.1');
    expect(script.src).toContain('apikey=X-X-X');
    expect(script.src).toContain('lang=ru_RU');
  });

  it('should create script with provided options if config is passed', () => {
    const config: YaConfig = {
      apikey: 'X-X-X',
      lang: 'en_US',
      coordorder: 'latlong',
      load: 'package.full',
      mode: 'release',
      version: '2.1',
    };

    service = new YaApiLoaderService(config, mockDocument);

    mockDocument.createElement.and.returnValue(script);
    mockDocument.body.appendChild.and.returnValue(script);

    service.load();

    expect(script.src).toContain('https://api-maps.yandex.ru/2.1');
    expect(script.src).toContain('apikey=X-X-X');
    expect(script.src).toContain('lang=en_US');
    expect(script.src).toContain('coordorder=latlong');
    expect(script.src).toContain('load=package.full');
    expect(script.src).toContain('mode=release');
  });

  it('should create enterprise script if enterprise flag is passed', () => {
    const config: YaConfig = {
      enterprise: true,
    };

    service = new YaApiLoaderService(config, mockDocument);

    mockDocument.createElement.and.returnValue(script);
    mockDocument.body.appendChild.and.returnValue(script);

    service.load();

    expect(script.src).toBe('https://enterprise.api-maps.yandex.ru/2.1/?lang=ru_RU');
  });

  it('should not append second script if window.ymaps is defined', () => {
    createReadySpy();

    service = new YaApiLoaderService(null, mockDocument);
    service.load();

    expect(mockDocument.createElement).not.toHaveBeenCalled();
    expect(mockDocument.body.appendChild).not.toHaveBeenCalled();
  });

  it('should not append second script if load called in a sequence', () => {
    service = new YaApiLoaderService(null, mockDocument);

    mockDocument.createElement.and.returnValue(script);
    mockDocument.body.appendChild.and.returnValue(script);

    service.load();
    service.load();

    expect(mockDocument.createElement.calls.count()).toBe(1);
    expect(mockDocument.body.appendChild.calls.count()).toBe(1);
  });

  it('should return observable with ymaps on script load', (done) => {
    service = new YaApiLoaderService(null, mockDocument);

    mockDocument.createElement.and.returnValue(script);
    mockDocument.body.appendChild.and.returnValue(script);

    service.load().subscribe((api) => {
      expect(api.ready).toBeTruthy();
      done();
    });

    setTimeout(() => {
      createReadySpy();
      script.onHandlers.load();
    });
  });

  it('should throw error on script loading error', (done) => {
    service = new YaApiLoaderService(null, mockDocument);

    const error = {};

    mockDocument.createElement.and.returnValue(script);
    mockDocument.body.appendChild.and.returnValue(script);

    service.load().subscribe({
      error: (e) => {
        expect(e).toEqual(error);
        done();
      },
    });

    setTimeout(() => {
      createReadySpy();
      script.onHandlers.error(error);
    });
  });
});
