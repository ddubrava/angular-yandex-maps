import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { YaEvent } from '../../interfaces/ya-event';
import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import { YaApiLoaderService } from '../../services/ya-api-loader/ya-api-loader.service';
import { EventManager } from '../../utils/event-manager/event-manager';
import { generateRandomId } from '../../utils/generate-random-id/generate-random-id';

/**
 * The `ya-map` component wraps `ymaps.Map` class from the Yandex.Maps API.
 * You can configure the map via the component's inputs.
 * Events can be bound using the outputs of the component.
 *
 * <example-url>https://stackblitz.com/edit/map-onload-event?embed=1&view=preview</example-url>
 *
 * ```html
 * <ya-map
 *   [center]="[55.751952, 37.600739]"
 *   [state]="{type: 'yandex#satellite'}"
 * ></ya-map>
 * ```
 */
@Component({
  selector: 'ya-map',
  template: '<div #container></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class YaMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('container') readonly container!: ElementRef;

  private readonly destroy$ = new Subject<void>();

  private readonly eventManager = new EventManager(this.ngZone);

  map$ = new BehaviorSubject<ymaps.Map | null>(null);

  /**
   * Geo coordinates of the map center. Default is `[0, 0]`.
   * Shorthand for `[state]="{ center: [0, 0] }"`.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#Map__param-state.center}
   */
  @Input() center: number[] = [0, 0];

  /**
   * Map zoom level. Default level is `10`.
   * Shorthand for `[state]="{ zoom: 10 }"`.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#Map__param-state.zoom}
   */
  @Input() zoom = 10;

  /**
   * Map parameters.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#Map__param-state}
   */
  @Input() state?: ymaps.IMapState;

  /**
   * Map options. The map options can be used to make settings for the map itself, as well as for objects that are added to it.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#Map__param-options}
   */
  @Input() options?: ymaps.IMapOptions;

  /**
   * Map instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YaReadyEvent<ymaps.Map>> = new EventEmitter<
    YaReadyEvent<ymaps.Map>
  >();

  /**
   * The start of a new smooth map movement.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-actionbegin}
   */
  @Output() actionbegin: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('actionbegin');

  /**
   * Event that occurs when an action step was prematurely stopped.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-actionbreak}
   */
  @Output() actionbreak: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('actionbreak');

  /**
   * The end of smooth map movement.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-actionend}
   */
  @Output() actionend: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('actionend');

  /**
   * The start of a new step of smooth movement.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-actiontick}
   */
  @Output() actiontick: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('actiontick');

  /**
   * The end of performing a step of smooth movement.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-actiontickcomplete}
   */
  @Output() actiontickcomplete: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('actiontickcomplete');

  /**
   * Closing the balloon.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-balloonclose}
   */
  @Output() balloonclose: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('balloonclose');

  /**
   * Opening a balloon on a map.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-balloonopen}
   */
  @Output() balloonopen: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('balloonopen');

  /**
   * Event for a change to the map viewport.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-boundschange}
   */
  @Output() boundschange: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('boundschange');

  /**
   * Single left-click on the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-click}
   */
  @Output() yaclick: Observable<YaEvent<ymaps.Map>> = this.eventManager.getLazyEmitter('click');

  /**
   * Calls the element's context menu.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-contextmenu}
   */
  @Output() yacontextmenu: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('contextmenu');

  /**
   * Double left-click on the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-dblclick}
   */
  @Output() yadblclick: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('dblclick');

  /**
   * The map was destroyed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-destroy}
   */
  @Output() destroy: Observable<YaEvent<ymaps.Map>> = this.eventManager.getLazyEmitter('destroy');

  /**
   * Closing the hint.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-hintclose}
   */
  @Output() hintclose: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('hintclose');

  /**
   * Opening a hint on a map.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-hintopen}
   */
  @Output() hintopen: Observable<YaEvent<ymaps.Map>> = this.eventManager.getLazyEmitter('hintopen');

  /**
   * Map margins changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-marginchange}
   */
  @Output() marginchange: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('marginchange');

  /**
   * Pressing the mouse button over the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mousedown}
   */
  @Output() yamousedown: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('mousedown');

  /**
   * Pointing the cursor at the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseenter}
   */
  @Output() yamouseenter: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('mouseenter');

  /**
   * Moving the cursor off of the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseleave}
   */
  @Output() yamouseleave: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('mouseleave');

  /**
   * Moving the cursor over the object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mousemove}
   */
  @Output() yamousemove: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('mousemove');

  /**
   * Letting go of the mouse button over an object.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-mouseup}
   */
  @Output() yamouseup: Observable<YaEvent<ymaps.Map>> = this.eventManager.getLazyEmitter('mouseup');

  /**
   * End of multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchend}
   */
  @Output() multitouchend: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('multitouchend');

  /**
   * Repeating event during multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchmove}
   */
  @Output() multitouchmove: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('multitouchmove');

  /**
   * Start of multitouch.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-multitouchstart}
   */
  @Output() multitouchstart: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('multitouchstart');

  /**
   * Map options changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-optionschange}
   */
  @Output() optionschange: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('optionschange');

  /**
   * Map size changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-sizechange}
   */
  @Output() sizechange: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('sizechange');

  /**
   * The map type changed.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html#event_detail__event-typechange}
   */
  @Output() typechange: Observable<YaEvent<ymaps.Map>> =
    this.eventManager.getLazyEmitter('typechange');

  /**
   * Mouse wheel scrolling.
   * {@link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/IDomEventEmitter.html#event_detail__event-wheel}
   */
  @Output() yawheel: Observable<YaEvent<ymaps.Map>> = this.eventManager.getLazyEmitter('wheel');

  constructor(
    private readonly ngZone: NgZone,
    private readonly yaApiLoaderService: YaApiLoaderService,
  ) {}

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // It must be run outside a zone; otherwise, all async events within this call will cause ticks.
    this.ngZone.runOutsideAngular(() => {
      const map = this.map$.value;

      if (map) {
        const { center, zoom, state, options } = changes;

        if (state) {
          this.setState(this.combineState(), map);
        }

        if (center) {
          map.setCenter(center.currentValue);
        }

        if (zoom) {
          map.setZoom(zoom.currentValue);
        }

        if (options) {
          map.options.set(options.currentValue);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.yaApiLoaderService
      .load()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const id = generateRandomId();
        const map = this.createMap(id);

        /**
         * Once the configuration is changed, e.g. language,
         * we need to reinitialize the map.
         */
        if (this.map$.value) {
          this.map$.value.destroy();
        }

        this.map$.next(map);
        this.eventManager.setTarget(map);
        this.ready.emit({ ymaps, target: map });
      });
  }

  ngOnDestroy(): void {
    this.eventManager.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Destructs state and passes it in API.
   * @param state
   * @param map
   */
  private setState(state: ymaps.IMapState, map: ymaps.Map): void {
    const { behaviors, bounds, center, controls, margin, type, zoom } = state;

    if (behaviors) {
      map.behaviors.enable(behaviors);
    }

    if (bounds) {
      map.setBounds(bounds);
    }

    if (center) {
      map.setCenter(center);
    }

    if (controls) {
      controls.forEach((control) => map.controls.add(control));
    }

    if (margin) {
      map.margin.setDefaultMargin(margin);
    }

    if (type) {
      map.setType(type);
    }

    if (zoom) {
      map.setZoom(zoom);
    }
  }

  /**
   * Creates a map.
   * @param id ID which will be set to the map container.
   */
  private createMap(id: string): ymaps.Map {
    const containerElem: HTMLElement = this.container.nativeElement;

    containerElem.setAttribute('id', id);
    containerElem.style.cssText = 'width: 100%; height: 100%;';

    return new ymaps.Map(id, this.combineState(), this.options || {});
  }

  /**
   * Combines the center and zoom into single object.
   */
  private combineState(): ymaps.IMapState {
    const state = this.state || {};

    return {
      ...state,
      center: this.center || state.center || [0, 0],
      zoom: this.zoom ?? state.zoom ?? 10,
    };
  }
}
