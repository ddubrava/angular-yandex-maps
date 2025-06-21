import { DOCUMENT, NgZone, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { combineLatest, mergeMap, NEVER, Observable, Subject, tap } from 'rxjs';

import { mockReady } from '../../../test-utils';
import { YaConfig } from '../../interfaces/ya-config';
import { YA_CONFIG } from '../../tokens/ya-config';
import { YaApiLoaderService } from './ya-api-loader.service';

class FakeHTMLScriptElement implements Partial<HTMLScriptElement> {
  onHandlers: Record<string, EventListener[]> = {};

  async?: boolean;

  defer?: boolean;

  id?: string;

  src?: string;

  type?: string;

  addEventListener(type: string, listener: EventListener) {
    if (!this.onHandlers[type]) {
      this.onHandlers[type] = [];
    }

    this.onHandlers[type].push(listener);
  }

  removeEventListener() {}
}

describe('YaApiLoaderService', () => {
  /**
   * Mocks loader dependencies.
   */
  const mockLoaderService = (
    config: YaConfig | Observable<YaConfig> = {},
    platformId = 'browser' as any,
  ) => {
    /**
     * The order is important.
     * We create a script, use it as a mock value abd only then create a service with a configuration.
     */
    const script = new FakeHTMLScriptElement();

    const documentMock = {
      createElement: jest.fn(),
      body: {
        appendChild: jest.fn(),
      },
    };

    documentMock.createElement.mockReturnValue(script);
    documentMock.body.appendChild.mockReturnValue(script);

    const zoneMock = {
      onUnstable: NEVER,
      onMicrotaskEmpty: NEVER,
      onStable: NEVER,
      onError: NEVER,
      runOutsideAngular: jest.fn((fn) => fn()),
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: YA_CONFIG,
          useValue: config,
        },
        {
          provide: PLATFORM_ID,
          useValue: platformId,
        },
        {
          provide: DOCUMENT,
          useValue: documentMock,
        },
        {
          provide: NgZone,
          useValue: zoneMock,
        },
      ],
    });

    const service = TestBed.inject(YaApiLoaderService);

    return { script, documentMock, zoneMock, service };
  };

  /**
   * Fires all onHandlers by a type.
   * For 'load' event reproduces the API logic - defines window.ymaps.
   */
  const fireScriptEvents = (script: FakeHTMLScriptElement, type = 'load', args?: unknown) => {
    const handlers = script.onHandlers[type];

    if (!handlers) {
      return;
    }

    /**
     * the API explicitly defines window.ymaps on a script load event.
     */
    if (type === 'load') {
      mockReady();
    }

    for (const handler of handlers) {
      handler(args as Event);
    }
  };

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should not load API on server-side rendering', () => {
    const { service } = mockLoaderService({}, 'server');
    expect(service.load()).toBe(NEVER);
  });

  it('should load API outside an Angular zone', (done) => {
    const { service, zoneMock, script } = mockLoaderService();

    service.load().subscribe(() => {
      expect(zoneMock.runOutsideAngular).toHaveBeenCalled();
      done();
    });

    fireScriptEvents(script);
  });

  it('should create script with default options if config is not passed', (done) => {
    const { service, documentMock, script } = mockLoaderService();

    service.load().subscribe(() => {
      expect(documentMock.createElement).toHaveBeenCalled();
      expect(script.type).toBe('text/javascript');
      expect(script.async).toEqual(true);
      expect(script.defer).toEqual(true);
      expect(script.src).toBe('https://api-maps.yandex.ru/2.1/?lang=ru_RU');
      expect(script.id).toBe('yandexMapsApiScript');
      expect(documentMock.body.appendChild).toHaveBeenCalled();
      done();
    });

    fireScriptEvents(script);
  });

  it('should use default config options if they are not passed', (done) => {
    const config: YaConfig = {
      apikey: 'X-X-X',
    };

    const { service, script } = mockLoaderService(config);

    service.load().subscribe(() => {
      expect(script.src).toBe('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=X-X-X');
      done();
    });

    fireScriptEvents(script);
  });

  it('should create script with provided options if config is passed', (done) => {
    const config: YaConfig = {
      apikey: 'X-X-X',
      suggest_apikey: 'Y-Y-Y',
      lang: 'en_US',
      coordorder: 'latlong',
      load: 'package.full',
      mode: 'release',
      csp: true,
      version: '2.0',
    };

    const { service, script } = mockLoaderService(config);

    service.load().subscribe(() => {
      // They are not in the same order as YaConfig, since there is a default config.
      expect(script.src).toBe(
        'https://api-maps.yandex.ru/2.0/?lang=en_US&apikey=X-X-X&suggest_apikey=Y-Y-Y&coordorder=latlong&load=package.full&mode=release&csp=true',
      );

      done();
    });

    fireScriptEvents(script);
  });

  it('should create enterprise script if enterprise flag is passed', (done) => {
    const config: YaConfig = {
      enterprise: true,
    };

    const { service, script } = mockLoaderService(config);

    service.load().subscribe(() => {
      expect(script.src).toBe('https://enterprise.api-maps.yandex.ru/2.1/?lang=ru_RU');
      done();
    });

    fireScriptEvents(script);
  });

  it('should throw error if v3 version is used', (done) => {
    const config: YaConfig = {
      version: 'v3',
    };

    const { service, script } = mockLoaderService(config);

    service.load().subscribe({
      error: (e) => {
        expect(e).toBeInstanceOf(Error);
        done();
      },
    });

    fireScriptEvents(script);
  });

  it('should use ymaps from cache if it is defined', (done) => {
    const { service, script } = mockLoaderService();

    /**
     * The first call loads the API via a script load event.
     * The second call loads the API via a cache.
     *
     * Finally, we check that we have an only one listener,
     * that means that fromEvent('load') was called only once.
     * Therefore, we extracted the value from the cache.
     */
    service
      .load()
      .pipe(
        tap((globalObject) => expect(globalObject).toBe(window.ymaps)),
        mergeMap(() => service.load()),
      )
      .subscribe((globalObject) => {
        expect(globalObject).toBe(window.ymaps);
        expect(script.onHandlers['load'].length).toBe(1);
        done();
      });

    fireScriptEvents(script);
  });

  it('should change window.ymaps on configuration change', () => {
    const config$ = new Subject<YaConfig>();

    const { service, script } = mockLoaderService(config$);

    // Subscribe to trigger an observable.
    service.load().subscribe();

    // store the first configuration to the cache
    const firstConfiguration: YaConfig = { lang: 'ru_RU', enterprise: true, version: '1.31.2' };

    config$.next(firstConfiguration);
    fireScriptEvents(script);

    const firstConfigurationYmaps = window.ymaps;

    // store the second configuration to the cache
    const secondConfiguration: YaConfig = { version: '2.25.1' };

    config$.next(secondConfiguration);
    fireScriptEvents(script);

    const secondConfigurationYmaps = window.ymaps;

    // Check that the cache has the valid copy of ru_RU ymaps
    config$.next(firstConfiguration);
    expect(window.ymaps).not.toBe(secondConfigurationYmaps);
    expect(window.ymaps).toBe(firstConfigurationYmaps);

    // Check that the cache has the valid copy of en_US ymaps
    config$.next(secondConfiguration);
    expect(window.ymaps).not.toBe(firstConfigurationYmaps);
    expect(window.ymaps).toBe(secondConfigurationYmaps);
  });

  it('should append script if it does not exist in cache', (done) => {
    const { service, documentMock, script } = mockLoaderService();

    service.load().subscribe(() => {
      expect(documentMock.createElement.mock.calls.length).toBe(1);
      expect(documentMock.body.appendChild.mock.calls.length).toBe(1);
      done();
    });

    fireScriptEvents(script);
  });

  it('should not append second script if load called in a sequence', (done) => {
    const { service, documentMock, script } = mockLoaderService();

    combineLatest([service.load(), service.load(), service.load()]).subscribe(() => {
      expect(documentMock.createElement.mock.calls.length).toBe(1);
      expect(documentMock.body.appendChild.mock.calls.length).toBe(1);
      done();
    });

    fireScriptEvents(script);
  });

  it('should delete window.ymaps before loading new configuration', (done) => {
    const { service, script } = mockLoaderService();

    // define window.ymaps
    mockReady();

    const oldYmaps = window.ymaps;

    service.load().subscribe(() => {
      expect(window.ymaps).not.toBe(oldYmaps);
      done();
    });

    fireScriptEvents(script);
  });

  it('should throw error on script loading error', (done) => {
    const { service, script } = mockLoaderService();

    const error = { code: 401 };

    service.load().subscribe({
      error: (e) => {
        expect(e).toEqual(error);
        done();
      },
    });

    fireScriptEvents(script, 'error', error);
  });
});
