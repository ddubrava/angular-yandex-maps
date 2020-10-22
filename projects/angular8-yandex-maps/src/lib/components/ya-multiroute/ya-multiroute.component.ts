import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
  } from '@angular/core';
import { generateRandomId } from '../../utils/generateRandomId';
import { IEvent, ILoadEvent } from '../../models/models';
import { removeLeadingSpaces } from '../../utils/removeLeadingSpaces';
import { ScriptService } from '../../services/script/script.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'ya-multiroute',
  templateUrl: './ya-multiroute.component.html',
  styleUrls: ['./ya-multiroute.component.scss']
})
export class YaMultirouteComponent implements OnInit, OnChanges {
  /**
   * Reference points for the multi-route.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteReferencePoint-docpage/}
   */
  @Input() public referencePoints: ymaps.IMultiRouteReferencePoint[];
  /**
   * Model description object of a multiroute.
   */
  @Input() public model: ymaps.IMultiRouteModelJson;
  /**
   * Options for the multiroute.
   * @see
   * {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute-docpage/#multiRouter.MultiRoute__param-options}
   */
  @Input() public options: any;

  /**
   * Emits immediately after this entity is added in root container.
   */
  @Output() public load = new EventEmitter<ILoadEvent>();
  /**
   * Change to the active route.
   */
  @Output() public activeroutechange = new EventEmitter<IEvent>();
  /**
   * Actions with the ballon.
   */
  @Output() public baloon = new EventEmitter<IEvent>();
  /**
   * Left-click on the object.
   */
  @Output() public yaclick = new EventEmitter<IEvent>();
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
  private _map: ymaps.Map;
  private _multiroute: ymaps.multiRouter.MultiRoute;

  constructor(
    private _ngZone: NgZone,
  ) { }

  public ngOnInit(): void {
    this._logErrors();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._updateMultiroute(changes);
  }

  /**
   * Method for dynamic Miltiroute configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _updateMultiroute(changes: SimpleChanges): void {
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
      /**
       * Wrong typings in DefinitelyTyped.
       */
      (multiroute.options as any).set(options.currentValue);
    }
  }

  /**
   * Destructs state and provides new values to API.
   * @param model
   * @param multiroute
   */
  private _setModel(model: ymaps.IMultiRouteModelJson, multiroute: ymaps.multiRouter.MultiRoute): void {
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

  /**
   * Creates Multiroute.
   *
   * @param map Necessary for removing entity from map.geoObjects on Multiroute destroy
   * `this._map.geoObjects.remove(this._multiroute);`.
   */
  public createMultiroute(map: ymaps.Map): ymaps.multiRouter.MultiRoute {
    const multiroute = new ymaps.multiRouter.MultiRoute(
      { ...this.model, referencePoints: this.referencePoints }, this.options
    );

    this.id = generateRandomId();
    this._map = map;
    this._multiroute = multiroute;

    this._addEventListeners();

    return multiroute;
  }

  /**
   * Adds listeners on the Multiroute events.
   */
  private _addEventListeners(): void {
    const multiroute = this._multiroute;

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
