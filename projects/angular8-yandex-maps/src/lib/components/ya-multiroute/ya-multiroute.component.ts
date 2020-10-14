import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
  } from '@angular/core';
import { generateRandomId } from '../../utils/generateRandomId';
import { IEvent, ILoadEvent } from '../../models/models';

/**
 * Component for creating Multi-route on the map
 * @example <ya-multiroute [referencePoints]="[[55.751952, 37.600739], 'Красные ворота, Москва']"></ya-multiroute>
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/components/multiroute}
 */
@Component({
  selector: 'ya-multiroute',
  templateUrl: './ya-multiroute.component.html',
  styleUrls: ['./ya-multiroute.component.scss']
})
export class YaMultirouteComponent implements OnInit, OnChanges {
  /**
   * Reference points for the multi-route
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteReferencePoint-docpage/}
   */
  @Input() public referencePoints: Array<any>;
  /**
   * The data model of a multi-route, or the model description object
   */
  @Input() public model: any;
  /**
   * Options for the multiroute
   * @see
   * {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute-docpage/#multiRouter.MultiRoute__param-options}
   */
  @Input() public options: any;

  /**
   * Emits immediately after this entity is added in root container
   */
  @Output() public load = new EventEmitter<ILoadEvent>();
  /**
   * Change to the active route
   */
  @Output() public activeroutechange = new EventEmitter<IEvent>();
  /**
   * Actions with ballon
   */
  @Output() public baloon = new EventEmitter<IEvent>();
  /**
   * Clicks on the object
   */
  @Output() public yaclick = new EventEmitter<IEvent>();
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
  private _map: any;
  private _multiroute: any;

  constructor(
    private _ngZone: NgZone,
  ) { }

  public ngOnInit(): void {
    this._logErrors();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._configMultiroute(changes);
  }

  /**
   * Method for dynamic entity configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _configMultiroute(changes: SimpleChanges): void {
    const multiroute = this._multiroute;

    if (!multiroute) return;

    const { referencePoints, model, options } = changes;

    if (referencePoints) {
      multiroute.model.setReferencePoints(referencePoints.currentValue);
    }

    if (model) {
      this._setModel(model.currentValue, multiroute);
    }

    if (options) {
      multiroute.options.set(options.currentValue);
    }
  }

  /**
   * Destructs state and provides new values to API
   * @param model https://tech.yandex.com/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRouteModel-docpage/
   * @param multiroute
   */
  private _setModel(model: any, multiroute: any): void {
    const { referencePoints, params } = model;

    if (referencePoints) {
      multiroute.model.setReferencePoints(referencePoints);
    }

    if (params) {
      multiroute.model.setParams(params);
    }
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
    this._addEventListeners(ymaps, multiroute);
  }

  /**
   * Add listeners on multiroute events
   * @param ymaps
   * @param map
   */
  private _addEventListeners(ymaps: any, multiroute: any): void {
    this._ngZone.run(() => this.load.emit({ ymaps, instance: multiroute }));

    const handlers = [
      {
        name: 'activeroutechange',
        fn: (e: any) => this.activeroutechange.emit({ ymaps, instance: multiroute, type: e.originalEvent.type, event: e }),
      },
      {
        name: ['balloonopen', 'balloonclose'],
        fn: (e: any) => this.baloon.emit({ ymaps, instance: multiroute, type: e.originalEvent.type, event: e }),
      },
      {
        name: ['click', 'dblclick'],
        fn: (e: any) => this.yaclick.emit({ ymaps, instance: multiroute, type: e.originalEvent.type, event: e }),
      },
      {
        name: ['mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseup'],
        fn: (e: any) => this.mouse.emit({ ymaps, instance: multiroute, type: e.originalEvent.type, event: e }),
      },
      {
        name: ['multitouchstart', 'multitouchmove', 'multitouchend'],
        fn: (e: any) => this.multitouch.emit({ ymaps, instance: multiroute, type: e.originalEvent.type, event: e }),
      },
    ];

    handlers.forEach((handler) => {
      multiroute.events.add(handler.name, (e: any) => this._ngZone.run(() => handler.fn(e)));
    });
  }

  public ngOnDestroy(): void {
    this._map.geoObjects.remove(this._multiroute);
  }
}
