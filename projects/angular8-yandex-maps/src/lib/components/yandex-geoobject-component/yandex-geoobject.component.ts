import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IEvent, ILoadEvent } from '../../models/models';

import { generateRandomId } from '../../utils/generateRandomId';
import { removeLeadingSpaces } from '../../utils/removeLeadingSpaces';

@Component({
  selector: 'angular-yandex-geoobject',
  templateUrl: './yandex-geoobject.component.html',
  styleUrls: ['./yandex-geoobject.component.scss']
})
export class YandexGeoObjectComponent implements OnInit, OnChanges {
  @Input() public feature: any;
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
  private _geoObject: any;

  constructor() {}

  public ngOnInit(): void {
    this._logErrors();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._configGeoObject(changes);
  }

  /**
   * Method for dynamic entity configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _configGeoObject(changes: SimpleChanges): void {
    const geoObject = this._geoObject;

    if (!geoObject) return;

    const { feature, options } = changes;

    if (feature) {
      this._setFeature(feature.currentValue, geoObject);
    }

    if (options) {
      geoObject.options.set(options.currentValue);
    }
  }

  /**
   * Destructuring state and provides new values to API
   * @param feature - https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObject__param-feature
   * @param geoObject
   */
  private _setFeature(feature: any, geoObject: any): void {
    const { geometry, properties } = feature;

    if (geometry) {
      console.error(removeLeadingSpaces(`
        The geometry of GeoObject cannot be changed after entity init.

        Solutions:
        1. Use ymaps from ILoadEvent
        2. Recreate GeoObject component with new feature.geometry
      `));
    }

    if (properties) {
      geoObject.properties.set(properties);
    }
  }

  private _logErrors(): void {
    if (!this.feature) {
      console.error('GeoObjects: feature input is required.');
      this.feature = {};
    }
  }

  public initGeoObject(ymaps: any, map: any): void {
    const geoObject = new ymaps.GeoObject(this.feature, this.options);

    this.id = generateRandomId();
    this._map = map;
    this._geoObject = geoObject;

    map.geoObjects.add(geoObject);
    this._emitEvents(ymaps, geoObject);
  }

  /**
   * Add listeners on placemark events
   * @param ymaps
   * @param map
   */
  private _emitEvents(ymaps: any, geoObject: any): void {
    this.load.emit({ ymaps, instance: geoObject });

    // Baloon
    geoObject.events
      .add(
        ['balloonopen', 'balloonclose'],
        (e: any) => this.baloon.emit({ ymaps, instance: geoObject, type: e.originalEvent.type, event: e })
      );

    // Click
    geoObject.events
      .add(
        ['click', 'dblclick'],
        (e: any) => this.yaclick.emit({ ymaps, instance: geoObject, type: e.originalEvent.type, event: e })
      );

    // Drag
    geoObject.events
      .add(
        ['dragstart', 'dragend'],
        (e: any) => this.drag.emit({ ymaps, instance: geoObject, type: e.originalEvent.type, event: e })
      );

    // Hint
    geoObject.events
      .add(
        ['hintopen', 'hintclose'],
        (e: any) => this.hint.emit({ ymaps, instance: geoObject, type: e.originalEvent.type, event: e })
      );

    // Mouse
    geoObject.events
      .add(
        ['mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseup'],
        (e: any) => this.mouse.emit({ ymaps, instance: geoObject, type: e.originalEvent.type, event: e })
      );

    // Multitouch
    geoObject.events
      .add(
        ['multitouchstart', 'multitouchmove', 'multitouchend'],
        (e: any) => this.multitouch.emit({ ymaps, instance: geoObject, type: e.originalEvent.type, event: e })
      );
  }

  public ngOnDestroy(): void {
    this._map.geoObjects.remove(this._geoObject);
  }
}
