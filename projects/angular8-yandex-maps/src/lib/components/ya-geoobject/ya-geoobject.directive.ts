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
 * <example-url>https://stackblitz.com/edit/geoobject-polygon?embed=1</example-url>
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
   * Feature for the GeoObject.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#GeoObjectparam-feature}
   */
  @Input() feature: ymaps.IGeoObjectFeature;

  /**
   * Options for the GeoObject.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/GeoObject.html#GeoObjectparam-options}
   */
  @Input() options: ymaps.IGeoObjectOptions;

  /**
   * GeoObject instance is added in a Map.
   */
  @Output() ready: EventEmitter<YaReadyEvent<ymaps.GeoObject>> = new EventEmitter<
    YaReadyEvent<ymaps.GeoObject>
  >();

  /**
   * Closing the balloon.
   */
  @Output() balloonclose: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('balloonclose');

  /**
   * Opening a balloon on a map.
   */
  @Output() balloonopen: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('balloonopen');

  /**
   * Event preceding the "drag" event.
   */
  @Output() beforedrag: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('beforedrag');

  /**
   * Event preceding the "dragstart" event.
   */
  @Output() beforedragstart: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('beforedragstart');

  /**
   * Single left-click on the object.
   */
  @Output() yaclick: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('click');

  /**
   * Calls the element's context menu.
   */
  @Output() yacontextmenu: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('contextmenu');

  /**
   * Double left-click on the object.
   */
  @Output() yadblclick: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('dblclick');

  /**
   * Dragging a geo object.
   */
  @Output() yadrag: Observable<YaEvent<ymaps.GeoObject>> = this.eventManager.getLazyEmitter('drag');

  /**
   * End of geo object dragging.
   */
  @Output() yadragend: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('dragend');

  /**
   * Start of geo object dragging.
   */
  @Output() yadragstart: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('dragstart');

  /**
   * Change in the state of the editor for the geo object's geometry.
   */
  @Output() editorstatechange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('editorstatechange');

  /**
   * Change to the geo object geometry
   */
  @Output() geometrychange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('geometrychange');

  /**
   * Closing the hint.
   */
  @Output() hintclose: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('hintclose');

  /**
   * Opening a hint on a map.
   */
  @Output() hintopen: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('hintopen');

  /**
   * Map reference changed.
   */
  @Output() mapchange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('mapchange');

  /**
   * Pressing the mouse button over the object.
   */
  @Output() yamousedown: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('mousedown');

  /**
   * Pointing the cursor at the object.
   */
  @Output() yamouseenter: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('mouseenter');

  /**
   * Moving the cursor off of the object.
   */
  @Output() yamouseleave: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('mouseleave');

  /**
   * Moving the cursor over the object.
   */
  @Output() yamousemove: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('mousemove');

  /**
   * Letting go of the mouse button over an object.
   */
  @Output() yamouseup: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('mouseup');

  /**
   * End of multitouch.
   */
  @Output() multitouchend: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('multitouchend');

  /**
   * Repeating event during multitouch.
   */
  @Output() multitouchmove: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('multitouchmove');

  /**
   * Start of multitouch.
   */
  @Output() multitouchstart: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('multitouchstart');

  /**
   * Change to the object options.
   */
  @Output() optionschange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('optionschange');

  /**
   * Change to the geo object overlay.
   */
  @Output() overlaychange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('overlaychange');

  /**
   * The parent object reference changed.
   */
  @Output() parentchange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('parentchange');

  /**
   * Change to the geo object data.
   */
  @Output() propertieschange: Observable<YaEvent<ymaps.GeoObject>> =
    this.eventManager.getLazyEmitter('propertieschange');

  /**
   * Mouse wheel scrolling.
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
