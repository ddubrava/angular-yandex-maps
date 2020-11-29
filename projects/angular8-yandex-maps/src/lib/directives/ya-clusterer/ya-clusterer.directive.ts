import {
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { YaEvent, YaReadyEvent } from '../../interfaces/event';
import { YaPlacemarkDirective } from '../ya-placemark/ya-placemark.directive';
import { YaGeoobjectDirective } from '../ya-geoobject/ya-geoobject.directive';
import { Listener } from '../../interfaces/listener';

/**
 * Directive for creating a clusterer. Clusterizes objects in the visible area of the map.
 * If the object does not fall within the visible area of the map, it will not be added to the map.
 * Note, that the clusterer does not react to changing the coordinates of objects (either programmatically,
 * or as the result of dragging). If you want to change the coordinates of some object in the clusterer,
 * you should first delete the object from the clusterer and then add it back.
 *
 * @example
 * `<ya-clusterer>
 *    <ya-placemark [geometry]="[55.74, 37.50]"></ya-placemark>
 *    <ya-geoobject [feature]="{ geometry: { type: 'Point', coordinates: [55.73, 37.52] } }"></ya-geoobject>
 * </ya-clusterer>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/directives/clusterer}
 */
@Directive({
  selector: 'ya-clusterer',
})
export class YaClustererDirective implements OnChanges, OnDestroy {
  @ContentChildren(YaPlacemarkDirective)
  public placemarks: QueryList<YaPlacemarkDirective>;

  @ContentChildren(YaGeoobjectDirective)
  public geoObjects: QueryList<YaGeoobjectDirective>;

  /**
   * Options for the clusterer.
   * @see {@link https://tech.yandex.com/maps/jsapi/doc/2.1/ref/reference/Clusterer-docpage/#Clustererparam-options}
   */
  @Input() public options: any;

  /**
   * Clusterer instance is created.
   */
  @Output() public ready = new EventEmitter<YaReadyEvent>();

  /**
   * Closing the hint.
   */
  @Output() public hintclose = new EventEmitter<YaEvent>();

  /**
   * Opening a hint on a map.
   */
  @Output() public hintopen = new EventEmitter<YaEvent>();

  /**
   * Map reference changed.
   */
  @Output() public mapchange = new EventEmitter<YaEvent>();

  /**
   * Change to the object options.
   */
  @Output() public optionschange = new EventEmitter<YaEvent>();

  /**
   * The parent object reference changed.
   */
  @Output() public parentchange = new EventEmitter<YaEvent>();

  private _sub = new Subscription();

  // Yandex.Maps API.
  private _clusterer: ymaps.Clusterer;

  constructor(private _ngZone: NgZone) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this._updateClusterer(changes);
  }

  /**
   * Method for dynamic Clusterer configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _updateClusterer(changes: SimpleChanges): void {
    const clusterer = this._clusterer;

    if (!clusterer) return;

    const { options } = changes;

    if (options) {
      /**
       * Wrong typings in DefinitelyTyped.
       */
      (clusterer.options as any).set(options.currentValue);
    }
  }

  /**
   * Creates Clusterer.
   *
   * @param map Necessary for passing in children.
   */
  public createClusterer(map: ymaps.Map): ymaps.Clusterer {
    const clusterer = new ymaps.Clusterer(this.options);
    this._clusterer = clusterer;

    this._ngZone.run(() => this.ready.emit({ ymaps, target: clusterer }));

    /**
     * Adds new Placemarks to the clusterer on changes.
     */
    const placemarksSub = this.placemarks.changes
      .pipe(startWith(this.placemarks))
      .subscribe((list: QueryList<YaPlacemarkDirective>) => {
        list.forEach((placemark) => {
          if (!placemark.id) {
            /**
             * Wrong typings in DefinitelyTyped.
             */
            (clusterer as any).add(placemark.createPlacemark(map, clusterer));
          }
        });
      });

    this._sub.add(placemarksSub);

    /**
     * Adds new GeoObjects to the clusterer on changes.
     */
    const geoObjectsSub = this.geoObjects.changes
      .pipe(startWith(this.geoObjects))
      .subscribe((list: QueryList<YaGeoobjectDirective>) => {
        list.forEach((geoObject) => {
          if (!geoObject.id) {
            /**
             * Wrong typings in DefinitelyTyped.
             */
            (clusterer as any).add(geoObject.createGeoObject(map, clusterer));
          }
        });
      });

    this._sub.add(geoObjectsSub);

    this._addEventListeners();

    return clusterer;
  }

  /**
   * Adds listeners on Clusterer events.
   */
  private _addEventListeners(): void {
    const clusterer = this._clusterer;

    const listeners: Listener[] = [
      { name: 'hintclose', emitter: this.hintclose },
      { name: 'hintopen', emitter: this.hintopen },
      { name: 'mapchange', emitter: this.mapchange },
      { name: 'optionschange', emitter: this.optionschange },
      { name: 'parentchange', emitter: this.parentchange },
    ];

    const fn = (event: ymaps.Event): YaEvent => ({
      event,
      target: clusterer,
      ymaps,
    });

    listeners.forEach((listener) => {
      clusterer.events.add(listener.name, (e: ymaps.Event) =>
        listener.runOutsideAngular
          ? this._ngZone.runOutsideAngular(() => listener.emitter.emit(fn(e)))
          : this._ngZone.run(() => listener.emitter.emit(fn(e))),
      );
    });
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
