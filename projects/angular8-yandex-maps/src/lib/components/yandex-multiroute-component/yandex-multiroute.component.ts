import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IEvent, ILoadEvent } from '../../types/types';
import { generateRandomId } from '../../utils/utils';

@Component({
  selector: 'angular-yandex-multiroute',
  templateUrl: './yandex-multiroute.component.html',
  styleUrls: ['./yandex-multiroute.component.scss']
})
export class YandexMultirouteComponent implements OnInit {
  @Input() public referencePoints: Array<any>;
  @Input() public model: any;
  @Input() public options: any;

  @Output() public load = new EventEmitter<ILoadEvent>();
  @Output() public activeroutechange = new EventEmitter<IEvent>();
  @Output() public baloon = new EventEmitter<IEvent>();
  @Output() public yaclick = new EventEmitter<IEvent>();
  @Output() public mouse = new EventEmitter<IEvent>();
  @Output() public multitouch = new EventEmitter<IEvent>();

  public id: string;

  // Yandex.Map API
  private _map: any;
  private _multiroute: any;

  constructor() { }

  public ngOnInit(): void {
    this._logErrors();
  }

  private _logErrors(): void {
    if (!this.referencePoints) {
      console.error('Multiroute: referencePoints input is required.');
      this.referencePoints = [];
    }
  }

  public initMultiroute(ymaps: any, map: any): void {
    const multiroute = new ymaps.multiRouter.MultiRoute(
      { ...this.model, referencePoints: this.referencePoints }, this.options
    );

    this.id = generateRandomId();
    this._map = map;
    this._multiroute = multiroute;

    map.geoObjects.add(multiroute);
    this._emitEvents(ymaps, multiroute);
  }

  /**
   * Add listeners on placemark events
   * @param ymaps
   * @param map
   */
  private _emitEvents(ymaps: any, multiroute: any): void {
    this.load.emit({ ymaps, instance: multiroute });

    // Activeroutechange
    multiroute.events
      .add(
        'activeroutechange',
        (e: any) => this.activeroutechange.emit({ ymaps, instance: multiroute, type: e.originalEvent.type, event: e })
      );

    // Baloon
    multiroute.events
      .add(
        ['balloonopen', 'balloonclose'],
        (e: any) => this.baloon.emit({ ymaps, instance: multiroute, type: e.originalEvent.type, event: e })
      );

    // Click
    multiroute.events
      .add(
        ['click', 'dblclick'],
        (e: any) => this.yaclick.emit({ ymaps, instance: multiroute, type: e.originalEvent.type, event: e })
      );

    // Mouse
    multiroute.events
      .add(
        ['mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseup'],
        (e: any) => this.mouse.emit({ ymaps, instance: multiroute, type: e.originalEvent.type, event: e })
      );

    // Multitouch
    multiroute.events
      .add(
        ['multitouchstart', 'multitouchmove', 'multitouchend'],
        (e: any) => this.multitouch.emit({ ymaps, instance: multiroute, type: e.originalEvent.type, event: e })
      );
  }

  public ngOnDestroy(): void {
    this._map.geoObjects.remove(this._multiroute);
  }
}
