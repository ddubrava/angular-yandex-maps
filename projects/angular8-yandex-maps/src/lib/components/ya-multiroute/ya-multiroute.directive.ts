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
import { Observable, Subscription } from 'rxjs';
import { EventManager } from '../../event-manager';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaReadyEvent } from '../../typings/ya-ready-event';
import { YaEvent } from '../../typings/ya-event';

/**
 * @internal
 */
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

/**
 * The `ya-multiroute` component wraps `ymaps.multiRouter.MultiRoute` class from the Yandex.Maps API.
 * You can configure it via the component's inputs.
 * Events can be bound using the outputs of the component.
 *
 * <example-url>https://stackblitz.com/edit/multiroute-pedestrian?embed=1</example-url>
 *
 * @example
 * ```html
 * <ya-map [center]="[55.761952, 37.620739]">
 *   <ya-multiroute
 *     [referencePoints]="[[55.751952, 37.600739], 'Красные ворота, Москва']"
 *     [model]="{ params: { routingMode: 'pedestrian' } }"
 *   ></ya-multiroute>
 * </ya-map>
 * ```
 */
@Directive({
  selector: 'ya-multiroute',
})
export class YaMultirouteDirective implements OnInit, OnChanges, OnDestroy {
  private readonly _sub = new Subscription();

  private readonly _eventManager = new EventManager(this._ngZone);

  private _multiroute?: ymaps.multiRouter.MultiRoute;

  /**
   * Reference points for the multiroute.
   * Shorthand for [model]="{ referencePoints: [0, 0] }".
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IMultiRouteReferencePoint.html}
   */
  @Input() referencePoints: ymaps.IMultiRouteReferencePoint[];

  /**
   * Model description object of a multiroute.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IMultiRouteModelJson.html}
   */
  @Input() model:
    | ymaps.multiRouter.MultiRouteModel
    | Optional<ymaps.IMultiRouteModelJson, 'referencePoints'>;

  /**
   * Options for the multiroute.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html#multiRouter.MultiRoute__param-options}
   */
  @Input() options: ymaps.multiRouter.IMultiRouteOptions;

  /**
   * Multiroute instance is added in a Map.
   */
  @Output() ready: EventEmitter<YaReadyEvent<ymaps.multiRouter.MultiRoute>> = new EventEmitter<
    YaReadyEvent<ymaps.multiRouter.MultiRoute>
  >();

  /**
   * Change to the active route.
   */
  @Output() activeroutechange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('activeroutechange');

  /**
   * Closing the balloon.
   */
  @Output() balloonclose: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('balloonclose');

  /**
   * Opening a balloon on a map.
   */
  @Output() balloonopen: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('balloonopen');

  /**
   * The event occurs at the time of setting the map center and its zoom level for optimal display of the multi-route.
   */
  @Output() boundsautoapply: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('boundsautoapply');

  /**
   * Changing coordinates of the geographical area covering the multi-route.
   */
  @Output() boundschange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('boundschange');

  /**
   * Single left-click on the object.
   */
  @Output() yaclick: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('click');

  /**
   * Calls the element's context menu.
   */
  @Output() yacontextmenu: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('contextmenu');

  /**
   * Double left-click on the object.
   */
  @Output() yadblclick: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('dblclick');

  /**
   * Change to the geo object geometry.
   */
  @Output() geometrychange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('geometrychange');

  /**
   * Map reference changed.
   */
  @Output() mapchange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('mapchange');

  /**
   * Pressing the mouse button over the object.
   */
  @Output() yamousedown: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('mousedown');

  /**
   * Pointing the cursor at the object.
   */
  @Output() yamouseenter: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('mouseenter');

  /**
   * Moving the cursor off of the object.
   */
  @Output() yamouseleave: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('mouseleave');

  /**
   * Moving the cursor over the object.
   */
  @Output() yamousemove: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('mousemove');

  /**
   * Letting go of the mouse button over an object.
   */
  @Output() yamouseup: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('mouseup');

  /**
   * End of multitouch.
   */
  @Output() multitouchend: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('multitouchend');

  /**
   * Repeating event during multitouch.
   */
  @Output() multitouchmove: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('multitouchmove');

  /**
   * Start of multitouch.
   */
  @Output() multitouchstart: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('multitouchstart');

  /**
   * Change to the object options.
   */
  @Output() optionschange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('optionschange');

  /**
   * Change to the geo object overlay.
   */
  @Output() overlaychange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('overlaychange');

  /**
   * The parent object reference changed.
   */
  @Output() parentchange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('parentchange');

  /**
   * Changing pixel coordinates of the area covering the multi-route.
   */
  @Output() pixelboundschange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('pixelboundschange');

  /**
   * Change to the geo object data.
   */
  @Output() propertieschange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('propertieschange');

  /**
   * Updating the multi-route.
   */
  @Output() update: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('update');

  /**
   * Mouse wheel scrolling.
   */
  @Output() yawheel: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this._eventManager.getLazyEmitter('wheel');

  constructor(private readonly _ngZone: NgZone, private readonly _yaMapComponent: YaMapComponent) {}

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const multiroute = this._multiroute;

    if (multiroute) {
      const { referencePoints, model, options } = changes;

      if (model) {
        this._setModel(model.currentValue, multiroute);
      }

      if (referencePoints) {
        multiroute.model.setReferencePoints(referencePoints.currentValue);
      }

      if (options) {
        multiroute.options.set(options.currentValue);
      }
    }
  }

  ngOnInit(): void {
    if (this._yaMapComponent.isBrowser) {
      const sub = this._yaMapComponent.map$.subscribe((map) => {
        if (map) {
          const multiroute = this._createMultiroute();
          this._multiroute = multiroute;

          map.geoObjects.add(multiroute);
          this._eventManager.setTarget(multiroute);
          this._ngZone.run(() => this.ready.emit({ ymaps, target: multiroute }));
        }
      });

      this._sub.add(sub);
    }
  }

  ngOnDestroy(): void {
    if (this._multiroute) {
      this._yaMapComponent?.map$.value?.geoObjects.remove(this._multiroute);
      this._eventManager.destroy();
    }

    this._sub.unsubscribe();
  }

  /**
   * Destructs state and passes them in API.
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
   */
  private _createMultiroute(): ymaps.multiRouter.MultiRoute {
    return new ymaps.multiRouter.MultiRoute(this._combineModel(), this.options);
  }

  /**
   * Combines the model and reference points into single object
   */
  private _combineModel(): ymaps.IMultiRouteModelJson {
    const model = (this.model || {}) as ymaps.IMultiRouteModelJson;

    return {
      ...model,
      referencePoints: this.referencePoints || model.referencePoints,
    };
  }
}
