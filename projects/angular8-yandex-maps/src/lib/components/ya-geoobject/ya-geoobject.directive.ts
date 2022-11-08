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
import { filter, take } from 'rxjs/operators';

import { EventManager } from '../../event-manager/event-manager';
import { YaEvent } from '../../models/ya-event';
import { YaReadyEvent } from '../../models/ya-ready-event';
import { YaMapComponent } from '../ya-map/ya-map.component';

/**
 * The `ya-geoobject` component wraps `ymaps.GeoObject` class from the Yandex.Maps API.
 * You can configure it via the component's inputs.
 * Events can be bound using the outputs of the component.
 *
 * <example-url>https://stackblitz.com/edit/geoobject-polygon?embed=1&view=preview</example-url>
 *
 * @example
 * ```html
 * <ya-map [center]="[55.761952, 37.620739]">
 *   <ya-geoobject
 *     [feature]="{ geometry: { type: 'Rectangle', coordinates: [[55.665, 37.66], [55.64,37.53]] } }"
 *   ></ya-geoobject>
 * </ya-map>
 * ```
 */
@Directive({
  selector: 'ya-geoobject',
})
export class YaGeoObjectDirective implements OnInit, OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly eventManager = new EventManager(this.ngZone);

  geoObject?: ymaps.GeoObject;

  /**
   * Geo object description.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#GeoObject__param-feature}
   */
  @Input() feature: ymaps.IGeoObjectFeature;

  /**
   * Geo object options.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#GeoObject__param-options}
   */
  @Input() options: ymaps.IGeoObjectOptions;

  /**
   * Geo object instance is added to a Map.
   */
  @Output() ready: EventEmitter<YaReadyEvent<ymaps.GeoObject>> = new EventEmitter<
    YaReadyEvent<ymaps.GeoObject>
  >();

  /**
   * Closing the balloon.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-balloonclose}
   */
  @Output() balloonclose: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('balloonclose');

  /**
   * Opening a balloon on a geo object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-balloonopen}
   */
  @Output() balloonopen: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('balloonopen');

  /**
   * Event preceding the "drag" event.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-beforedrag}
   */
  @Output() beforedrag: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('beforedrag');

  /**
   * Event preceding the "dragstart" event.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-beforedragstart}
   */
  @Output() beforedragstart: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('beforedragstart');

  /**
   * Single left-click on the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-click}
   */
  @Output() yaclick: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('click');

  /**
   * Calls the element's context menu.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-contextmenu}
   */
  @Output() yacontextmenu: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('contextmenu');

  /**
   * Double left-click on the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-dblclick}
   */
  @Output() yadblclick: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('dblclick');

  /**
   * Dragging a geo object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-drag}
   */
  @Output() yadrag: Observable<YaEvent<ymaps.GeoObject>> = this.eventManager.getLazyEmitter('drag');

  /**
   * End of geo object dragging.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-dragend}
   */
  @Output() yadragend: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('dragend');

  /**
   * Start of geo object dragging.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-dragstart}
   */
  @Output() yadragstart: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('dragstart');

  /**
   * Change in the state of the editor for the geo object's geometry.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-editorstatechange}
   */
  @Output() editorstatechange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('editorstatechange');

  /**
   * Change to the geo object geometry.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-geometrychange}
   */
  @Output() geometrychange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('geometrychange');

  /**
   * Closing the hint.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-hintclose}
   */
  @Output() hintclose: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('hintclose');

  /**
   * Opening a hint on a geo object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-hintopen}
   */
  @Output() hintopen: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('hintopen');

  /**
   * Map reference changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IParentOnMap.html#event_detail__event-mapchange}
   */
  @Output() mapchange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('mapchange');

  /**
   * Pressing the mouse button over the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mousedown}
   */
  @Output() yamousedown: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('mousedown');

  /**
   * Pointing the cursor at the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseenter}
   */
  @Output() yamouseenter: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('mouseenter');

  /**
   * Moving the cursor off of the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseleave}
   */
  @Output() yamouseleave: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('mouseleave');

  /**
   * Moving the cursor over the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mousemove}
   */
  @Output() yamousemove: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('mousemove');

  /**
   * Letting go of the mouse button over an object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseup}
   */
  @Output() yamouseup: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('mouseup');

  /**
   * End of multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchend}
   */
  @Output() multitouchend: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('multitouchend');

  /**
   * Repeating event during multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchmove}
   */
  @Output() multitouchmove: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('multitouchmove');

  /**
   * Start of multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchstart}
   */
  @Output() multitouchstart: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('multitouchstart');

  /**
   * Change to the object options.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/ICustomizable.html#event_detail__event-optionschange}
   */
  @Output() optionschange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('optionschange');

  /**
   * Change to the geo object overlay.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-overlaychange}
   */
  @Output() overlaychange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('overlaychange');

  /**
   * The parent object reference changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IChild.html#event_detail__event-parentchange}
   */
  @Output() parentchange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('parentchange');

  /**
   * Change to the geo object data.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-propertieschange}
   */
  @Output() propertieschange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('propertieschange');

  /**
   * Mouse wheel scrolling.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-wheel}
   */
  @Output() yawheel: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('wheel');

  constructor(private readonly ngZone: NgZone, private readonly yaMapComponent: YaMapComponent) {}

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const { geoObject } = this;

    if (geoObject) {
      const { feature, options } = changes;

      if (feature) {
        this.setFeature(feature.currentValue, geoObject);
      }

      if (options) {
        geoObject.options.set(options.currentValue);
      }
    }
  }

  ngOnInit(): void {
    this.yaMapComponent.map$
      .pipe(filter(Boolean), take(1), takeUntil(this.destroy$))
      .subscribe((map) => {
        const geoObject = this.createGeoObject();
        this.geoObject = geoObject;

        map.geoObjects.add(geoObject);
        this.eventManager.setTarget(geoObject);
        this.ngZone.run(() => this.ready.emit({ ymaps, target: geoObject }));
      });
  }

  ngOnDestroy(): void {
    if (this.geoObject) {
      this.yaMapComponent?.map$.value?.geoObjects.remove(this.geoObject);
      this.eventManager.destroy();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Destructs feature and passes it in API.
   * @param feature
   * @param geoObject
   */
  private setFeature(feature: ymaps.IGeoObjectFeature, geoObject: ymaps.GeoObject): void {
    const { geometry, properties } = feature;

    if (geometry) {
      console.warn(
        'The geometry can not be changed after entity init. To set it, you should recreate a GeoObject with new feature.geometry',
      );
    }

    if (properties) {
      geoObject.properties.set(properties);
    }
  }

  /**
   * Creates GeoObject.
   */
  private createGeoObject(): ymaps.GeoObject {
    return new ymaps.GeoObject(this.feature, this.options);
  }
}
