import {
  Directive,
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

/**
 * Directive for creating a geo object with the geometry geometry.Point.
 *
 * @example `<ya-placemark [geometry]="[55.751952, 37.600739]"></ya-placemark>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/components/placemark}
 */
@Directive({
  selector: 'ya-placemark',
})
export class YaPlacemarkDirective implements OnInit, OnChanges, OnDestroy {
  /**
   * Coordinates of the placemark, or a hash describing the geometry, or a reference to the point geometry object.
   */
  @Input() public geometry: number[] | object | ymaps.IPointGeometry;

  /**
   * Properties for the placemark.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemarkparam-properties}
   */
  @Input() public properties: object | ymaps.IDataManager;

  /**
   * Options for the placemark.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemarkparam-options}
   */
  @Input() public options: ymaps.IPlacemarkOptions;

  /**
   * Emits immediately after this entity is added in root container.
   */
  @Output() public ready = new EventEmitter<ILoadEvent>();

  /**
   * Actions with the balloon.
   */
  @Output() public balloon = new EventEmitter<IEvent>();

  /**
   * Left-click on the object.
   */
  @Output() public yaclick = new EventEmitter<IEvent>();

  /**
   * Placemark dragging.
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
  private _clusterer: ymaps.Clusterer | undefined;

  private _map: ymaps.Map;

  private _placemark: ymaps.Placemark;

  constructor(private _ngZone: NgZone) {}

  public ngOnInit(): void {
    this._logErrors();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._updatePlacemark(changes);
  }

  /**
   * Method for dynamic Placemark configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _updatePlacemark(changes: SimpleChanges): void {
    const placemark = this._placemark;

    if (!placemark) return;

    const { geometry, properties, options } = changes;

    if (geometry) {
      placemark.geometry?.setCoordinates(geometry.currentValue);
    }

    if (properties) {
      /**
       * Wrong typings in DefinitelyTyped.
       */
      (placemark.properties as any).set(properties.currentValue);
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

  /**
   * Creates placemark.
   *
   * @param map Necessary for removing entity from map.geoObjects on Placemark destroy
   * `this.map.geoObjects.remove(this.placemark);`.
   * @param clusterer Necessary for removing entity from Clusterer on Placemark destroy
   * `this.clusterer.remove(this.placemark);`.
   */
  public createPlacemark(
    map: ymaps.Map,
    clusterer?: ymaps.Clusterer,
  ): ymaps.Placemark {
    const placemark = new ymaps.Placemark(
      this.geometry,
      this.properties,
      this.options,
    );

    this.id = generateRandomId();

    this._clusterer = clusterer;
    this._map = map;
    this._placemark = placemark;

    this._addEventListeners();

    return placemark;
  }

  /**
   * Adds listeners on the Placemark events.
   */
  private _addEventListeners(): void {
    const placemark = this._placemark;

    this._ngZone.run(() => this.ready.emit({ ymaps, instance: placemark }));

    const handlers = [
      {
        name: ['balloonopen', 'balloonclose'],
        fn: (e: any) =>
          this.balloon.emit({
            ymaps,
            instance: placemark,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['click', 'dblclick'],
        fn: (e: any) =>
          this.yaclick.emit({
            ymaps,
            instance: placemark,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['dragstart', 'dragend'],
        fn: (e: any) =>
          this.drag.emit({
            ymaps,
            instance: placemark,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['hintopen', 'hintclose'],
        fn: (e: any) =>
          this.hint.emit({
            ymaps,
            instance: placemark,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseup'],
        fn: (e: any) =>
          this.mouse.emit({
            ymaps,
            instance: placemark,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['multitouchstart', 'multitouchmove', 'multitouchend'],
        fn: (e: any) =>
          this.multitouch.emit({
            ymaps,
            instance: placemark,
            type: e.originalEvent.type,
            event: e,
          }),
      },
    ];

    handlers.forEach((handler) => {
      placemark.events.add(handler.name, (e: any) =>
        this._ngZone.run(() => handler.fn(e)),
      );
    });
  }

  public ngOnDestroy(): void {
    /**
     * Wrong typings in DefinitelyTyped.
     */
    (this._clusterer as any)?.remove(this._placemark);
    this._map?.geoObjects.remove(this._placemark);
  }
}
