import { Component, ContentChildren, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges } from '@angular/core';
import { IEvent, ILoadEvent } from '../../models/models';

import { YaGeoObjectComponent } from '../ya-geoobject/ya-geoobject.component';
import { YaPlacemarkComponent } from '../ya-placemark/ya-placemark.component';

@Component({
  selector: 'ya-clusterer',
  templateUrl: './ya-clusterer.component.html',
  styleUrls: ['./ya-clusterer.component.scss']
})
export class YaClustererComponent implements OnChanges {
  @ContentChildren(YaPlacemarkComponent) public placemarks: QueryList<YaPlacemarkComponent>;
  @ContentChildren(YaGeoObjectComponent) public geoObjects: QueryList<YaGeoObjectComponent>;

  @Input() public options: any;

  @Output() public load = new EventEmitter<ILoadEvent>();
  @Output() public hint = new EventEmitter<IEvent>();
  @Output() public mapChange = new EventEmitter<IEvent>();
  @Output() public optionsChange = new EventEmitter<IEvent>();
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
