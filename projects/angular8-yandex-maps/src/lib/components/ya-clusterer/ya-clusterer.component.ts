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
import { Observable, Subscription } from 'rxjs';
import { YaGeoObjectDirective } from '../ya-geoobject/ya-geoobject.directive';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaPlacemarkDirective } from '../ya-placemark/ya-placemark.directive';
import { EventManager } from '../../utils/event-manager';
import { YaReadyEvent } from '../../typings/ya-ready-event';
import { YaEvent } from '../../typings/ya-event';

/**
 * The `ya-clusterer` component wraps `ymaps.Clusterer` class from the Yandex Maps API.
 * You can configure it via the component's inputs.
 * Events can be bound using the outputs of the component.
 *
 * <example-url>https://stackblitz.com/edit/placemark-clusterer?embed=1</example-url>
 *
 * @example
 * <ya-map [center]="[55.761952, 37.620739]">
 *              <ya-clusterer [options]="{ minClusterSize: 5 }">
 *                <ya-placemark [geometry]="[55.74, 37.5]"></ya-placemark>
 *                <ya-placemark [geometry]="[55.64, 37.46]"></ya-placemark>
 *                <ya-placemark [geometry]="[55.75, 37.38]"></ya-placemark>
 *                <ya-geoobject
 *                  [feature]="{ geometry: { type: 'Point', coordinates: [55.81, 37.4] } }"
 *                 ></ya-geoobject>
 *                <ya-geoobject
 *                  [feature]="{ geometry: { type: 'Point', coordinates: [55.7, 37.39] } }"
 *                 ></ya-geoobject>
 *              </ya-clusterer>
 * </ya-map>
 */
@Component({
  selector: 'ya-clusterer',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YaClustererComponent implements AfterContentInit, OnChanges, OnDestroy {
  @ContentChildren(YaPlacemarkDirective)
  private readonly _placemarks: QueryList<YaPlacemarkDirective>;

  @ContentChildren(YaGeoObjectDirective)
  private readonly _geoObjects: QueryList<YaGeoObjectDirective>;

  private readonly _sub = new Subscription();

  private readonly _eventManager = new EventManager(this._ngZone);

  private _clusterer?: ymaps.Clusterer;

  /**
   * Options for the clusterer.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Clusterer.html#Clusterer__param-options}
   */
  @Input() options: ymaps.IClustererOptions;

  /**
   * Clusterer instance is added in a Map.
   */
  @Output() ready: EventEmitter<YaReadyEvent<ymaps.Clusterer>> = new EventEmitter<
    YaReadyEvent<ymaps.Clusterer>
  >();

  /**
   * Closing the hint.
   */
  @Output() hintclose: Observable<YaEvent<ymaps.Clusterer>> =
    this._eventManager.getLazyEmitter('hintclose');

  /**
   * Opening a hint on a map.
   */
  @Output() hintopen: Observable<YaEvent<ymaps.Clusterer>> =
    this._eventManager.getLazyEmitter('hintopen');

  /**
   * Map reference changed.
   */
  @Output() mapchange: Observable<YaEvent<ymaps.Clusterer>> =
    this._eventManager.getLazyEmitter('mapchange');

  /**
   * Change to the object options.
   */
  @Output() optionschange: Observable<YaEvent<ymaps.Clusterer>> =
    this._eventManager.getLazyEmitter('optionschange');

  /**
   * The parent object reference changed.
   */
  @Output() parentchange: Observable<YaEvent<ymaps.Clusterer>> =
    this._eventManager.getLazyEmitter('parentchange');

  constructor(private readonly _ngZone: NgZone, private readonly _yaMapComponent: YaMapComponent) {}

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const clusterer = this._clusterer;

    if (clusterer) {
      const { options } = changes;

      if (options) {
        clusterer.options.set(options.currentValue);
      }
    }
  }

  ngAfterContentInit(): void {
    if (this._yaMapComponent.isBrowser) {
      const sub = this._yaMapComponent.map$.subscribe((map) => {
        if (map) {
          const clusterer = this._createClusterer();
          this._clusterer = clusterer;

          /**
           * Typings seems ok, bug in Yandex.Maps API documentation
           */
          map.geoObjects.add(clusterer as any);
          this._eventManager.setTarget(clusterer);
          this._watchForContentChanges(clusterer);
          this.ready.emit({ ymaps, target: clusterer });
        }
      });

      this._sub.add(sub);
    }
  }

  ngOnDestroy(): void {
    this._eventManager.destroy();
    this._sub.unsubscribe();
  }

  /**
   * Creates Clusterer.
   */
  private _createClusterer(): ymaps.Clusterer {
    return new ymaps.Clusterer(this.options);
  }

  private _watchForContentChanges(clusterer: ymaps.Clusterer): void {
    /**
     * Adds new Placemarks to the clusterer on changes.
     */
    const currentPlacemarks = new Set<ymaps.Placemark>();

    this._getInternalPlacemarks(this._placemarks.toArray()).forEach((placemark) => {
      currentPlacemarks.add(placemark);
      clusterer.add(placemark);
    });

    const placemarksSub = this._placemarks.changes.subscribe(
      (placemarkDirectives: YaPlacemarkDirective[]) => {
        const newPlacemarks = new Set<ymaps.Placemark>(
          this._getInternalPlacemarks(placemarkDirectives),
        );

        const difference = this._getDifference<ymaps.Placemark>(newPlacemarks, currentPlacemarks);

        clusterer.add(difference.toAdd);
        clusterer.remove(difference.toRemove);
      },
    );

    this._sub.add(placemarksSub);

    /**
     * Adds new GeoObjects to the clusterer on changes.
     */
    const currentGeoObjects = new Set<ymaps.GeoObject>();

    this._getInternalGeoObjects(this._geoObjects.toArray()).forEach((geoObject) => {
      currentGeoObjects.add(geoObject);
      clusterer.add(geoObject);
    });

    const geoObjectsSub = this._geoObjects.changes.subscribe(
      (geoObjectDirectives: YaGeoObjectDirective[]) => {
        const newGeoObjects = new Set<ymaps.GeoObject>(
          this._getInternalGeoObjects(geoObjectDirectives),
        );

        const difference = this._getDifference<ymaps.GeoObject>(newGeoObjects, currentGeoObjects);

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

  private _getInternalPlacemarks(placemarks: YaPlacemarkDirective[]): ymaps.Placemark[] {
    return placemarks
      .filter((component) => !!component.placemark)
      .map((component) => component.placemark!);
  }

  private _getInternalGeoObjects(geoObjects: YaGeoObjectDirective[]): ymaps.GeoObject[] {
    return geoObjects
      .filter((component) => !!component.geoObject)
      .map((component) => component.geoObject!);
  }
}
