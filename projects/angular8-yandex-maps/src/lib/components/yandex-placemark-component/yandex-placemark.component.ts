import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { IEvent, ILoadEvent } from '../../models/models';

import { generateRandomId } from '../../utils/generateRandomId';

@Component({
  selector: 'angular-yandex-placemark',
  templateUrl: './yandex-placemark.component.html',
  styleUrls: ['./yandex-placemark.component.scss']
})
export class YandexPlacemarkComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public geometry: any;
  @Input() public properties: any;
  @Input() public options: any;

  @Output() public load = new EventEmitter<ILoadEvent>();
  @Output() public baloon = new EventEmitter<IEvent>();
  @Output() public yaclick = new EventEmitter<IEvent>();
  @Output() public drag = new EventEmitter<IEvent>();
  @Output() public hint = new EventEmitter<IEvent>();
  @Output() public mouse = new EventEmitter<IEvent>();
  @Output() public multitouch = new EventEmitter<IEvent>();

  public id: string;

  // Yandex.Map API
  private _map: any;
  public placemark: any;
  private _clusterer: any;

  constructor() {}

  public ngOnInit(): void {
    this._logErrors();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._configPlacemark(changes);
  }

  /**
   * Method for dynamic entity configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _configPlacemark(changes: SimpleChanges): void {
    const placemark = this.placemark;

    if (!placemark) return;

    const { geometry, properties, options } = changes;

    if (geometry) {
      placemark.geometry.setCoordinates(geometry.currentValue);
    }

    if (properties) {
      placemark.properties.set(properties.currentValue);
    }

    if (options) {
      placemark.options.set(options.currentValue);
    }
  }

  private _logErrors(): void {
    if (!this.geometry) {
      console.error('Placemark: geometry input is required.');
      this.geometry = [];
    }
  }

  public initPlacemark(ymaps: any, map: any, clusterer?: any): any {
    const placemark = new ymaps.Placemark(this.geometry, this.properties, this.options);

    this.id = generateRandomId();
    this._map = map;
    this.placemark = placemark;
    this._clusterer = clusterer;

    map.geoObjects.add(placemark);
    this._emitEvents(ymaps, placemark);
  }

  /**
   * Add listeners on placemark events
   * @param ymaps
   * @param map
   */
  private _emitEvents(ymaps: any, placemark: any): void {
    this.load.emit({ ymaps, instance: placemark });

    // Baloon
    placemark.events
      .add(
        ['balloonopen', 'balloonclose'],
        (e: any) => this.baloon.emit({ ymaps, instance: placemark, type: e.originalEvent.type, event: e })
      );

    // Click
    placemark.events
      .add(
        ['click', 'dblclick'],
        (e: any) => this.yaclick.emit({ ymaps, instance: placemark, type: e.originalEvent.type, event: e })
      );

    // Drag
    placemark.events
      .add(
        ['dragstart', 'dragend'],
        (e: any) => this.drag.emit({ ymaps, instance: placemark, type: e.originalEvent.type, event: e })
      );

    // Hint
    placemark.events
      .add(
        ['hintopen', 'hintclose'],
        (e: any) => this.hint.emit({ ymaps, instance: placemark, type: e.originalEvent.type, event: e })
      );

    // Mouse
    placemark.events
      .add(
        ['mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseup'],
        (e: any) => this.mouse.emit({ ymaps, instance: placemark, type: e.originalEvent.type, event: e })
      );

    // Multitouch
    placemark.events
      .add(
        ['multitouchstart', 'multitouchmove', 'multitouchend'],
        (e: any) => this.multitouch.emit({ ymaps, instance: placemark, type: e.originalEvent.type, event: e })
      );
  }

  public ngOnDestroy(): void {
    if (this._clusterer) {
      this._clusterer.remove(this.placemark);
    }

    this._map.geoObjects.remove(this.placemark);
  }
}
