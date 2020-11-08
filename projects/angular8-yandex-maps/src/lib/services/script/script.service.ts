import * as _ymaps from 'yandex-maps';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { from, fromEvent, merge, Observable, throwError } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { IConfig, YA_MAP_CONFIG } from '../../models/models';

const DEFAULT_CONFIG: IConfig = {
  lang: 'ru_RU',
};

declare global {
  const ymaps: typeof _ymaps;

  interface Window {
    ymaps: typeof _ymaps;
  }
}

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
  private _config: Partial<IConfig>;

  private _script: HTMLScriptElement;

  private _window: Window;

  constructor(
    @Optional() @Inject(YA_MAP_CONFIG) config: Partial<IConfig>,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    this._config = config || DEFAULT_CONFIG;
    this._window = document.defaultView;
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
  private _getScriptSource(config: Partial<IConfig>): string {
    const { enterprise, version = '2.1', ...rest } = config;
    const params = this._convertIntoQueryParams(rest);

    return `https://${
      enterprise ? 'enterprise.' : ''
    }api-maps.yandex.ru/${version}/?${params}`;
  }

  /**
   * Converts an object into a query string parameters
   * @param o Object for converting
   * @example
   * // returns "apikey=XXX"
   * convertIntoQueryParams({ apikey: 'XXX' })
   */
  private _convertIntoQueryParams(o: Object): string {
    return Object.keys(o)
      .map((key: string) => `${key}=${o[key]}`)
      .join('&');
  }
}
