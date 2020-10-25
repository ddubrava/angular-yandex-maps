import { DOCUMENT } from '@angular/common';
import { from, fromEvent, merge, Observable, throwError } from 'rxjs';
import { Inject, Injectable, Optional } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { IConfig, YA_MAP_CONFIG } from '../../models/models';

const DEFAULTCONFIG: IConfig = {
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
  providedIn: 'root',
})
export class ScriptService {
  private config: Partial<IConfig>;
  private script: HTMLScriptElement;
  private window: Window;

  constructor(
    @Optional() @Inject(YA_MAP_CONFIG) config: Partial<IConfig>,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.config = config || DEFAULTCONFIG;
    this.window = document.defaultView;
  }

  /**
   * Inits Yandex.Maps script
   */
  public initScript(): Observable<Event | typeof ymaps> {
    if ('ymaps' in this.window) {
      return from(ymaps.ready()).pipe(map(() => ymaps));
    }

    if (!this.script) {
      const script = this.document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.getScriptSource(this.config);
      script.id = 'yandexMapsApiScript';

      this.script = this.document.body.appendChild(script);
    }

    const load = fromEvent(this.script, 'load').pipe(
      switchMap(() => from(ymaps.ready()).pipe(map(() => ymaps))),
    );

    const error = fromEvent(this.script, 'error').pipe(switchMap((e) => throwError(e)));

    return merge(load, error);
  }

  /**
   * Returns script source by config
   * @param config Config with parameters that will be added in source
   * @example 'https://api-maps.yandex.ru/2.1/?apikey=658f67a2-fd77-42e9-b99e-2bd48c4ccad4&lang=enUS'
   */
  private getScriptSource(config: Partial<IConfig>): string {
    const { enterprise, version = '2.1', ...rest } = config;
    const params = this.convertIntoQueryParams(rest);

    return `https://${enterprise ? 'enterprise.' : ''}api-maps.yandex.ru/${version}/?${params}`;
  }

  /**
   * Converts an object into a query string parameters
   * @param o Object for converting
   * @example
   * // returns "apikey=XXX"
   * convertIntoQueryParams({ apikey: 'XXX' })
   */
  private convertIntoQueryParams(o: Object): string {
    return Object.keys(o)
      .map((key: string) => `${key}=${o[key]}`)
      .join('&');
  }
}
