import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { from, fromEvent, merge, Observable, throwError } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

export const YA_CONFIG = new InjectionToken<YaConfig>('YA_CONFIG');

export interface YaConfig {
  /**
   * API key. You can get a key in the developer's dashboard.
   */
  apikey?: string;
  /**
   * Locale.
   */
  lang: 'ru_RU' | 'en_US' | 'en_RU' | 'ru_UA' | 'uk_UA' | 'tr_TR';
  /**
   * The order for setting geographical coordinates in API functions that accept longitude-latitude input.
   */
  coordorder?: 'latlong' | 'longlat';
  /**
   * List of modules to load.
   */
  load?: string;
  /**
   * API loading mode.
   */
  mode?: 'release' | 'debug';
  /**
   * Use commercial version of the API.
   */
  enterprise?: boolean;
  /**
   * Version number of the API.
   */
  version?: string;
}

/**
 * Injectable service that handles loading of Yandex.Maps API.
 *
 * @example
 * import { YaApiLoaderService } from 'angular8-yandex-maps';
 *
 * export class AppComponent {
 *              constructor(private aaApiLoaderService: YaApiLoaderService) {
 *                this.scriptService.load()
 *                  .subscribe(ymaps => console.log(ymaps))
 *              }
 * }
 */
@Injectable({
  providedIn: 'root',
})
export class YaApiLoaderService {
  private readonly _config: YaConfig;

  private readonly _window: Window & { ymaps: typeof ymaps };

  private readonly _defaultConfig: YaConfig = { lang: 'ru_RU' };

  private _script: HTMLScriptElement;

  constructor(
    @Optional() @Inject(YA_CONFIG) config: YaConfig | null,
    @Inject(DOCUMENT) private readonly _document: Document,
  ) {
    this._config = config || this._defaultConfig;

    if (this._document.defaultView) {
      this._window = this._document.defaultView;
    } else {
      throw new Error('document.defaultView is null');
    }
  }

  /**
   * Inits Yandex.Maps script
   */
  load(): Observable<typeof ymaps> {
    const window = this._window;

    if ('ymaps' in this._window) {
      return from(window.ymaps.ready()).pipe(map(() => window.ymaps));
    }

    if (!this._script) {
      const script = this._document.createElement('script');

      script.type = 'text/javascript';
      script.src = this._getScriptSource(this._config);
      script.id = 'yandexMapsApiScript';
      script.async = true;
      script.defer = true;

      this._script = this._document.body.appendChild(script);
    }

    const load = fromEvent(this._script, 'load').pipe(
      switchMap(() => from(window.ymaps.ready()).pipe(map(() => window.ymaps))),
    );

    const error = fromEvent(this._script, 'error').pipe(switchMap((e) => throwError(e)));

    return merge(load, error).pipe(take(1));
  }

  /**
   * Returns script source by config
   * @param config config with parameters that will be added in source
   * @example
   * // returns 'https://api-maps.yandex.ru/2.1/?apikey=658f67a2-fd77-42e9-b99e-2bd48c4ccad4&lang=en_US'
   * getScriptSource({ apikey: '658f67a2-fd77-42e9-b99e-2bd48c4ccad4', lang: 'en_US' })
   */
  private _getScriptSource(config: YaConfig): string {
    const { enterprise, version = '2.1', ...rest } = config;
    const params = this._convertConfigIntoQueryParams(rest);

    return `https://${enterprise ? 'enterprise.' : ''}api-maps.yandex.ru/${version}/?${params}`;
  }

  /**
   * Converts a config into a query string parameters
   * @param config object for converting
   * @example
   * // returns "lang=ru_RU&apikey=XXX"
   * convertIntoQueryParams({ lang: 'ru_RU', apikey: 'XXX' })
   */
  private _convertConfigIntoQueryParams(config: YaConfig): string {
    return Object.entries(config)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }
}
