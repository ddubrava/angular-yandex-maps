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
import { Observable, Subject, takeUntil } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { EventManager } from '../../event-manager/event-manager';
import { YaEvent } from '../../models/ya-event';
import { YaReadyEvent } from '../../models/ya-ready-event';
import { YaGeoObjectDirective } from '../ya-geoobject/ya-geoobject.directive';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaPlacemarkDirective } from '../ya-placemark/ya-placemark.directive';

/**
 * The `ya-clusterer` component wraps `ymaps.Clusterer` class from the Yandex.Maps API.
 * You can configure it via the component's inputs.
 * Events can be bound using the outputs of the component.
 *
 * <example-url>https://stackblitz.com/edit/placemark-clusterer?embed=1</example-url>
 *
 * @example
 * ```html
 * <ya-map [center]="[55.761952, 37.620739]">
 *   <ya-clusterer [options]="{ minClusterSize: 5 }">
 *     <ya-placemark [geometry]="[55.74, 37.5]"></ya-placemark>
 *     <ya-placemark [geometry]="[55.64, 37.46]"></ya-placemark>
 *     <ya-placemark [geometry]="[55.75, 37.38]"></ya-placemark>
 *
 *     <ya-geoobject
 *       [feature]="{ geometry: { type: 'Point', coordinates: [55.81, 37.4] } }"
 *      ></ya-geoobject>
 *
 *     <ya-geoobject
 *       [feature]="{ geometry: { type: 'Point', coordinates: [55.7, 37.39] } }"
 *      ></ya-geoobject>
 *   </ya-clusterer>
 * </ya-map>
 * ```
 */
@Component({
  selector: 'ya-clusterer',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YaClustererComponent implements AfterContentInit, OnChanges, OnDestroy {
  @ContentChildren(YaPlacemarkDirective)
  private readonly placemarks: QueryList<YaPlacemarkDirective>;

  @ContentChildren(YaGeoObjectDirective)
  private readonly geoObjects: QueryList<YaGeoObjectDirective>;

  private readonly destroy$ = new Subject<void>();

  private readonly eventManager = new EventManager(this.ngZone);

  private clusterer?: ymaps.Clusterer;

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
    this.eventManager.getLazyEmitter('hintclose');

  /**
   * Opening a hint on a map.
   */
  @Output() hintopen: Observable<YaEvent<ymaps.Clusterer>> =
    this.eventManager.getLazyEmitter('hintopen');

  /**
   * Map reference changed.
   */
  @Output() mapchange: Observable<YaEvent<ymaps.Clusterer>> =
    this.eventManager.getLazyEmitter('mapchange');

  /**
   * Change to the object options.
   */
  @Output() optionschange: Observable<YaEvent<ymaps.Clusterer>> =
    this.eventManager.getLazyEmitter('optionschange');

  /**
   * The parent object reference changed.
   */
  @Output() parentchange: Observable<YaEvent<ymaps.Clusterer>> =
    this.eventManager.getLazyEmitter('parentchange');

  constructor(private readonly ngZone: NgZone, private readonly yaMapComponent: YaMapComponent) {}

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const { clusterer } = this;

    if (clusterer) {
      const { options } = changes;

      if (options) {
        clusterer.options.set(options.currentValue);
      }
    }
  }

  ngAfterContentInit(): void {
    this.yaMapComponent.map$
      .pipe(filter(Boolean), take(1), takeUntil(this.destroy$))
      .subscribe((map) => {
        const clusterer = this.createClusterer();
        this.clusterer = clusterer;

        map.geoObjects.add(clusterer);
        this.eventManager.setTarget(clusterer);
        this.watchForContentChanges(clusterer);
        this.ngZone.run(() => this.ready.emit({ ymaps, target: clusterer }));
      });
  }

  ngOnDestroy(): void {
    this.eventManager.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Creates Clusterer.
   */
  private createClusterer(): ymaps.Clusterer {
    return new ymaps.Clusterer(this.options);
  }

  private watchForContentChanges(clusterer: ymaps.Clusterer): void {
    // Adds new Placemarks to the clusterer on changes.
    const currentPlacemarks = new Set<ymaps.Placemark>();

    this.getInternalPlacemarks(this.placemarks.toArray()).forEach((placemark) => {
      currentPlacemarks.add(placemark);
      clusterer.add(placemark);
    });

    this.placemarks.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe((placemarkDirectives: YaPlacemarkDirective[]) => {
        const newPlacemarks = new Set<ymaps.Placemark>(
          this.getInternalPlacemarks(placemarkDirectives),
        );

        const difference = this.getDifference<ymaps.Placemark>(newPlacemarks, currentPlacemarks);

        clusterer.add(difference.toAdd);
        clusterer.remove(difference.toRemove);
      });

    // Adds new GeoObjects to the clusterer on changes.
    const currentGeoObjects = new Set<ymaps.GeoObject>();

    this.getInternalGeoObjects(this.geoObjects.toArray()).forEach((geoObject) => {
      currentGeoObjects.add(geoObject);
      clusterer.add(geoObject);
    });

    this.geoObjects.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe((geoObjectDirectives: YaGeoObjectDirective[]) => {
        const newGeoObjects = new Set<ymaps.GeoObject>(
          this.getInternalGeoObjects(geoObjectDirectives),
        );

        const difference = this.getDifference<ymaps.GeoObject>(newGeoObjects, currentGeoObjects);

        clusterer.add(difference.toAdd);
        clusterer.remove(difference.toRemove);
      });
  }

  /**
   * Determines what should be added/removed in current set to equal new set
   *
   * @param newSet
   * @param currentSet
   */
  private getDifference<T>(newSet: Set<T>, currentSet: Set<T>) {
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

  private getInternalPlacemarks(placemarks: YaPlacemarkDirective[]): ymaps.Placemark[] {
    return placemarks
      .filter((component) => !!component.placemark)
      .map((component) => component.placemark!);
  }

  private getInternalGeoObjects(geoObjects: YaGeoObjectDirective[]): ymaps.GeoObject[] {
    return geoObjects
      .filter((component) => !!component.geoObject)
      .map((component) => component.geoObject!);
  }
}
