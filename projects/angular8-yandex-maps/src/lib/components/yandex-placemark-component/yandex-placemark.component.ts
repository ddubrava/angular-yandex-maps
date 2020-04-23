import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IEvent, ILoadEvent } from '../../types/types';
import { generateRandomId } from '../../utils/utils';

@Component({
  selector: 'angular-yandex-placemark',
  templateUrl: './yandex-placemark.component.html',
  styleUrls: ['./yandex-placemark.component.scss']
})
export class YandexPlacemarkComponent implements OnInit, OnDestroy {
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
  private _placemark: any;

  constructor() {}

  public ngOnInit(): void {
    this._logErrors();
  }

  private _logErrors(): void {
    if (!this.geometry) {
      console.error('Placemark: geometry input is required.');
      this.geometry = [];
    }
  }

  public initPlacemark(ymaps: any, map: any): any {
    const placemark = new ymaps.Placemark(this.geometry, this.properties, this.options);

    this.id = generateRandomId();
    this._map = map;
    this._placemark = placemark;

    map.geoObjects.add(placemark);
    this._emitEvents(ymaps, placemark);

    return placemark;
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
    this._map.geoObjects.remove(this._placemark);
  }
}
