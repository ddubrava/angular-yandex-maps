import { Injectable, NgZone } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { YaApiLoaderService } from '../ya-api-loader/ya-api-loader.service';

/**
 * The `YaGeocoder` service wraps `ymaps.geocode` static function from the Yandex.Maps API.
 *
 * @example
 * ```ts
 * import { YaGeocoderService } from 'angular8-yandex-maps';
 *
 * @Component()
 * export class AppComponent {
 *   constructor(private yaGeocoderService: YaGeocoderService) {
 *     // Don't forget to unsubscribe
 *     this.yaGeocoderService.geocode('Moscow')
 *       .subscribe(v => console.log(v))
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class YaGeocoderService {
  constructor(
    private readonly ngZone: NgZone,
    private readonly yaApiLoaderService: YaApiLoaderService,
  ) {}

  /**
   * Processes geocoding requests.
   * @param request the address for which coordinates need to be obtained (forward geocoding),
   * or the coordinates for which the address needs to be determined (reverse geocoding).
   * @param options geocode options.
   */
  geocode(request: string | number[], options?: ymaps.IGeocodeOptions): Observable<object> {
    return this.yaApiLoaderService.load().pipe(
      switchMap(() => from(ymaps.geocode(request, options))),
      switchMap(
        (result) =>
          new Observable<object>((observer) => {
            this.ngZone.run(() => {
              observer.next(result);
              observer.complete();
            });
          }),
      ),
    );
  }
}
