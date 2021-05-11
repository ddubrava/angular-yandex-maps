import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ScriptService } from '../../services/script/script.service';
import { YaReadyEvent } from '../../interfaces/event';
import { generateRandomId } from '../../utils/generateRandomId';
import { EventManager } from '../../utils/event-manager';

/**
 * Component for creating and managing a map.
 *
 * @example `<ya-map [center]="[55.751952, 37.600739]" [state]="{type: 'yandex#satellite'}"></ya-map>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/components/map}
 */
@Component({
  selector: 'ya-map',
  template: ` <div #container></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YaMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('container') public mapContainer: ElementRef;

  public map$ = new BehaviorSubject<ymaps.Map | null>(null);

  /**
   * Map center geocoordinates.
   */
  @Input() public center: number[];

  /**
   * Map zoom level.
   */
  @Input() public zoom: number;

  /**
   * States for the map.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Mapparam-state}
   */
  @Input() public state: ymaps.IMapState;

  /**
   * Options for the map.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Mapparam-options}
   */
  @Input() public options: ymaps.IMapOptions;

  /**
   * Map instance is created.
   */
  @Output() public ready = new EventEmitter<YaReadyEvent>();

  private _eventManager = new EventManager(this._ngZone);

  /**
   * The start of a new smooth map movement.
   */
  @Output() public actionbegin = this._eventManager.getLazyEmitter(
    'actionbegin',
  );

  /**
   * Event that occurs when an action step was prematurely stopped.
   */
  @Output() public actionbreak = this._eventManager.getLazyEmitter(
    'actionbreak',
  );

  /**
   * The end of smooth map movement.
   */
  @Output() public actionend = this._eventManager.getLazyEmitter('actionend');

  /**
   * The start of a new step of smooth movement.
   */
  @Output() public actiontick = this._eventManager.getLazyEmitter('actiontick');

  /**
   * The end of performing a step of smooth movement.
   */
  @Output() public actiontickcomplete = this._eventManager.getLazyEmitter(
    'actiontickcomplete',
  );

  /**
   * Closing the balloon.
   */
  @Output() public balloonclose = this._eventManager.getLazyEmitter(
    'balloonclose',
  );

  /**
   * Opening a balloon on a map.
   */
  @Output() public balloonopen = this._eventManager.getLazyEmitter(
    'balloonopen',
  );

  /**
   * Event for a change to the map viewport.
   */
  @Output() public boundschange = this._eventManager.getLazyEmitter(
    'boundschange',
  );

  /**
   * Single left-click on the object.
   */
  @Output() public yaclick = this._eventManager.getLazyEmitter('click');

  /**
   * Calls the element's context menu.
   */
  @Output() public yacontextmenu = this._eventManager.getLazyEmitter(
    'contextmenu',
  );

  /**
   * Double left-click on the object.
   */
  @Output() public yadbclick = this._eventManager.getLazyEmitter('dbclick');

  /**
   * The map was destroyed.
   */
  @Output() public destroy = this._eventManager.getLazyEmitter('destroy');

  /**
   * Closing the hint.
   */
  @Output() public hintclose = this._eventManager.getLazyEmitter('hintclose');

  /**
   * Opening a hint on a map.
   */
  @Output() public hintopen = this._eventManager.getLazyEmitter('hintopen');

  /**
   * Map margins changed.
   */
  @Output() public marginchange = this._eventManager.getLazyEmitter(
    'marginchange',
  );

  /**
   * Pressing the mouse button over the object.
   */
  @Output() public yamousedown = this._eventManager.getLazyEmitter('mousedown');

  /**
   * Pointing the cursor at the object.
   */
  @Output() public yamouseenter = this._eventManager.getLazyEmitter(
    'mouseenter',
  );

  /**
   * Moving the cursor off of the object.
   */
  @Output() public yamouseleave = this._eventManager.getLazyEmitter(
    'mouseleave',
  );

  /**
   * Moving the cursor over the object.
   */
  @Output() public yamousemove = this._eventManager.getLazyEmitter('mousemove');

  /**
   * Letting go of the mouse button over an object.
   */
  @Output() public yamouseup = this._eventManager.getLazyEmitter('mouseup');

  /**
   * End of multitouch.
   */
  @Output() public multitouchend = this._eventManager.getLazyEmitter(
    'multitouchend',
  );

  /**
   * Repeating event during multitouch.
   */
  @Output() public multitouchmove = this._eventManager.getLazyEmitter(
    'multitouchmove',
  );

  /**
   * Start of multitouch.
   */
  @Output() public multitouchstart = this._eventManager.getLazyEmitter(
    'multitouchstart',
  );

  /**
   * Map options changed.
   */
  @Output() public optionschange = this._eventManager.getLazyEmitter(
    'optionschange',
  );

  /**
   * Map size changed.
   */
  @Output() public sizechange = this._eventManager.getLazyEmitter('sizechange');

  /**
   * The map type changed.
   */
  @Output() public typechange = this._eventManager.getLazyEmitter('typechange');

  /**
   * Mouse wheel scrolling.
   */
  @Output() public yawheel = this._eventManager.getLazyEmitter('wheel');

  private _sub = new Subscription();

  private readonly _isBrowser: boolean;

  constructor(
    private _ngZone: NgZone,
    private _scriptService: ScriptService,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this._isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Handles input changes and passes them in API.
   * @param changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    const map = this.map$.value;

    if (map) {
      const { center, zoom, state, options } = changes;

      if (center) {
        map.setCenter(center.currentValue);
      }

      if (zoom) {
        map.setZoom(zoom.currentValue);
      }

      if (state) {
        this._setState(this._combineState(), map);
      }

      if (options) {
        map.options.set(options.currentValue);
      }
    }
  }

  public ngAfterViewInit(): void {
    // It should be a noop during server-side rendering.
    if (this._isBrowser) {
      this._loadScript();
    }
  }

  public ngOnDestroy(): void {
    this._eventManager.destroy();
    this._sub.unsubscribe();
  }

  /**
   * Destructs state and passes new values in API.
   * @param state
   * @param map
   */
  private _setState(state: ymaps.IMapState, map: ymaps.Map): void {
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

  private _loadScript(): void {
    const sub = this._scriptService.load().subscribe(() => {
      const id = generateRandomId();
      const map = this._createMap(id);

      this.map$.next(map);
      this._eventManager.setTarget(map);
      this._ngZone.run(() => this.ready.emit({ ymaps, target: map }));
    });

    this._sub.add(sub);
  }

  /**
   * Creates map.
   * @param id ID which will be set to the map container.
   */
  private _createMap(id: string): ymaps.Map {
    const containerElem: HTMLElement = this.mapContainer.nativeElement;
    containerElem.setAttribute('id', id);
    containerElem.style.cssText = 'width: 100%; height: 100%;';

    return new ymaps.Map(id, this._combineState(), this.options || {});
  }

  /**
   * Combines the center and zoom into single object
   */
  private _combineState(): ymaps.IMapState {
    const state = this.state || {};

    return {
      ...state,
      center: this.center || state.center || [],
      zoom: this.zoom ?? state.zoom ?? 10,
    };
  }
}
