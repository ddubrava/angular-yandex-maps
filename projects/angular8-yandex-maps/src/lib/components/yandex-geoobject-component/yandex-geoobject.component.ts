import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEvent, ILoadEvent } from '../../types/types';

@Component({
  selector: 'angular-yandex-geoobject',
  templateUrl: './yandex-geoobject.component.html',
  styleUrls: ['./yandex-geoobject.component.scss']
})
export class YandexGeoObjectComponent implements OnInit {
  @Input() public feature: any;
  @Input() public options: any;

  @Output() public load = new EventEmitter<ILoadEvent>();
  @Output() public baloon = new EventEmitter<IEvent>();
  @Output() public yaclick = new EventEmitter<IEvent>();
  @Output() public drag = new EventEmitter<IEvent>();
  @Output() public hint = new EventEmitter<IEvent>();
  @Output() public mouse = new EventEmitter<IEvent>();
  @Output() public multitouch = new EventEmitter<IEvent>();

  constructor() {}

  public ngOnInit(): void {
    this._logErrors();
  }

  private _logErrors(): void {
    if (!this.feature) {
      console.error('GeoObjects: feature input is required.');
      this.feature = {};
    }
  }

  public initGeoObject(ymaps: any, map: any): void {
    const geoObject = new ymaps.GeoObject(this.feature, this.options);

    map.geoObjects.add(geoObject);
    this.emitEvents(ymaps, geoObject);
  }

  /**
   * Emit events
   * @param ymaps - class from Yandex.Map API
   * @param multiroute - multiroute instance
   */
  public emitEvents(ymaps: any, geoObject: any): void {
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
}
