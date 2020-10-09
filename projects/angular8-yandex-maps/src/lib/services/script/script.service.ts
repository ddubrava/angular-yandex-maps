import { DOCUMENT } from '@angular/common';
import { from, fromEvent, Observable } from 'rxjs';
import { IConfig, YA_MAP_CONFIG } from '../../models/models';
import { Inject, Injectable, Optional } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

declare const ymaps: any;

const DEFAULT_CONFIG: IConfig = {
  apikey: null,
  lang: 'ru_RU',
};

/**
 * @dynamic
 *
 * @description Injectable service that will handle the loading of Yandex.Maps script
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/services/script}
 */
@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  private _script: HTMLScriptElement;
  private _config: Partial<IConfig>;

  constructor(
    @Optional() @Inject(YA_MAP_CONFIG) config: Partial<IConfig>,
    @Inject(DOCUMENT) private document: Document
  ) {
    this._config = config || DEFAULT_CONFIG;
  }

  /**
   * Inits Yandex.Maps script
   * @returns Observable with 'ymaps' object
   */
  public initScript(): Observable<any> {
    if (!this._script) {
      const script = this.document.createElement('script');

      this._setSource(script, this._config);
      this._script = this.document.body.appendChild(script);
    }

    if ('ymaps' in window) {
      return from(ymaps.ready()).pipe(map(() => ymaps));
    }

    return fromEvent(this._script, 'load').pipe(
      switchMap(() => from(ymaps.ready()).pipe(map(() => ymaps)))
    );
  }

  /**
   * Sets source to provided HTMLScriptElement
   * @param script HTMLScriptElement
   * @param config Config with parameters that will be added in source
   * @example 'https://api-maps.yandex.ru/2.1/?apikey=658f67a2-fd77-42e9-b99e-2bd48c4ccad4&lang=en_US'
   */
  private _setSource(script: HTMLScriptElement, config: Partial<IConfig>): void {
    const params = this._convertIntoQueryParams(config);
    const { enterprise, version = '2.1' } = config;

    script.src = `https://${enterprise ? 'enterprise.' : ''}api-maps.yandex.ru/${version}/?${params}`;
  }

  /**
   * Converts an object into a query string parameters
   * @param o Object for converting
   * @example
   * // returns "apikey=XXX"
   * convertIntoQueryParams({ apikey: 'XXX' })
   */
  private _convertIntoQueryParams(o: Object): string {
    return Object.keys(o).map((key: string) => `${key}=${o[key]}`).join('&');
  }
}
