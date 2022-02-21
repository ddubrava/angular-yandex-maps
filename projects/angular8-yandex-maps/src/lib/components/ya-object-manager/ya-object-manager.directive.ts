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
import { YaEvent } from '../../typings/ya-event';
import { YaMapComponent } from '../ya-map/ya-map.component';
import { YaReadyEvent } from '../../typings/ya-ready-event';

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
  private readonly _sub = new Subscription();

  private readonly _eventManager = new EventManager(this._ngZone);

  private _objectManager?: ymaps.ObjectManager;

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
    this._eventManager.getLazyEmitter('click');

  /**
   * Calls the element's context menu.
   */
  @Output() yacontextmenu: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('contextmenu');

  /**
   * Double left-click on the object.
   */
  @Output() yadblclick: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('dblclick');

  /**
   * Change to the geo object geometry.
   */
  @Output() geometrychange: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('geometrychange');

  /**
   * Map reference changed.
   */
  @Output() mapchange: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('mapchange');

  /**
   * Pressing the mouse button over the object.
   */
  @Output() yamousedown: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('mousedown');

  /**
   * Pointing the cursor at the object.
   */
  @Output() yamouseenter: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('mouseenter');

  /**
   * Moving the cursor off of the object.
   */
  @Output() yamouseleave: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('mouseleave');

  /**
   * Moving the cursor over the object.
   */
  @Output() yamousemove: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('mousemove');

  /**
   * Letting go of the mouse button over an object.
   */
  @Output() yamouseup: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('mouseup');

  /**
   * End of multitouch.
   */
  @Output() multitouchend: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('multitouchend');

  /**
   * Repeating event during multitouch.
   */
  @Output() multitouchmove: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('multitouchmove');

  /**
   * Start of multitouch.
   */
  @Output() multitouchstart: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('multitouchstart');

  /**
   * Change to the object options.
   */
  @Output() optionschange: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('optionschange');

  /**
   * Change to the geo object overlay.
   */
  @Output() overlaychange: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('overlaychange');

  /**
   * The parent object reference changed.
   */
  @Output() parentchange: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('parentchange');

  /**
   * Change to the geo object data.
   */
  @Output() propertieschange: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('propertieschange');

  /**
   * Mouse wheel scrolling.
   */
  @Output() yawheel: Observable<YaEvent<ymaps.ObjectManager>> =
    this._eventManager.getLazyEmitter('wheel');

  constructor(private readonly _ngZone: NgZone, private readonly _yaMapComponent: YaMapComponent) {}

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const objectManager = this._objectManager;

    if (objectManager) {
      const { options } = changes;

      if (options) {
        objectManager.options.set(options.currentValue);
      }
    }
  }

  ngOnInit(): void {
    // It should be a noop during server-side rendering.
    if (this._yaMapComponent.isBrowser) {
      const sub = this._yaMapComponent.map$.subscribe((map) => {
        if (map) {
          const objectManager = this._createObjectManager();
          this._objectManager = objectManager;

          map.geoObjects.add(objectManager);
          this._eventManager.setTarget(objectManager);
          this._ngZone.run(() => this.ready.emit({ ymaps, target: objectManager }));
        }
      });

      this._sub.add(sub);
    }
  }

  ngOnDestroy(): void {
    if (this._objectManager) {
      this._yaMapComponent?.map$.value?.geoObjects.remove(this._objectManager);
      this._eventManager.destroy();
    }

    this._sub.unsubscribe();
  }

  /**
   * Creates ObjectManager.
   */
  private _createObjectManager(): ymaps.ObjectManager {
    return new ymaps.ObjectManager(this.options);
  }
}
