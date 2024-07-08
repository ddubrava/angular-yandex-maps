import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
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

import { Y_CONFIG } from '../../tokens/y-config';
import { YConfig } from '../../types/y-config';

/**
 * @internal
 */
interface ApiLoaderCache {
  /**
   * The API global object.
   */
  ymaps3?: typeof ymaps3;

  /**
   * A script element that loads the API.
   */
  script?: HTMLScriptElement;
}

/**
 * The `YApiLoader` service handles loading of the Yandex.Maps API.
 * Use it if you do not need `YMapComponent`.
 *
 * The service supports dynamic configuration changes by subscribing on a `YConfig` observable.
 * It stores global API objects in a local cache, and updates them in runtime if necessary.
 * That's why do not provide this service, it will break the synchronizations between the local cache and HTML scripts.
 *
 * ```ts
 * import { YApiLoaderService } from 'angular-yandex-maps-v3';
 *
 * @Component()
 * export class AppComponent {
 *   constructor(private yApiLoaderService: YApiLoaderService) {
 *     // Don't forget to unsubscribe
 *     this.yApiLoaderService.load()
 *       .subscribe(v => console.log(v))
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class YApiLoaderService {
  private readonly isBrowser: boolean;

  private readonly defaultConfig: YConfig = {
    lang: 'ru_RU',
  };

  private readonly config$ = new BehaviorSubject<YConfig>(this.defaultConfig);

  private readonly cache = new Map<string, ApiLoaderCache>();

  constructor(
    @Inject(Y_CONFIG) config: YConfig | Observable<YConfig>,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

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
   * Loads the Yandex.Maps API.
   */
  load(): Observable<typeof ymaps3> {
    if (!this.isBrowser) {
      return NEVER;
    }

    return this.config$.pipe(
      mergeMap((config) => {
        // We use a script source as a cache key, since there are a lot of parameters that affect the API.
        // We can't rely only on one parameter. E.g., a key is changed, we need to reload the API.
        const cacheKey = this.getScriptSource(config);
        const cache = this.cache.get(cacheKey) || {};

        // If it exists in the cache, return the ymaps3 from it,
        // since script.onload triggers only once.
        if (cache.ymaps3) {
          const apiObject = cache.ymaps3;

          // ready confirms that the API and DOM are ready for use,
          // we can return of(window.ymaps3), but calling ready is safer, I believe.
          return from(apiObject.ready).pipe(
            // Actually, we need to update it only if they are not equal,
            // it happens if we change the configuration which required new window.ymaps3.
            tap(() => ((window as any).ymaps3 = apiObject)),
            map(() => apiObject),
          );
        }

        let script = cache.script;

        // It's possible that we have a script, but do not have ymaps3.
        // It happens if there are concurrent requests, and the first request creates the script,
        // while the second must just wait for the API to be loaded.
        if (!script) {
          script = this.createScript(config);
          this.cache.set(cacheKey, { script });
          this.document.body.appendChild(script);
        }

        if ((window as any).ymaps3) {
          // The API throws an error on script load if window.ymaps3 exists.
          // So, before changing the configuration, delete the global object.
          delete (window as any).ymaps3;

          // On the first API load, we import packages that are stored in chunks.
          // When we load a new API configuration, it checks this global variable
          // and tries to execute them. The problem is that window.ymaps3 is already deleted,
          // and this script hasn't loaded a new ymaps3 yet. As a result, we get an error
          // from these packages. That's why we need to delete these chunks, so there is no
          // difference between the 1st and nth script load.
          delete (window as any).__chunk_yandex_ymaps3;
        }

        // window.ymaps3 is set explicitly via a script load event.
        const load = fromEvent(script, 'load').pipe(
          switchMap(() => from(ymaps3.ready)),
          tap(() => this.cache.set(cacheKey, { script, ymaps3 })),
          map(() => ymaps3),
        );

        const error = fromEvent(script, 'error').pipe(switchMap(throwError));

        return merge(load, error).pipe(take(1));
      }),
    );
  }

  private createScript(config: YConfig): HTMLScriptElement {
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
  private getScriptSource(config: YConfig): string {
    const params = this.convertConfigIntoQueryParams(config);

    return `https://api-maps.yandex.ru/v3/?${params}`;
  }

  /**
   * Converts a config into query string parameters.
   * @param config object to convert
   * @example
   * // returns "lang=ru_RU&apikey=XXX"
   * convertIntoQueryParams({ lang: 'ru_RU', apikey: 'XXX' })
   */
  private convertConfigIntoQueryParams(config: YConfig): string {
    return Object.entries(config)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }
}
