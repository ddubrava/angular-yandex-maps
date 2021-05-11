import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { YaPlacemarkDirective } from '../../directives/ya-placemark/ya-placemark.directive';
import { YaGeoObjectDirective } from '../../directives/ya-geoobject/ya-geoobject.directive';
import { YaEvent, YaReadyEvent } from '../../interfaces/event';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { Listener } from '../../interfaces/listener';

/**
 * Directive for creating a clusterer. Clusterizes objects in the visible area of the map.
 * If the object does not fall within the visible area of the map, it will not be added to the map.
 * Note, that the clusterer does not react to changing the coordinates of objects (either programmatically,
 * or as the result of dragging). If you want to change the coordinates of some object in the clusterer,
 * you should first delete the object from the clusterer and then add it back.
 *
 * @example
 * `<ya-map [center]="[55.751952, 37.600739]">
 *    <ya-clusterer>
 *      <ya-placemark [geometry]="[55.74, 37.50]"></ya-placemark>
 *      <ya-geoobject [feature]="{ geometry: { type: 'Point', coordinates: [55.73, 37.52] } }"></ya-geoobject>
 *    </ya-clusterer>
 *  </ya-map>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/directives/clusterer}
 */
@Component({
  selector: 'ya-clusterer',
  template: ` <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YaClustererComponent
  implements AfterContentInit, OnChanges, OnDestroy {
  /**
   * Options for the clusterer.
   * @see {@link https://tech.yandex.com/maps/jsapi/doc/2.1/ref/reference/Clusterer-docpage/#Clustererparam-options}
   */
  @Input() public options: any;

  /**
   * Clusterer instance is added in a Map.
   */
  @Output() public ready = new EventEmitter<YaReadyEvent<ymaps.Clusterer>>();

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

  @ContentChildren(YaPlacemarkDirective)
  private _placemarks: QueryList<YaPlacemarkDirective>;

  @ContentChildren(YaGeoObjectDirective)
  private _geoObjects: QueryList<YaGeoObjectDirective>;

  private _clusterer?: ymaps.Clusterer;

  private _sub = new Subscription();

  constructor(
    private _ngZone: NgZone,
    private _yaMapComponent: YaMapComponent,
  ) {}

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    const clusterer = this._clusterer;

    if (clusterer) {
      const { options } = changes;

      if (options) {
        clusterer.options.set(options.currentValue);
      }
    }
  }

  public ngAfterContentInit(): void {
    const sub = this._yaMapComponent.map$.subscribe((map) => {
      if (map) {
        const clusterer = this._createClusterer();
        this._clusterer = clusterer;

        /**
         * Typings seems ok, bug in Yandex.Maps API documentation
         */
        map.geoObjects.add(clusterer as any);
        this._watchForContentChanges();
        this._addEventListeners(clusterer);
        this.ready.emit({ ymaps, target: clusterer });
      }
    });

    this._sub.add(sub);
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  /**
   * Creates Clusterer.
   */
  private _createClusterer(): ymaps.Clusterer {
    return new ymaps.Clusterer(this.options);
  }

  private _watchForContentChanges(): void {
    const clusterer = this._clusterer!;

    /**
     * Adds new Placemarks to the clusterer on changes.
     */
    const currentPlacemarks = new Set<ymaps.Placemark>();

    this._getInternalPlacemarks(this._placemarks.toArray()).forEach(
      (placemark) => {
        currentPlacemarks.add(placemark);
        clusterer.add(placemark);
      },
    );

    const placemarksSub = this._placemarks.changes.subscribe(
      (placemarkDirectives: YaPlacemarkDirective[]) => {
        const newPlacemarks = new Set<ymaps.Placemark>(
          this._getInternalPlacemarks(placemarkDirectives),
        );

        const difference = this._getDifference<ymaps.Placemark>(
          newPlacemarks,
          currentPlacemarks,
        );

        clusterer.add(difference.toAdd);
        clusterer.remove(difference.toRemove);
      },
    );

    this._sub.add(placemarksSub);

    /**
     * Adds new GeoObjects to the clusterer on changes.
     */
    const currentGeoObjects = new Set<ymaps.GeoObject>();

    this._getInternalGeoObjects(this._geoObjects.toArray()).forEach(
      (geoObject) => {
        currentGeoObjects.add(geoObject);
        clusterer.add(geoObject);
      },
    );

    const geoObjectsSub = this._geoObjects.changes.subscribe(
      (geoObjectDirectives: YaGeoObjectDirective[]) => {
        const newGeoObjects = new Set<ymaps.GeoObject>(
          this._getInternalGeoObjects(geoObjectDirectives),
        );

        const difference = this._getDifference<ymaps.GeoObject>(
          newGeoObjects,
          currentGeoObjects,
        );

        clusterer.add(difference.toAdd);
        clusterer.remove(difference.toRemove);
      },
    );

    this._sub.add(geoObjectsSub);
  }

  /**
   * Determines what should be added/removed in current set to equal new set
   *
   * @param newSet
   * @param currentSet
   */
  private _getDifference<T>(newSet: Set<T>, currentSet: Set<T>) {
    const toAdd: T[] = [];
    const toRemove: T[] = [];

    newSet.forEach((component) => {
      if (!currentSet.has(component)) {
        toAdd.push(component);
        currentSet.add(component);
      }
    });

    currentSet.forEach((component) => {
      if (!newSet.has(component)) {
        toRemove.push(component);
        currentSet.delete(component);
      }
    });

    return {
      toAdd,
      toRemove,
    };
  }

  private _getInternalPlacemarks(
    placemarks: YaPlacemarkDirective[],
  ): ymaps.Placemark[] {
    return placemarks
      .filter((component) => !!component.placemark)
      .map((component) => component.placemark!);
  }

  private _getInternalGeoObjects(
    geoObjects: YaGeoObjectDirective[],
  ): ymaps.GeoObject[] {
    return geoObjects
      .filter((component) => !!component.geoObject)
      .map((component) => component.geoObject!);
  }

  /**
   * Adds listeners on Clusterer events.
   */
  private _addEventListeners(clusterer: ymaps.Clusterer): void {
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
}
