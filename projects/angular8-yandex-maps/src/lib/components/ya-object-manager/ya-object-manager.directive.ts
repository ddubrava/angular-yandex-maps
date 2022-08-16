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
 * The `ya-object-manager` component wraps `ymaps.ObjectManager` class from the Yandex.Maps API.
 * You can configure it via the component's inputs.
 * Events can be bound using the outputs of the component.
 *
 * <example-url>https://stackblitz.com/edit/object-manager?embed=1</example-url>
 *
 * @example
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
   * Options for the ObjectManager.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/ObjectManager.html#ObjectManager__param-options}
   */
  @Input() options: ymaps.IObjectManagerOptions;

  /**
   * ObjectManager instance is added in a Map.
   */
  @Output() ready: EventEmitter<YaReadyEvent<ymaps.ObjectManager>> = new EventEmitter<
    YaReadyEvent<ymaps.ObjectManager>
  >();

  /**
   * Single left-click on the object.
   */
  @Output() yaclick: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('click');

  /**
   * Calls the element's context menu.
   */
  @Output() yacontextmenu: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('contextmenu');

  /**
   * Double left-click on the object.
   */
  @Output() yadblclick: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('dblclick');

  /**
   * Change to the geo object geometry.
   */
  @Output() geometrychange: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('geometrychange');

  /**
   * Map reference changed.
   */
  @Output() mapchange: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('mapchange');

  /**
   * Pressing the mouse button over the object.
   */
  @Output() yamousedown: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('mousedown');

  /**
   * Pointing the cursor at the object.
   */
  @Output() yamouseenter: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('mouseenter');

  /**
   * Moving the cursor off of the object.
   */
  @Output() yamouseleave: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('mouseleave');

  /**
   * Moving the cursor over the object.
   */
  @Output() yamousemove: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('mousemove');

  /**
   * Letting go of the mouse button over an object.
   */
  @Output() yamouseup: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('mouseup');

  /**
   * End of multitouch.
   */
  @Output() multitouchend: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('multitouchend');

  /**
   * Repeating event during multitouch.
   */
  @Output() multitouchmove: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('multitouchmove');

  /**
   * Start of multitouch.
   */
  @Output() multitouchstart: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('multitouchstart');

  /**
   * Change to the object options.
   */
  @Output() optionschange: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('optionschange');

  /**
   * Change to the geo object overlay.
   */
  @Output() overlaychange: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('overlaychange');

  /**
   * The parent object reference changed.
   */
  @Output() parentchange: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('parentchange');

  /**
   * Change to the geo object data.
   */
  @Output() propertieschange: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('propertieschange');

  /**
   * Mouse wheel scrolling.
   */
  @Output() yawheel: Observable<YaEvent<ymaps.ObjectManager>> =
    this.eventManager.getLazyEmitter('wheel');

  constructor(private readonly ngZone: NgZone, private readonly yaMapComponent: YaMapComponent) {}

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
    this.yaMapComponent.map$
      .pipe(filter(Boolean), take(1), takeUntil(this.destroy$))
      .subscribe((map) => {
        const objectManager = this.createObjectManager();
        this.objectManager = objectManager;

        map.geoObjects.add(objectManager);
        this.eventManager.setTarget(objectManager);
        this.ngZone.run(() => this.ready.emit({ ymaps, target: objectManager }));
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
    return new ymaps.ObjectManager(this.options);
  }
}
