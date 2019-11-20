import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from '../../types/types';

@Component({
  selector: 'angular-yandex-placemark',
  templateUrl: './yandex-placemark.component.html',
  styleUrls: ['./yandex-placemark.component.scss']
})
export class YandexPlacemarkComponent implements OnInit {
  @Input() public geometry: any;
  @Input() public properties: any;
  @Input() public options: any;

  @Output() public load = new EventEmitter<any>();
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
    this.emitEvents(placemark);

    return placemark;
  }

  /**
   * Emit events
   * @param placemark - placemark instance
   */
  public emitEvents(placemark: any): void {
    this.load.emit(placemark);

    // Baloon
    placemark.events
      .add(
        ['balloonopen', 'balloonclose'],
        (e: any) => this.baloon.emit({ instance: placemark, type: e.originalEvent.type, event: e })
      );

    // Click
    placemark.events
      .add(
        ['click', 'dblclick'],
        (e: any) => this.yaclick.emit({ instance: placemark, type: e.originalEvent.type, event: e })
      );

    // Drag
    placemark.events
      .add(
        ['dragstart', 'dragend'],
        (e: any) => this.drag.emit({ instance: placemark, type: e.originalEvent.type, event: e })
      );

    // Hint
    placemark.events
      .add(
        ['hintopen', 'hintclose'],
        (e: any) => this.hint.emit({ instance: placemark, type: e.originalEvent.type, event: e })
      );

    // Mouse
    placemark.events
      .add(
        ['mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseup'],
        (e: any) => this.mouse.emit({ instance: placemark, type: e.originalEvent.type, event: e })
      );

    // Multitouch
    placemark.events
      .add(
        ['multitouchstart', 'multitouchmove', 'multitouchend'],
        (e: any) => this.multitouch.emit({ instance: placemark, type: e.originalEvent.type, event: e })
      );
  }
}
