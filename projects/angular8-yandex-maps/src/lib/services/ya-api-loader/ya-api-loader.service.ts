import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { from, fromEvent, merge, NEVER, Observable, throwError } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { YaConfig } from '../../models/ya-config';
import { YA_CONFIG } from '../../tokens/ya-config';

/**
 * The `YaApiLoader` service handles loading of Yandex.Maps API.
 *
 * @example
 * ```ts
 * import { YaApiLoaderService } from 'angular8-yandex-maps';
 *
 * @Component()
 * export class AppComponent {
 *   constructor(private yaApiLoaderService: YaApiLoaderService) {
 *     // Don't forget to unsubscribe
 *     this.yaApiLoaderService.load()
 *       .subscribe(v => console.log(v))
 *   }
 * }
 *```
 */
@Injectable({
  providedIn: 'root',
})
export class YaApiLoaderService {
  private readonly isBrowser: boolean;

  private readonly config: YaConfig;

  private script: HTMLScriptElement;

  constructor(
    @Optional() @Inject(YA_CONFIG) config: YaConfig | null,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    const defaultConfig: YaConfig = { lang: 'ru_RU' };

    this.config = {
      ...defaultConfig,
      ...config,
    };
  }

  /**
   * Loads Yandex.Maps API.
   */
  load(): Observable<typeof ymaps> {
    if (!this.isBrowser) {
      return NEVER;
    }

    if (window.ymaps) {
      return from(ymaps.ready()).pipe(map(() => ymaps));
    }

    if (!this.script) {
      const script = this.document.createElement('script');

      script.type = 'text/javascript';
      script.src = this.getScriptSource(this.config);
      script.id = 'yandexMapsApiScript';
      script.async = true;
      script.defer = true;

      this.script = this.document.body.appendChild(script);
    }

    const load = fromEvent(this.script, 'load').pipe(
      switchMap(() => from(ymaps.ready())),
      map(() => ymaps),
    );

    const error = fromEvent(this.script, 'error').pipe(switchMap(throwError));

    return merge(load, error).pipe(take(1));
  }

  /**
   * Returns script source by config.
   * @param config config with parameters that will be added in source
   * @example
   * // returns 'https://api-maps.yandex.ru/2.1/?apikey=658f67a2-fd77-42e9-b99e-2bd48c4ccad4&lang=en_US'
   * getScriptSource({ apikey: '658f67a2-fd77-42e9-b99e-2bd48c4ccad4', lang: 'en_US' })
   */
  private getScriptSource(config: YaConfig): string {
    const { enterprise, version = '2.1', ...rest } = config;
    const params = this.convertConfigIntoQueryParams(rest);

    return `https://${enterprise ? 'enterprise.' : ''}api-maps.yandex.ru/${version}/?${params}`;
  }

  /**
   * Converts a config into a query string parameters.
   * @param config object for converting
   * @example
   * // returns "lang=ru_RU&apikey=XXX"
   * convertIntoQueryParams({ lang: 'ru_RU', apikey: 'XXX' })
   */
  private convertConfigIntoQueryParams(config: YaConfig): string {
    return Object.entries(config)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }
}
