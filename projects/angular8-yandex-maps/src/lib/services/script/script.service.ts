import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { from, fromEvent, merge, Observable, throwError } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { YA_CONFIG } from '../../constants/constant';
import { YaConfig } from '../../interfaces/config';

const DEFAULT_CONFIG: YaConfig = {
  lang: 'ru_RU',
};

/**
 * @dynamic
 *
 * @description Injectable service that will handle the loading of Yandex.Maps script
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/services/script}
 */
@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  private _config: YaConfig;

  private _script: HTMLScriptElement;

  private _window: Window;

  constructor(
    @Optional() @Inject(YA_CONFIG) config: YaConfig | null,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    this._config = config || DEFAULT_CONFIG;

    if (document.defaultView) {
      this._window = document.defaultView;
    } else {
      throw new Error('document.defaultView is null');
    }
  }

  /**
   * Inits Yandex.Maps script
   */
  public initScript(): Observable<typeof ymaps> {
    if ('ymaps' in this._window) {
      return from(ymaps.ready()).pipe(map(() => ymaps));
    }

    if (!this._script) {
      const script = this._document.createElement('script');
      script.type = 'text/javascript';
      script.src = this._getScriptSource(this._config);
      script.id = 'yandexMapsApiScript';

      this._script = this._document.body.appendChild(script);
    }

    const load = fromEvent(this._script, 'load').pipe(
      switchMap(() => from(ymaps.ready()).pipe(map(() => ymaps))),
    );

    const error = fromEvent(this._script, 'error').pipe(
      switchMap((e) => throwError(e)),
    );

    return merge(load, error).pipe(take(1));
  }

  /**
   * Returns script source by config
   * @param config Config with parameters that will be added in source
   * @example 'https://api-maps.yandex.ru/2.1/?apikey=658f67a2-fd77-42e9-b99e-2bd48c4ccad4&lang=en_US'
   */
  private _getScriptSource(config: YaConfig): string {
    const { enterprise, version = '2.1', ...rest } = config;
    const params = this._convertConfigIntoQueryParams(rest);

    return `https://${
      enterprise ? 'enterprise.' : ''
    }api-maps.yandex.ru/${version}/?${params}`;
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
