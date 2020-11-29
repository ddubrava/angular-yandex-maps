import {
  Directive,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Listener } from '../../interfaces/listener';
import { YaEvent, YaReadyEvent } from '../../interfaces/event';
import { generateRandomId } from '../../utils/generateRandomId';

/**
 * Directive for creating Multi-route on the map.
 *
 * @example `<ya-multiroute [referencePoints]="[[55.751952, 37.600739], 'Красные ворота, Москва']"></ya-multiroute>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/directives/multiroute}
 */
@Directive({
  selector: 'ya-multiroute',
})
export class YaMultirouteDirective implements OnChanges, OnDestroy {
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
   * {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute-docpage/#multiRouter.MultiRouteparam-options}
   */
  @Input() public options: any;

  /**
   * Multiroute instance is created.
   */
  @Output() public ready = new EventEmitter<YaReadyEvent>();

  /**
   * Change to the active route.
   */
  @Output() public activeroutechange = new EventEmitter<YaEvent>();

  /**
   * Closing the balloon.
   */
  @Output() public balloonclose = new EventEmitter<YaEvent>();

  /**
   * Opening a balloon on a map.
   */
  @Output() public balloonopen = new EventEmitter<YaEvent>();

  /**
   * The event occurs at the time of setting the map center and its zoom level for optimal display of the multi-route.
   */
  @Output() public boundsautoapply = new EventEmitter<YaEvent>();

  /**
   * Changing coordinates of the geographical area covering the multi-route.
   */
  @Output() public boundschange = new EventEmitter<YaEvent>();

  /**
   * Single left-click on the object.
   */
  @Output() public yaclick = new EventEmitter<YaEvent>();

  /**
   * Calls the element's context menu.
   */
  @Output() public yacontextmenu = new EventEmitter<YaEvent>();

  /**
   * Double left-click on the object.
   */
  @Output() public yadbclick = new EventEmitter<YaEvent>();

  /**
   * Change to the geo object geometry.
   */
  @Output() public geometrychange = new EventEmitter<YaEvent>();

  /**
   * Map reference changed.
   */
  @Output() public mapchange = new EventEmitter<YaEvent>();

  /**
   * Pressing the mouse button over the object.
   */
  @Output() public yamousedown = new EventEmitter<YaEvent>();

  /**
   * Pointing the cursor at the object.
   */
  @Output() public yamouseenter = new EventEmitter<YaEvent>();

  /**
   * Moving the cursor off of the object.
   */
  @Output() public yamouseleave = new EventEmitter<YaEvent>();

  /**
   * Moving the cursor over the object.
   */
  @Output() public yamousemove = new EventEmitter<YaEvent>();

  /**
   * Letting go of the mouse button over an object.
   */
  @Output() public yamouseup = new EventEmitter<YaEvent>();

  /**
   * End of multitouch.
   */
  @Output() public multitouchend = new EventEmitter<YaEvent>();

  /**
   * Repeating event during multitouch.
   */
  @Output() public multitouchmove = new EventEmitter<YaEvent>();

  /**
   * Start of multitouch.
   */
  @Output() public multitouchstart = new EventEmitter<YaEvent>();

  /**
   * Change to the object options.
   */
  @Output() public optionschange = new EventEmitter<YaEvent>();

  /**
   * Change to the geo object overlay.
   */
  @Output() public overlaychange = new EventEmitter<YaEvent>();

  /**
   * The parent object reference changed.
   */
  @Output() public parentchange = new EventEmitter<YaEvent>();

  /**
   * Changing pixel coordinates of the area covering the multi-route.
   */
  @Output() public pixelboundschange = new EventEmitter<YaEvent>();

  /**
   * Change to the geo object data.
   */
  @Output() public propertieschange = new EventEmitter<YaEvent>();

  /**
   * Updating the multi-route.
   */
  @Output() public update = new EventEmitter<YaEvent>();

  /**
   * Mouse wheel scrolling.
   */
  @Output() public yawheel = new EventEmitter<YaEvent>();

  public id: string;

  // Yandex.Maps API.
  private _map: ymaps.Map;

  private _multiroute: ymaps.multiRouter.MultiRoute;

  constructor(private _ngZone: NgZone) {}

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
  private _setModel(
    model: ymaps.IMultiRouteModelJson,
    multiroute: ymaps.multiRouter.MultiRoute,
  ): void {
    const { referencePoints, params } = model;

    if (referencePoints) {
      multiroute.model.setReferencePoints(referencePoints);
    }

    if (params) {
      multiroute.model.setParams(params);
    }
  }

  /**
   * Creates Multiroute.
   *
   * @param map Necessary for removing entity from map.geoObjects on Multiroute destroy
   * `this.map.geoObjects.remove(this.multiroute);`.
   */
  public createMultiroute(map: ymaps.Map): ymaps.multiRouter.MultiRoute {
    this._checkRequiredInputs();

    const multiroute = new ymaps.multiRouter.MultiRoute(
      { ...this.model, referencePoints: this.referencePoints },
      this.options,
    );

    this._ngZone.run(() => this.ready.emit({ ymaps, target: multiroute }));

    this.id = generateRandomId();
    this._map = map;
    this._multiroute = multiroute;

    this._addEventListeners();

    return multiroute;
  }

  private _checkRequiredInputs(): void {
    if (this.referencePoints === undefined || this.referencePoints === null) {
      throw new Error('ReferencePoints is required');
    }
  }

  /**
   * Adds listeners on the Multiroute events.
   */
  private _addEventListeners(): void {
    const multiroute = this._multiroute;

    const listeners: Listener[] = [
      {
        name: 'activeroutechange',
        emitter: this.activeroutechange,
      },
      { name: 'balloonclose', emitter: this.balloonclose },
      { name: 'balloonopen', emitter: this.balloonopen },
      { name: 'boundsautoapply', emitter: this.boundsautoapply },
      { name: 'boundschange', emitter: this.boundschange },
      { name: 'click', emitter: this.yaclick },
      { name: 'contextmenu', emitter: this.yacontextmenu },
      { name: 'dbclick', emitter: this.yadbclick },

      { name: 'geometrychange', emitter: this.geometrychange },
      { name: 'mapchange', emitter: this.mapchange },
      { name: 'mousedown', emitter: this.yamousedown },
      {
        name: 'mouseenter',
        emitter: this.yamouseenter,
        runOutsideAngular: true,
      },
      {
        name: 'mouseleave',
        emitter: this.yamouseleave,
        runOutsideAngular: true,
      },
      { name: 'mousemove', emitter: this.yamousemove, runOutsideAngular: true },
      { name: 'mouseup', emitter: this.yamouseup, runOutsideAngular: true },
      {
        name: 'multitouchend',
        emitter: this.multitouchend,
        runOutsideAngular: true,
      },
      {
        name: 'multitouchmove',
        emitter: this.multitouchmove,
        runOutsideAngular: true,
      },
      {
        name: 'multitouchstart',
        emitter: this.multitouchstart,
        runOutsideAngular: true,
      },
      { name: 'optionschange', emitter: this.optionschange },
      { name: 'overlaychange', emitter: this.overlaychange },
      { name: 'parentchange', emitter: this.parentchange },
      { name: 'pixelboundschange', emitter: this.pixelboundschange },
      { name: 'propertieschange', emitter: this.propertieschange },
      { name: 'update', emitter: this.update },
      { name: 'wheel', emitter: this.yawheel },
    ];

    const fn = (event: ymaps.Event): YaEvent => ({
      event,
      target: multiroute,
      ymaps,
    });

    listeners.forEach((listener) => {
      multiroute.events.add(listener.name, (e: ymaps.Event) =>
        listener.runOutsideAngular
          ? this._ngZone.runOutsideAngular(() => listener.emitter.emit(fn(e)))
          : this._ngZone.run(() => listener.emitter.emit(fn(e))),
      );
    });
  }

  public ngOnDestroy(): void {
    this._map?.geoObjects.remove(this._multiroute);
  }
}
