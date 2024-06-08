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
 * The `ya-object-manager` component wraps `ymaps.ObjectManager` class from the Yandex.Maps API.
 * You can configure it via the component's inputs.
 * Events can be bound using the outputs of the component.
 *
 * <example-url>https://stackblitz.com/edit/object-manager?embed=1&view=preview</example-url>
 *
 * ```html
 * <ya-map [center]="[55.761952, 37.620739]">
 *   <ya-object-manager
 *     [options]="{ clusterize: true }"
 *     (ready)="onReady($event)"
 *   ></ya-object-manager>
 * </ya-map>
 * ```
 */
@Directive({
  selector: 'ya-object-manager',
})
export class YaObjectManagerDirective implements OnInit, OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly eventManager = new EventManager(this.ngZone);

  private objectManager?: ymaps.ObjectManager;

  /**
   * ObjectManager options.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/ObjectManager.html#ObjectManager__param-options}
   */
  @Input() options?: ymaps.IObjectManagerOptions;

  /**
   * ObjectManager instance is added to a Map. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YaReadyEvent<ymaps.ObjectManager>> = new EventEmitter<
    YaReadyEvent<ymaps.ObjectManager>
  >();

  /**
   * Single left-click on the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-click}
   */
  @Output() yaclick: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('click');

  /**
   * Calls the element's context menu.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-contextmenu}
   */
  @Output() yacontextmenu: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('contextmenu');

  /**
   * Double left-click on the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-dblclick}
   */
  @Output() yadblclick: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('dblclick');

  /**
   * Change to the geo object geometry.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-geometrychange}
   */
  @Output() geometrychange: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('geometrychange');

  /**
   * Map reference changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IParentOnMap.html#event_detail__event-mapchange}
   */
  @Output() mapchange: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('mapchange');

  /**
   * Pressing the mouse button over the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mousedown}
   */
  @Output() yamousedown: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('mousedown');

  /**
   * Pointing the cursor at the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseenter}
   */
  @Output() yamouseenter: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('mouseenter');

  /**
   * Moving the cursor off of the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseleave}
   */
  @Output() yamouseleave: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('mouseleave');

  /**
   * Moving the cursor over the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mousemove}
   */
  @Output() yamousemove: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('mousemove');

  /**
   * Letting go of the mouse button over an object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseup}
   */
  @Output() yamouseup: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('mouseup');

  /**
   * End of multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchend}
   */
  @Output() multitouchend: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('multitouchend');

  /**
   * Repeating event during multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchmove}
   */
  @Output() multitouchmove: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('multitouchmove');

  /**
   * Start of multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchstart}
   */
  @Output() multitouchstart: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('multitouchstart');

  /**
   * Change to the object options.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/ICustomizable.html#event_detail__event-optionschange}
   */
  @Output() optionschange: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('optionschange');

  /**
   * Change to the geo object overlay.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-overlaychange}
   */
  @Output() overlaychange: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('overlaychange');

  /**
   * The parent object reference changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IChild.html#event_detail__event-parentchange}
   */
  @Output() parentchange: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('parentchange');

  /**
   * Change to the geo object data.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IGeoObject.html#event_detail__event-propertieschange}
   */
  @Output() propertieschange: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('propertieschange');

  /**
   * Mouse wheel scrolling.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-wheel}
   */
  @Output() yawheel: Observable<YaEvent<ymaps.ObjectManager>> =
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
    const { objectManager } = this;

    if (objectManager) {
      const { options } = changes;

      if (options) {
        objectManager.options.set(options.currentValue);
      }
    }
  }

  ngOnInit(): void {
    this.yaMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map) => {
      const objectManager = this.createObjectManager();
      this.objectManager = objectManager;

      map.geoObjects.add(objectManager);
      this.eventManager.setTarget(objectManager);
      this.ready.emit({ ymaps, target: objectManager });
    });
  }

  ngOnDestroy(): void {
    if (this.objectManager) {
      this.yaMapComponent?.map$.value?.geoObjects.remove(this.objectManager);
      this.eventManager.destroy();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Creates ObjectManager.
   */
  private createObjectManager(): ymaps.ObjectManager {
    if (!this.options) {
      throw new Error('ObjectManager options are undefined.');
    }

    return new ymaps.ObjectManager(this.options);
  }
}
