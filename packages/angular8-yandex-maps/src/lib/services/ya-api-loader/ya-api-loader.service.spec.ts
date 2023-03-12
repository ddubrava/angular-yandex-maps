import { mockReady } from '../../../test-utils';
import { YaConfig } from '../../interfaces/ya-config';
import { YaApiLoaderService } from './ya-api-loader.service';

class FakeHTMLScriptElement {
  onHandlers: Record<string, any> = {};

  async?: boolean;

  defer?: boolean;

  id?: string;

  src?: string;

  type?: string;

  addEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
    this.onHandlers[type] = listener;
  }

  removeEventListener(): void {}
}

describe('YaApiLoaderService', () => {
  let service: YaApiLoaderService;
  let script: FakeHTMLScriptElement;
  let mockDocument: any;
  let platformId: object;

  beforeEach(() => {
    mockDocument = {
      createElement: jest.fn(),
      body: {
        appendChild: jest.fn(),
      },
    };

    platformId = 'browser' as any;

    script = new FakeHTMLScriptElement();
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should create script with default options if config is not passed', () => {
    service = new YaApiLoaderService(null, mockDocument, platformId);

    mockDocument.createElement.mockReturnValue(script);
    mockDocument.body.appendChild.mockReturnValue(script);

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

    service = new YaApiLoaderService(config, mockDocument, platformId);

    mockDocument.createElement.mockReturnValue(script);
    mockDocument.body.appendChild.mockReturnValue(script);

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

    service = new YaApiLoaderService(config, mockDocument, platformId);

    mockDocument.createElement.mockReturnValue(script);
    mockDocument.body.appendChild.mockReturnValue(script);

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

    service = new YaApiLoaderService(config, mockDocument, platformId);

    mockDocument.createElement.mockReturnValue(script);
    mockDocument.body.appendChild.mockReturnValue(script);

    service.load();

    expect(script.src).toBe('https://enterprise.api-maps.yandex.ru/2.1/?lang=ru_RU');
  });

  it('should not append second script if window.ymaps is defined', () => {
    mockReady();

    service = new YaApiLoaderService(null, mockDocument, platformId);
    service.load();

    expect(mockDocument.createElement).not.toHaveBeenCalled();
    expect(mockDocument.body.appendChild).not.toHaveBeenCalled();
  });

  it('should not append second script if load called in a sequence', () => {
    service = new YaApiLoaderService(null, mockDocument, platformId);

    mockDocument.createElement.mockReturnValue(script);
    mockDocument.body.appendChild.mockReturnValue(script);

    service.load();
    service.load();

    expect(mockDocument.createElement.mock.calls.length).toBe(1);
    expect(mockDocument.body.appendChild.mock.calls.length).toBe(1);
  });

  it('should return observable with ymaps on script load', (done) => {
    service = new YaApiLoaderService(null, mockDocument, platformId);

    mockDocument.createElement.mockReturnValue(script);
    mockDocument.body.appendChild.mockReturnValue(script);

    service.load().subscribe((api) => {
      expect(api.ready).toBeTruthy();
      done();
    });

    setTimeout(() => {
      mockReady();
      script.onHandlers['load']();
    });
  });

  it('should throw error on script loading error', (done) => {
    service = new YaApiLoaderService(null, mockDocument, platformId);

    const error = {};

    mockDocument.createElement.mockReturnValue(script);
    mockDocument.body.appendChild.mockReturnValue(script);

    service.load().subscribe({
      error: (e) => {
        expect(e).toEqual(error);
        done();
      },
    });

    setTimeout(() => {
      mockReady();
      script.onHandlers['error'](error);
    });
  });

  it('should not load API on server-side rendering', () => {
    platformId = 'server' as any;
    service = new YaApiLoaderService(null, mockDocument, platformId);

    service.load();

    expect(mockDocument.createElement).not.toHaveBeenCalled();
    expect(mockDocument.body.appendChild).not.toHaveBeenCalled();
  });
});
