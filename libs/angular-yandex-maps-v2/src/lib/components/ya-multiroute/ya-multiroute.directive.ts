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
import { Observable, Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { YaEvent } from '../../interfaces/ya-event';
import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import { EventManager } from '../../utils/event-manager/event-manager';
import { YaMapComponent } from '../ya-map/ya-map.component';

/**
 * @internal
 */
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

/**
 * The `ya-multiroute` component wraps `ymaps.multiRouter.MultiRoute` class from the Yandex.Maps API.
 * You can configure it via the component's inputs.
 * Events can be bound using the outputs of the component.
 *
 * ```html
 * <ya-map [center]="[55.761952, 37.620739]">
 *   <ya-multiroute
 *     [referencePoints]="[[55.751952, 37.600739], 'Красные ворота, Москва']"
 *     [models]="{ params: { routingMode: 'pedestrian' } }"
 *   ></ya-multiroute>
 * </ya-map>
 * ```
 */
@Directive({
  selector: 'ya-multiroute',
})
export class YaMultirouteDirective implements OnInit, OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly eventManager = new EventManager(this.ngZone);

  private multiroute?: ymaps.multiRouter.MultiRoute;

  /**
   * Multi-route reference points.
   * Shorthand for `[models]="{ referencePoints: [0, 0] }"`.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IMultiRouteReferencePoint.html}
   */
  @Input() referencePoints: ymaps.IMultiRouteReferencePoint[] = [];

  /**
   * The data model of a multi-route, or the model description object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html#multiRouter.MultiRoute__param-model}
   */
  @Input() model?:
    | ymaps.multiRouter.MultiRouteModel
    | Optional<ymaps.IMultiRouteModelJson, 'referencePoints'>;

  /**
   * Multi-route options.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html#multiRouter.MultiRoute__param-options}
   */
  @Input() options?: ymaps.multiRouter.IMultiRouteOptions;

  /**
   * Multi-route instance is added to a Map. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YaReadyEvent<ymaps.multiRouter.MultiRoute>> = new EventEmitter<
    YaReadyEvent<ymaps.multiRouter.MultiRoute>
  >();

  /**
   * Change to the active route.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html#event_detail__event-activeroutechange}
   */
  @Output() activeroutechange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('activeroutechange');

  /**
   * Closing the balloon.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html#event_detail__event-balloonclose}
   */
  @Output() balloonclose: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('balloonclose');

  /**
   * Opening the balloon.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html#event_detail__event-balloonopen}
   */
  @Output() balloonopen: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('balloonopen');

  /**
   * The event occurs at the time of setting the map center and its zoom level for optimal display of the multi-route.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html#event_detail__event-boundsautoapply}
   */
  @Output() boundsautoapply: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('boundsautoapply');

  /**
   * Changing coordinates of the geographical area covering the multi-route.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html#event_detail__event-boundschange}
   */
  @Output() boundschange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('boundschange');

  /**
   * Single left-click on the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-click}
   */
  @Output() yaclick: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('click');

  /**
   * Calls the element's context menu.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-contextmenu}
   */
  @Output() yacontextmenu: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('contextmenu');

  /**
   * Double left-click on the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-dblclick}
   */
  @Output() yadblclick: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('dblclick');

  /**
   * Change to the geo object geometry.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-geometrychange}
   */
  @Output() geometrychange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('geometrychange');

  /**
   * Map reference changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IParentOnMap.html#event_detail__event-mapchange}
   */
  @Output() mapchange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('mapchange');

  /**
   * Pressing the mouse button over the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mousedown}
   */
  @Output() yamousedown: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('mousedown');

  /**
   * Pointing the cursor at the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseenter}
   */
  @Output() yamouseenter: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('mouseenter');

  /**
   * Moving the cursor off of the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseleave}
   */
  @Output() yamouseleave: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('mouseleave');

  /**
   * Moving the cursor over the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mousemove}
   */
  @Output() yamousemove: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('mousemove');

  /**
   * Letting go of the mouse button over an object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseup}
   */
  @Output() yamouseup: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('mouseup');

  /**
   * End of multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchend}
   */
  @Output() multitouchend: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('multitouchend');

  /**
   * Repeating event during multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchmove}
   */
  @Output() multitouchmove: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('multitouchmove');

  /**
   * Start of multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchstart}
   */
  @Output() multitouchstart: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('multitouchstart');

  /**
   * Change to the object options.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/ICustomizable.html#event_detail__event-optionschange}
   */
  @Output() optionschange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('optionschange');

  /**
   * Change to the geo object overlay.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-overlaychange}
   */
  @Output() overlaychange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('overlaychange');

  /**
   * The parent object reference changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IChild.html#event_detail__event-parentchange}
   */
  @Output() parentchange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('parentchange');

  /**
   * Changing pixel coordinates of the area covering the multi-route.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html#event_detail__event-pixelboundschange}
   */
  @Output() pixelboundschange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('pixelboundschange');

  /**
   * Change to the geo object data.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-propertieschange}
   */
  @Output() propertieschange: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('propertieschange');

  /**
   * Updating the multi-route.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html#event_detail__event-update}
   */
  @Output() update: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('update');

  /**
   * Mouse wheel scrolling.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-wheel}
   */
  @Output() yawheel: Observable<YaEvent<ymaps.multiRouter.MultiRoute>> =
    this.eventManager.getLazyEmitter('wheel');

  constructor(
    private readonly ngZone: NgZone,
    private readonly yaMapComponent: YaMapComponent,
  ) {}

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const { multiroute } = this;

    if (multiroute) {
      const { referencePoints, model, options } = changes;

      if (model) {
        this.setModel(model.currentValue, multiroute);
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
    this.yaMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map) => {
      const multiroute = this.createMultiroute();
      this.multiroute = multiroute;

      map.geoObjects.add(multiroute);
      this.eventManager.setTarget(multiroute);
      this.ready.emit({ ymaps, target: multiroute });
    });
  }

  ngOnDestroy(): void {
    if (this.multiroute) {
      this.yaMapComponent?.map$.value?.geoObjects.remove(this.multiroute);
      this.eventManager.destroy();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Destructs state and passes them in API.
   * @param model
   * @param multiroute
   */
  private setModel(
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
  private createMultiroute(): ymaps.multiRouter.MultiRoute {
    return new ymaps.multiRouter.MultiRoute(this.combineModel(), this.options);
  }

  /**
   * Combines the models and reference points into single object
   */
  private combineModel(): ymaps.IMultiRouteModelJson {
    const model = (this.model || {}) as ymaps.IMultiRouteModelJson;

    return {
      ...model,
      referencePoints: this.referencePoints || model.referencePoints,
    };
  }
}
