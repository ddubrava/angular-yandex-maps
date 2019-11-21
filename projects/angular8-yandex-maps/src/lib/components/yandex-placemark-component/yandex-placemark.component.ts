import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEvent, ILoadEvent } from '../../types/types';

@Component({
  selector: 'angular-yandex-placemark',
  templateUrl: './yandex-placemark.component.html',
  styleUrls: ['./yandex-placemark.component.scss']
})
export class YandexPlacemarkComponent implements OnInit {
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

    map.geoObjects.add(placemark);
    this.emitEvents(ymaps, placemark);

    return placemark;
  }

  /**
   * Emit events
   * @param ymaps - class from Yandex.Map API
   * @param placemark - placemark instance
   */
  public emitEvents(ymaps: any, placemark: any): void {
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
}
