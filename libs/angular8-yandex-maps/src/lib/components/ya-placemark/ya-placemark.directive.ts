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

import { YaEvent } from '../../interfaces/ya-event';
import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import { EventManager } from '../../utils/event-manager/event-manager';
import { YaMapComponent } from '../ya-map/ya-map.component';

/**
 * The `ya-placemark` directive wraps `ymaps.Placemark` class from the Yandex.Maps API.
 * You can configure it via the directive's inputs.
 * Events can be bound using the outputs of the directive.
 *
 * <example-url>https://stackblitz.com/edit/custom-placemark?embed=1&view=preview</example-url>
 *
 * @example
 * ```html
 * <ya-map [center]="[55.751952, 37.600739]">
 *   <ya-placemark [geometry]="[55.751952, 37.600739]"></ya-placemark>
 * </ya-map>
 * ```
 */
@Directive({
  selector: 'ya-placemark',
})
export class YaPlacemarkDirective implements OnInit, OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly eventManager = new EventManager(this.ngZone);

  placemark?: ymaps.Placemark;

  /**
   * Coordinates of the placemark, or a hash describing the geometry, or a reference to the point geometry object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Placemark.html#Placemark__param-geometry}
   */
  @Input() geometry: number[] | object | ymaps.IPointGeometry = [];

  /**
   * Placemark properties.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Placemark.html#Placemark__param-properties}
   */
  @Input() properties?: ymaps.IPlacemarkProperties | ymaps.IDataManager;

  /**
   * Placemark options.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Placemark.html#Placemark__param-options}
   */
  @Input() options?: ymaps.IPlacemarkOptions;

  /**
   * Placemark instance is added to a Map. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YaReadyEvent<ymaps.Placemark>> = new EventEmitter<
    YaReadyEvent<ymaps.Placemark>
  >();

  /**
   * Closing the balloon.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-balloonclose}
   */
  @Output() balloonclose: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('balloonclose');

  /**
   * Opening a balloon on a geo object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-balloonopen}
   */
  @Output() balloonopen: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('balloonopen');

  /**
   * Event preceding the "drag" event.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-beforedrag}
   */
  @Output() beforedrag: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('beforedrag');

  /**
   * Event preceding the "dragstart" event.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-beforedragstart}
   */
  @Output() beforedragstart: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('beforedragstart');

  /**
   * Single left-click on the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-click}
   */
  @Output() yaclick: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('click');

  /**
   * Calls the element's context menu.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-contextmenu}
   */
  @Output() yacontextmenu: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('contextmenu');

  /**
   * Double left-click on the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-dblclick}
   */
  @Output() yadblclick: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('dblclick');

  /**
   * Dragging a geo object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-drag}
   */
  @Output() yadrag: Observable<YaEvent<ymaps.Placemark>> = this.eventManager.getLazyEmitter('drag');

  /**
   * End of geo object dragging.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-dragend}
   */
  @Output() yadragend: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('dragend');

  /**
   * Start of geo object dragging.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-dragstart}
   */
  @Output() yadragstart: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('dragstart');

  /**
   * Change in the state of the editor for the geo object's geometry.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-editorstatechange}
   */
  @Output() editorstatechange: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('editorstatechange');

  /**
   * Change to the geo object geometry.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-geometrychange}
   */
  @Output() geometrychange: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('geometrychange');

  /**
   * Closing the hint.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-hintclose}
   */
  @Output() hintclose: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('hintclose');

  /**
   * Opening a hint on a geo object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#event_detail__event-hintopen}
   */
  @Output() hintopen: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('hintopen');

  /**
   * Map reference changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IParentOnMap.html#event_detail__event-mapchange}
   */
  @Output() mapchange: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('mapchange');

  /**
   * Pressing the mouse button over the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mousedown}
   */
  @Output() yamousedown: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('mousedown');

  /**
   * Pointing the cursor at the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseenter}
   */
  @Output() yamouseenter: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('mouseenter');

  /**
   * Moving the cursor off of the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseleave}
   */
  @Output() yamouseleave: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('mouseleave');

  /**
   * Moving the cursor over the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mousemove}
   */
  @Output() yamousemove: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('mousemove');

  /**
   * Letting go of the mouse button over an object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseup}
   */
  @Output() yamouseup: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('mouseup');

  /**
   * End of multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchend}
   */
  @Output() multitouchend: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('multitouchend');

  /**
   * Repeating event during multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchmove}
   */
  @Output() multitouchmove: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('multitouchmove');

  /**
   * Start of multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchstart}
   */
  @Output() multitouchstart: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('multitouchstart');

  /**
   * Change to the object options.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/ICustomizable.html#event_detail__event-optionschange}
   */
  @Output() optionschange: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('optionschange');

  /**
   * Change to the geo object overlay.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-overlaychange}
   */
  @Output() overlaychange: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('overlaychange');

  /**
   * The parent object reference changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IChild.html#event_detail__event-parentchange}
   */
  @Output() parentchange: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('parentchange');

  /**
   * Change to the geo object data.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-propertieschange}
   */
  @Output() propertieschange: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('propertieschange');

  /**
   * Mouse wheel scrolling.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-wheel}
   */
  @Output() yawheel: Observable<YaEvent<ymaps.Placemark>> =
    this.eventManager.getLazyEmitter('wheel');

  constructor(private readonly ngZone: NgZone, private readonly yaMapComponent: YaMapComponent) {}

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const { placemark } = this;

    if (placemark) {
      const { geometry, properties, options } = changes;

      if (geometry) {
        placemark.geometry?.setCoordinates(geometry.currentValue);
      }

      if (properties) {
        placemark.properties.set(properties.currentValue);
      }

      if (options) {
        placemark.options.set(options.currentValue);
      }
    }
  }

  ngOnInit(): void {
    this.yaMapComponent.map$
      .pipe(filter(Boolean), take(1), takeUntil(this.destroy$))
      .subscribe((map) => {
        const placemark = this.createPlacemark();
        this.placemark = placemark;

        map.geoObjects.add(placemark);
        this.eventManager.setTarget(placemark);
        this.ready.emit({ ymaps, target: placemark });
      });
  }

  ngOnDestroy(): void {
    if (this.placemark) {
      this.yaMapComponent?.map$.value?.geoObjects.remove(this.placemark);
      this.eventManager.destroy();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Creates a placemark.
   */
  private createPlacemark(): ymaps.Placemark {
    return new ymaps.Placemark(this.geometry, this.properties, this.options);
  }
}
