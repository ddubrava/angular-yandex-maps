import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges
  } from '@angular/core';
import { IEvent, ILoadEvent } from '../../models/models';
import { YaGeoObjectComponent } from '../ya-geoobject/ya-geoobject.component';
import { YaPlacemarkComponent } from '../ya-placemark/ya-placemark.component';

/**
 * Component, geo object clusterer. Clusterizes objects in the visible area of the map.
 * If the object does not fall within the visible area of the map,
 * it will not be added to the map.
 * Note, that the clusterer does not react to changing the coordinates of objects (either programmatically,
 * or as the result of dragging). If you want to change the coordinates of some object in the clusterer,
 * you should first delete the object from the clusterer and then add it back
 *
 * @example
 * <ya-clusterer>
 *  <ya-placemark [geometry]="[55.74, 37.50]"></ya-placemark>
 *   <ya-geoobject [feature]="{ geometry: { type: 'Point', coordinates: [55.73, 37.52] } }"></ya-geoobject>
 * </ya-clusterer>
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/components/clusterer}
 */
@Component({
  selector: 'ya-clusterer',
  templateUrl: './ya-clusterer.component.html',
  styleUrls: ['./ya-clusterer.component.scss']
})
export class YaClustererComponent implements OnChanges {
  @ContentChildren(YaPlacemarkComponent) public placemarks: QueryList<YaPlacemarkComponent>;
  @ContentChildren(YaGeoObjectComponent) public geoObjects: QueryList<YaGeoObjectComponent>;

  /**
   * Options for the clusterer
   * @see {@link https://tech.yandex.com/maps/jsapi/doc/2.1/ref/reference/Clusterer-docpage/#Clusterer__param-options}
   */
  @Input() public options: any;

  /**
   * Emits immediately after this entity is added in root container
   */
  @Output() public load = new EventEmitter<ILoadEvent>();
  /**
   * Action with hint
   */
  @Output() public hint = new EventEmitter<IEvent>();
  /**
   * Map reference changed
   */
  @Output() public mapChange = new EventEmitter<IEvent>();
  /**
   * Change to the object options
   */
  @Output() public optionsChange = new EventEmitter<IEvent>();
  /**
   * The parent object reference changed
   */
  @Output() public parentChange = new EventEmitter<IEvent>();

  // Yandex.Maps API
  private _clusterer: any;

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    this._configClusterer(changes);
  }

  /**
   * Method for dynamic entity configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _configClusterer(changes: SimpleChanges): void {
    const clusterer = this._clusterer;

    if (!clusterer) return;

    const { options } = changes;

    if (options) {
      clusterer.options.set(options.currentValue);
    }
  }

  public initClusterer(ymaps: any, map: any): void {
    const clusterer = new ymaps.Clusterer(this.options);
    this._clusterer = clusterer;

    this.placemarks.forEach((p) => {
      clusterer.add(p.initPlacemark(ymaps, map));
    });

    this.geoObjects.forEach((o) => {
      clusterer.add(o.initGeoObject(ymaps, map));
    });

    map.geoObjects.add(clusterer);
    this._emitEvents(ymaps, clusterer);
  }

  /**
   * Add listeners on clusterer events
   * @param ymaps
   * @param map
   */
  private _emitEvents(ymaps: any, clusterer: any): void {
    this.load.emit({ ymaps, instance: clusterer });

    // Hint
    clusterer.events
      .add(
        ['hintclose', 'hintopen'],
        (e: any) => this.hint.emit({ ymaps, instance: clusterer, type: e.originalEvent.type, event: e })
      );

    // Map change
    clusterer.events
      .add(
        ['mapchange'],
        (e: any) => this.mapChange.emit({ ymaps, instance: clusterer, type: e.originalEvent.type, event: e })
      );

    // Options change
    clusterer.events
      .add(
        ['optionschange'],
        (e: any) => this.optionsChange.emit({ ymaps, instance: clusterer, type: e.originalEvent.type, event: e })
      );

    // Parent change
    clusterer.events
      .add(
        ['parentchange'],
        (e: any) => this.parentChange.emit({ ymaps, instance: clusterer, type: e.originalEvent.type, event: e })
      );
  }
}
