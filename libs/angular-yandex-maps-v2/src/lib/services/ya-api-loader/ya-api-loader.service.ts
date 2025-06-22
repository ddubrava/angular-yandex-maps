import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import {
  BehaviorSubject,
  from,
  fromEvent,
  isObservable,
  merge,
  mergeMap,
  NEVER,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { YaConfig } from '../../interfaces/ya-config';
import { YA_CONFIG } from '../../tokens/ya-config';
import { exitZone } from '../../utils/zone/zone';
import { YaApiLoaderCache } from './interfaces/ya-api-loader-cache';

/**
 * The `YaApiLoader` service handles loading of Yandex.Maps API. Use it if you do not need `YaMapComponent`.
 *
 * Starting from `v16.1.0` the service supports dynamic configuration changes by subscribing on a `YaConfig` observable.
 * It stores global API objects in a local cache, and updates them in runtime if necessary.
 * That's why do not provide this service, it will break the synchronizations between the local cache and HTML scripts.
 *
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
  private readonly document = inject(DOCUMENT);
  private readonly ngZone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly defaultConfig: YaConfig = {
    lang: 'ru_RU',
    version: '2.1',
  };

  private readonly config$ = new BehaviorSubject<YaConfig>(this.defaultConfig);

  private readonly cache = new Map<string, YaApiLoaderCache>();

  constructor() {
    let config = inject<YaConfig | Observable<YaConfig>>(YA_CONFIG);

    if (!isObservable(config)) {
      config = of(config);
    }

    config.subscribe((config) => {
      this.config$.next({
        ...this.defaultConfig,
        ...config,
      });
    });
  }

  /**
   * Loads Yandex.Maps API.
   */
  load(): Observable<typeof ymaps> {
    if (!this.isBrowser) {
      return NEVER;
    }

    return this.config$.pipe(
      // 3rd party libraries shouldn't be run in a zone.
      // Libraries run tons of different events (requestAnimationFrame, setTimeout, etc.).
      // We do not need to run change detection for these events from the library.
      // Exit from a zone here, so all components are also created outside a zone.
      exitZone(this.ngZone),
      mergeMap((config) => {
        /**
         * We use a script source as a cache key, since there are a lot of parameters that affect the API.
         * We can't rely only on one parameter. E.g., an enterprise flag is changed, we need to reload the API.
         */
        const cacheKey = this.getScriptSource(config);
        const cache = this.cache.get(cacheKey) || {};

        /**
         * If it exists in the cache, return the ymaps from it,
         * since script.onload triggers only once.
         */
        if (cache.ymaps) {
          const apiObject: typeof ymaps = cache.ymaps;

          /**
           * ready confirms that the API and DOM are ready for use,
           * we can return of(window.ymaps), but calling ready is safer, I believe.
           */
          return from(apiObject.ready()).pipe(
            // Each nested operator should run outside the zone.
            // Refer to the comment above for the reason why we need to exit the zone.
            exitZone(this.ngZone),
            /**
             * Actually, we need to update it only if they are not equal,
             * it happens if we change the configuration which required new window.ymaps.
             */
            tap(() => (window.ymaps = apiObject)),
            map(() => apiObject),
          );
        }

        let script = cache.script;

        /**
         * It's possible that we have a script, but do not have ymaps.
         * It happens if there are concurrent requests, and the first request creates the script,
         * while the second must just wait for the API to be loaded.
         */
        if (!script) {
          script = this.createScript(config);
          this.cache.set(cacheKey, { script });
          this.document.body.appendChild(script);
        }

        /**
         * The API throws an error on a script load if there is window.ymaps.
         * So before changing the configuration, delete the global object.
         */
        if (window.ymaps) {
          delete (window as any).ymaps;
        }

        /**
         * window.ymaps is set explicitly via a script load event.
         */
        const load = fromEvent(script, 'load').pipe(
          switchMap(() => from(ymaps.ready())),
          tap(() => this.cache.set(cacheKey, { script, ymaps })),
          map(() => ymaps),
        );

        const error = fromEvent(script, 'error').pipe(switchMap(throwError));

        return merge(load, error).pipe(
          // Each nested operator should run outside the zone.
          // Refer to the comment above for the reason why we need to exit the zone.
          exitZone(this.ngZone),
          take(1),
        );
      }),
    );
  }

  private createScript(config: YaConfig): HTMLScriptElement {
    const script = this.document.createElement('script');

    script.type = 'text/javascript';
    script.src = this.getScriptSource(config);
    script.id = 'yandexMapsApiScript';
    script.async = true;
    script.defer = true;

    return script;
  }

  /**
   * Returns a script source from a config.
   * @param config parameters to add to a source
   * @example
   * // returns 'https://api-maps.yandex.ru/2.1/?apikey=658f67a2-fd77-42e9-b99e-2bd48c4ccad4&lang=en_US'
   * getScriptSource({ apikey: '658f67a2-fd77-42e9-b99e-2bd48c4ccad4', lang: 'en_US' })
   */
  private getScriptSource(config: YaConfig): string {
    const { enterprise, version, ...rest } = config;
    const params = this.convertConfigIntoQueryParams(rest);

    if (version === 'v3') {
      throw new Error(
        'This package does not support the Yandex.Maps API v3. See https://www.npmjs.com/package/angular-yandex-maps-v3',
      );
    }

    return `https://${enterprise ? 'enterprise.' : ''}api-maps.yandex.ru/${version}/?${params}`;
  }

  /**
   * Converts a config into query string parameters.
   * @param config object to convert
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
