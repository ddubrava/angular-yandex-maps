import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { generateRandomId } from '../../utils/generateRandomId';
import { IEvent, ILoadEvent } from '../../models/models';
import { removeLeadingSpaces } from '../../utils/removeLeadingSpaces';

/**
 * Component for creating a geo object.
 * Can be displayed as a placemark, polyline, polygon, etc., depending on the geometry type.
 *
 * @example `<ya-geoobject [feature]="{ geometry: { type: 'Rectangle', coordinates: [[55.665, 37.66], [55.64,37.53]] } }"></ya-geoobject>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/components/geoobject}
 */
@Component({
  selector: 'ya-geoobject',
  templateUrl: './ya-geoobject.component.html',
  styleUrls: ['./ya-geoobject.component.scss'],
})
export class YaGeoObjectComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Feature for the GeoObject.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObjectparam-feature}
   */
  @Input() public feature: ymaps.IGeoObjectFeature;

  /**
   * Options for the GeoObject.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/GeoObject-docpage/#GeoObjectparam-options}
   */
  @Input() public options: ymaps.IGeoObjectOptions;

  /**
   * Emits immediately after this entity is added in root container.
   */
  @Output() public load = new EventEmitter<ILoadEvent>();

  /**
   * Actions with the balloon.
   */
  @Output() public balloon = new EventEmitter<IEvent>();

  /**
   * Left-click on the object.
   */
  @Output() public yaclick = new EventEmitter<IEvent>();

  /**
   * GeoObject dragging.
   */
  @Output() public drag = new EventEmitter<IEvent>();

  /**
   * Actions with the hint.
   */
  @Output() public hint = new EventEmitter<IEvent>();

  /**
   * Mouse actions with the object.
   */
  @Output() public mouse = new EventEmitter<IEvent>();

  /**
   * Multitouch actions with the object.
   */
  @Output() public multitouch = new EventEmitter<IEvent>();

  public id: string;

  // Yandex.Maps API.
  private _clusterer: ymaps.Clusterer;

  private _geoObject: ymaps.GeoObject;

  private _map: ymaps.Map;

  constructor(private _ngZone: NgZone) {}

  public ngOnInit(): void {
    this._logErrors();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._updateGeoObject(changes);
  }

  /**
   * Method for dynamic GeoObject configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _updateGeoObject(changes: SimpleChanges): void {
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
   * Destructs state and provides new values to API.
   * @param feature
   * @param geoObject
   */
  private _setFeature(
    feature: ymaps.IGeoObjectFeature,
    geoObject: ymaps.GeoObject,
  ): void {
    const { geometry, properties } = feature;

    if (geometry) {
      console.error(
        removeLeadingSpaces(`
        The geometry of GeoObject cannot be changed after entity init.

        Solutions:
        1. Use ymaps from ILoadEvent
        2. Recreate GeoObject component with new feature.geometry
      `),
      );
    }

    if (properties) {
      /**
       * Wrong typings in DefinitelyTyped.
       */
      (geoObject.properties as any).set(properties);
    }
  }

  private _logErrors(): void {
    if (!this.feature) {
      console.error('GeoObjects: feature input is required.');
      this.feature = {};
    }
  }

  /**
   * Creates GeoObject.
   *
   * @param map Necessary for removing entity from map.geoObjects on GeoObject destroy
   * `this.map.geoObjects.remove(this.geoObject);`.
   * @param clusterer Necessary for removing entity from Clusterer on GeoObject destroy
   * `this.clusterer.remove(this.geoObject);`.
   */
  public createGeoObject(
    map: ymaps.Map,
    clusterer?: ymaps.Clusterer,
  ): ymaps.GeoObject {
    const geoObject = new ymaps.GeoObject(this.feature, this.options);
    this.id = generateRandomId();

    this._clusterer = clusterer;
    this._geoObject = geoObject;
    this._map = map;

    this._addEventListeners();

    return geoObject;
  }

  /**
   * Adds listeners on the GeoObject events.
   */
  private _addEventListeners(): void {
    const geoObject = this._geoObject;

    this._ngZone.run(() => this.load.emit({ ymaps, instance: geoObject }));

    const handlers = [
      {
        name: ['balloonopen', 'balloonclose'],
        fn: (e: any) =>
          this.balloon.emit({
            ymaps,
            instance: geoObject,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['click', 'dblclick'],
        fn: (e: any) =>
          this.yaclick.emit({
            ymaps,
            instance: geoObject,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['dragstart', 'dragend'],
        fn: (e: any) =>
          this.drag.emit({
            ymaps,
            instance: geoObject,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['hintopen', 'hintclose'],
        fn: (e: any) =>
          this.hint.emit({
            ymaps,
            instance: geoObject,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseup'],
        fn: (e: any) =>
          this.mouse.emit({
            ymaps,
            instance: geoObject,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['multitouchstart', 'multitouchmove', 'multitouchend'],
        fn: (e: any) =>
          this.multitouch.emit({
            ymaps,
            instance: geoObject,
            type: e.originalEvent.type,
            event: e,
          }),
      },
    ];

    handlers.forEach((handler) => {
      geoObject.events.add(handler.name, (e: any) =>
        this._ngZone.run(() => handler.fn(e)),
      );
    });
  }

  public ngOnDestroy(): void {
    /**
     * Wrong typings in DefinitelyTyped.
     */
    (this._clusterer as any)?.remove(this._geoObject);
    this._map.geoObjects.remove(this._geoObject);
  }
}
