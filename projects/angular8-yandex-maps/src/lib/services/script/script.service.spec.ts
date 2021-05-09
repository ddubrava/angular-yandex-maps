import { ScriptService } from './script.service';
import { YaConfig } from '../../interfaces/config';
import createSpy = jasmine.createSpy;
import createSpyObj = jasmine.createSpyObj;

describe('ScriptService', () => {
  let service: ScriptService;
  let mockDocument: any;

  beforeEach(() => {
    mockDocument = {
      defaultView: {},
      createElement: createSpy('createElement'),
      body: createSpyObj('body', ['appendChild']),
    };
  });

  it('should throw error if defaultView is null', () => {
    mockDocument.defaultView = null;
    expect(() => new ScriptService(null, mockDocument)).toThrowError();
  });

  it("should create script with default options if config isn't passed", () => {
    service = new ScriptService(null, mockDocument);

    const script = {} as HTMLScriptElement;
    mockDocument.createElement.and.returnValue(script);

    service.initScript();

    expect(mockDocument.createElement).toHaveBeenCalled();
    expect(script.type).toBe('text/javascript');
    expect(script.async).toEqual(true);
    expect(script.defer).toEqual(true);
    expect(script.src).toBe('https://api-maps.yandex.ru/2.1/?lang=ru_RU');
    expect(script.id).toBe('yandexMapsApiScript');
    expect(mockDocument.body.appendChild).toHaveBeenCalled();
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

    service = new ScriptService(config, mockDocument);

    const script = {} as HTMLScriptElement;
    mockDocument.createElement.and.returnValue(script);

    service.initScript();

    expect(script.src).toBe(
      'https://api-maps.yandex.ru/2.1/?apikey=X-X-X&lang=en_US&coordorder=latlong&load=package.full&mode=release',
    );
  });

  it('should create enterprise script if enterprise flag is passed', () => {
    const config: YaConfig = {
      lang: 'ru_RU',
      enterprise: true,
    };

    service = new ScriptService(config, mockDocument);

    const script = {} as HTMLScriptElement;
    mockDocument.createElement.and.returnValue(script);

    service.initScript();

    expect(script.src).toBe(
      'https://enterprise.api-maps.yandex.ru/2.1/?lang=ru_RU',
    );
  });

  it('should not append second script if window.ymaps is defined', () => {
    mockDocument.defaultView.ymaps = {
      ready: () => new Promise((resolve) => resolve({})),
    };

    service = new ScriptService(null, mockDocument);
    service.initScript();

    expect(mockDocument.createElement).not.toHaveBeenCalled();
    expect(mockDocument.body.appendChild).not.toHaveBeenCalled();
  });

  it('should not append second script if initScript called in a sequence', () => {
    service = new ScriptService(null, mockDocument);

    mockDocument.createElement.and.returnValue({});
    mockDocument.body.appendChild.and.returnValue({});

    service.initScript();
    service.initScript();

    expect(mockDocument.createElement.calls.count()).toBe(1);
    expect(mockDocument.body.appendChild.calls.count()).toBe(1);
  });

  it('should return observable with ymaps on script load', (done) => {
    service = new ScriptService(null, mockDocument);

    const onHandlers: { [key: string]: any } = {};

    const script = {
      addEventListener(type: string, listener: any) {
        onHandlers[type] = listener;
      },
      removeEventListener() {},
    };

    mockDocument.createElement.and.returnValue(script);
    mockDocument.body.appendChild.and.returnValue(script);

    service.initScript().subscribe((api) => {
      expect(api.ready).toBeTruthy();
      done();
    });

    setTimeout(() => {
      mockDocument.defaultView.ymaps = {
        ready: () => new Promise((resolve) => resolve({})),
      };

      onHandlers.load();
    });
  });

  it('should throw error on script loading error', (done) => {
    service = new ScriptService(null, mockDocument);

    const onHandlers: { [key: string]: any } = {};

    const script = {
      addEventListener(type: string, listener: any) {
        onHandlers[type] = listener;
      },
      removeEventListener() {},
    };

    const event = new Event('load');

    mockDocument.createElement.and.returnValue(script);
    mockDocument.body.appendChild.and.returnValue(script);

    service.initScript().subscribe(
      () => {},
      (e) => {
        expect(e).toEqual(event);
        done();
      },
    );

    setTimeout(() => {
      mockDocument.defaultView.ymaps = {
        ready: () => new Promise((resolve) => resolve({})),
      };

      onHandlers.error(event);
    });
  });
});
