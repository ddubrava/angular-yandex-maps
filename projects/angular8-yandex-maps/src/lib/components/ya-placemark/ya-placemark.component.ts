import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
  } from '@angular/core';
import { generateRandomId } from '../../utils/generateRandomId';
import { IEvent, ILoadEvent } from '../../models/models';

/**
 * Component, geo object with the geometry geometry.Point
 * @example <ya-placemark [geometry]="[55.751952, 37.600739]"></ya-placemark>
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/components/placemark}
 */
@Component({
  selector: 'ya-placemark',
  templateUrl: './ya-placemark.component.html',
  styleUrls: ['./ya-placemark.component.scss']
})
export class YaPlacemarkComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Coordinates of the placemark, or a hash describing the geometry, or a reference to the point geometry object
   */
  @Input() public geometry: any;
  /**
   * Properties for the placemark
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemark__param-properties}
   */
  @Input() public properties: any;
  /**
   * Options for the placemark
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemark__param-options}
   */
  @Input() public options: any;

  /**
   * Emits immediately after this entity is added in root container
   */
  @Output() public load = new EventEmitter<ILoadEvent>();
  /**
   * Actions with ballon
   */
  @Output() public baloon = new EventEmitter<IEvent>();
  /**
   * Clicks on the object
   */
  @Output() public yaclick = new EventEmitter<IEvent>();
  /**
   * Placemark dragging
   */
  @Output() public drag = new EventEmitter<IEvent>();
  /**
   * Action with hint
   */
  @Output() public hint = new EventEmitter<IEvent>();
  /**
   * Mouse actions over the object
   */
  @Output() public mouse = new EventEmitter<IEvent>();
  /**
   * Multitouch actions over the object
   */
  @Output() public multitouch = new EventEmitter<IEvent>();

  public id: string;

  // Yandex.Maps API
  private _clusterer: any;
  private _map: any;
  private _placemark: any;

  constructor(
    private _ngZone: NgZone,
  ) {}

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
    const placemark = this._placemark;

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

  /**
   * Inits placemark
   * @param ymaps
   * @param map
   * @param clusterer We need this to control removing entity from Clusterer on Placemark destroy
   * `this._clusterer.remove(this.placemark)`;
   *
   * @returns Placemark
   */
  public initPlacemark(ymaps: any, map: any, clusterer?: any): any {
    const placemark = new ymaps.Placemark(this.geometry, this.properties, this.options);
    this.id = generateRandomId();

    this._clusterer = clusterer;
    this._map = map;
    this._placemark = placemark;

    map.geoObjects.add(placemark);
    this._addEventListeners(ymaps, placemark);

    return placemark;
  }

  /**
   * Add listeners on placemark events
   * @param ymaps
   * @param map
   */
  private _addEventListeners(ymaps: any, placemark: any): void {
    this._ngZone.run(() => this.load.emit({ ymaps, instance: placemark }));

    const handlers = [
      {
        name: ['balloonopen', 'balloonclose'],
        fn: (e: any) => this.baloon.emit({ ymaps, instance: placemark, type: e.originalEvent.type, event: e }),
      },
      {
        name: ['click', 'dblclick'],
        fn: (e: any) => this.yaclick.emit({ ymaps, instance: placemark, type: e.originalEvent.type, event: e }),
      },
      {
        name: ['dragstart', 'dragend'],
        fn: (e: any) => this.drag.emit({ ymaps, instance: placemark, type: e.originalEvent.type, event: e }),
      },
      {
        name: ['hintopen', 'hintclose'],
        fn: (e: any) => this.hint.emit({ ymaps, instance: placemark, type: e.originalEvent.type, event: e }),
      },
      {
        name: ['mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseup'],
        fn: (e: any) => this.mouse.emit({ ymaps, instance: placemark, type: e.originalEvent.type, event: e }),
      },
      {
        name: ['multitouchstart', 'multitouchmove', 'multitouchend'],
        fn: (e: any) => this.multitouch.emit({ ymaps, instance: placemark, type: e.originalEvent.type, event: e }),
      },
    ];

    handlers.forEach((handler) => {
      placemark.events.add(handler.name, (e: any) => this._ngZone.run(() => handler.fn(e)));
    });
  }

  public ngOnDestroy(): void {
    this._clusterer?.remove(this._placemark);
    this._map.geoObjects.remove(this._placemark);
  }
}
