import { startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Listener } from '../../interfaces/listener';
import { ScriptService } from '../../services/script/script.service';
import { YaClustererDirective } from '../../directives/ya-clusterer/ya-clusterer.directive';
import { YaControlDirective } from '../../directives/ya-control/ya-control.directive';
import { YaEvent, YaReadyEvent } from '../../interfaces/event';
import { YaGeoobjectDirective } from '../../directives/ya-geoobject/ya-geoobject.directive';
import { YaMultirouteDirective } from '../../directives/ya-multiroute/ya-multiroute.directive';
import { YaPlacemarkDirective } from '../../directives/ya-placemark/ya-placemark.directive';
import { generateRandomId } from '../../utils/generateRandomId';

/**
 * Component for creating and managing a map.
 *
 * @example `<ya-map [center]="[55.751952, 37.600739]" [state]="{type: 'yandex#satellite'}"></ya-map>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/components/map}
 */
@Component({
  selector: 'ya-map',
  templateUrl: './ya-map.component.html',
  styleUrls: ['./ya-map.component.scss'],
})
export class YaMapComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('container') public mapContainer: ElementRef;

  @ContentChildren(YaPlacemarkDirective) public placemarks: QueryList<
    YaPlacemarkDirective
  >;

  @ContentChildren(YaMultirouteDirective) public multiroutes: QueryList<
    YaMultirouteDirective
  >;

  @ContentChildren(YaGeoobjectDirective) public geoObjects: QueryList<
    YaGeoobjectDirective
  >;

  @ContentChildren(YaControlDirective) public controls: QueryList<
    YaControlDirective
  >;

  @ContentChildren(YaClustererDirective) public clusterers: QueryList<
    YaClustererDirective
  >;

  /**
   * Map center geocoordinates.
   */
  @Input() public center: number[];

  /**
   * Map zoom level.
   */
  @Input() public zoom = 10;

  /**
   * States for the map.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Mapparam-state}
   */
  @Input() public state: ymaps.IMapState = {};

  /**
   * Options for the map.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Mapparam-options}
   */
  @Input() public options: ymaps.IMapOptions = {};

  /**
   * Map instance is created.
   */
  @Output() public ready = new EventEmitter<YaReadyEvent>();

  /**
   * The start of a new smooth map movement.
   */
  @Output() public actionbegin = new EventEmitter<YaEvent>();

  /**
   * Event that occurs when an action step was prematurely stopped.
   */
  @Output() public actionbreak = new EventEmitter<YaEvent>();

  /**
   * The end of smooth map movement.
   */
  @Output() public actionend = new EventEmitter<YaEvent>();

  /**
   * The start of a new step of smooth movement.
   */
  @Output() public actiontick = new EventEmitter<YaEvent>();

  /**
   * The end of performing a step of smooth movement.
   */
  @Output() public actiontickcomplete = new EventEmitter<YaEvent>();

  /**
   * Closing the balloon.
   */
  @Output() public balloonclose = new EventEmitter<YaEvent>();

  /**
   * Opening a balloon on a map.
   */
  @Output() public balloonopen = new EventEmitter<YaEvent>();

  /**
   * Event for a change to the map viewport.
   */
  @Output() public boundschange = new EventEmitter<YaEvent>();

  /**
   * Single left-click on the object.
   */
  @Output() public yaclick = new EventEmitter<YaEvent>();

  /**
   * Calls the element's context menu.
   */
  @Output() public yacontextmenu = new EventEmitter<YaEvent>();

  /**
   * Double left-click on the object.
   */
  @Output() public yadbclick = new EventEmitter<YaEvent>();

  /**
   * The map was destroyed.
   */
  @Output() public destroy = new EventEmitter<YaEvent>();

  /**
   * Closing the hint.
   */
  @Output() public hintclose = new EventEmitter<YaEvent>();

  /**
   * Opening a hint on a map.
   */
  @Output() public hintopen = new EventEmitter<YaEvent>();

  /**
   * Map margins changed.
   */
  @Output() public marginchange = new EventEmitter<YaEvent>();

  /**
   * Pressing the mouse button over the object.
   */
  @Output() public yamousedown = new EventEmitter<YaEvent>();

  /**
   * Pointing the cursor at the object.
   */
  @Output() public yamouseenter = new EventEmitter<YaEvent>();

  /**
   * Moving the cursor off of the object.
   */
  @Output() public yamouseleave = new EventEmitter<YaEvent>();

  /**
   * Moving the cursor over the object.
   */
  @Output() public yamousemove = new EventEmitter<YaEvent>();

  /**
   * Letting go of the mouse button over an object.
   */
  @Output() public yamouseup = new EventEmitter<YaEvent>();

  /**
   * End of multitouch.
   */
  @Output() public multitouchend = new EventEmitter<YaEvent>();

  /**
   * Repeating event during multitouch.
   */
  @Output() public multitouchmove = new EventEmitter<YaEvent>();

  /**
   * Start of multitouch.
   */
  @Output() public multitouchstart = new EventEmitter<YaEvent>();

  /**
   * Map options changed.
   */
  @Output() public optionschange = new EventEmitter<YaEvent>();

  /**
   * Map size changed.
   */
  @Output() public sizechange = new EventEmitter<YaEvent>();

  /**
   * The map type changed.
   */
  @Output() public typechange = new EventEmitter<YaEvent>();

  /**
   * Mouse wheel scrolling.
   */
  @Output() public yawheel = new EventEmitter<YaEvent>();

  private _sub: Subscription;

  private _map: ymaps.Map;

  constructor(private _ngZone: NgZone, private _scriptService: ScriptService) {}

  public ngOnInit(): void {
    this._sub = new Subscription();

    this._checkRequiredInputs();
    this._initScript();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._updateMap(changes);
  }

  /**
   * Method for dynamic Map configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _updateMap(changes: SimpleChanges): void {
    const map = this._map;

    if (!map) return;

    const { center, zoom, state, options } = changes;

    if (center) {
      map.setCenter(center.currentValue);
    }

    if (zoom) {
      map.setZoom(zoom.currentValue);
    }

    if (state) {
      this._setState(state.currentValue, map);
    }

    if (options) {
      map.options.set(options.currentValue);
    }
  }

  /**
   * Destructs state and provides new values to API.
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
      /**
       * Wrong typings in DefinitelyTyped.
       */
      controls.forEach((c: any) => map.controls.add(c));
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

  private _checkRequiredInputs(): void {
    if (this.center === undefined || this.center === null) {
      throw new Error('Center is required');
    }
  }

  private _initScript(): void {
    const sub = this._scriptService.initScript().subscribe(() => {
      const id = generateRandomId();
      this._map = this._createMap(id);

      this._ngZone.run(() => this.ready.emit({ ymaps, instance: this._map }));

      this._addGeoObjects();
      this._addControls();
      this._addEventListeners();
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

    return new ymaps.Map(
      id,
      { ...this.state, zoom: this.zoom, center: this.center },
      this.options,
    );
  }

  /**
   * Adds GeoObject to the Map on ContentChildren changes.
   */
  private _addGeoObjects(): void {
    const map = this._map;

    // Placemarks (async)
    const placemarksSub = this.placemarks.changes
      .pipe(startWith(this.placemarks))
      .subscribe((list: QueryList<YaPlacemarkDirective>) => {
        list.forEach((placemark) => {
          if (!placemark.id) {
            const p = placemark.createPlacemark(map);
            map.geoObjects.add(p);
          }
        });
      });

    this._sub.add(placemarksSub);

    // Multiroutes (async)
    const multiroutesSub = this.multiroutes.changes
      .pipe(startWith(this.multiroutes))
      .subscribe((list: QueryList<YaMultirouteDirective>) => {
        list.forEach((multiroute) => {
          if (!multiroute.id) {
            const m = multiroute.createMultiroute(map);
            map.geoObjects.add(m);
          }
        });
      });

    this._sub.add(multiroutesSub);

    // GeoObjects (async)
    const geoObjectsSub = this.geoObjects.changes
      .pipe(startWith(this.geoObjects))
      .subscribe((list: QueryList<YaGeoobjectDirective>) => {
        list.forEach((geoObject) => {
          if (!geoObject.id) {
            const g = geoObject.createGeoObject(map);
            map.geoObjects.add(g);
          }
        });
      });

    this._sub.add(geoObjectsSub);

    // Clusterers (not async)
    this.clusterers.forEach((clusterer) => {
      const c = clusterer.createClusterer(map);
      /**
       * Wrong typings in DefinitelyTyped.
       */
      map.geoObjects.add(c as any);
    });
  }

  /**
   * Adds controls to the Map.
   */
  private _addControls(): void {
    this.controls.forEach((control) => {
      const c = control.createControl();
      this._map.controls.add(c);
    });
  }

  /**
   * Adds listeners on the Map events.
   */
  private _addEventListeners(): void {
    const map = this._map;

    const listeners: Listener[] = [
      {
        name: 'actionbegin',
        emitter: this.actionbegin,
      },
      {
        name: 'actionbreak',
        emitter: this.actionbreak,
      },
      { name: 'actionend', emitter: this.actionend },
      { name: 'actiontick', emitter: this.actiontick },
      {
        name: 'actiontickcomplete',
        emitter: this.actiontickcomplete,
      },
      { name: 'balloonclose', emitter: this.balloonclose },
      { name: 'balloonopen', emitter: this.balloonopen },
      { name: 'boundschange', emitter: this.boundschange },
      { name: 'click', emitter: this.yaclick },
      { name: 'contextmenu', emitter: this.yacontextmenu },
      { name: 'dbclick', emitter: this.yadbclick },
      { name: 'destroy', emitter: this.destroy },
      { name: 'hintclose', emitter: this.hintclose },
      { name: 'hintopen', emitter: this.hintopen },
      { name: 'marginchange', emitter: this.marginchange },
      { name: 'mousedown', emitter: this.yamousedown },
      {
        name: 'mouseenter',
        emitter: this.yamouseenter,
        runOutsideAngular: true,
      },
      {
        name: 'mouseleave',
        emitter: this.yamouseleave,
        runOutsideAngular: true,
      },
      { name: 'mousemove', emitter: this.yamousemove, runOutsideAngular: true },
      { name: 'mouseup', emitter: this.yamouseup, runOutsideAngular: true },
      {
        name: 'multitouchend',
        emitter: this.multitouchend,
        runOutsideAngular: true,
      },
      {
        name: 'multitouchmove',
        emitter: this.multitouchmove,
        runOutsideAngular: true,
      },
      {
        name: 'multitouchstart',
        emitter: this.multitouchstart,
        runOutsideAngular: true,
      },
      { name: 'optionschange', emitter: this.optionschange },
      { name: 'sizechange', emitter: this.sizechange },
      { name: 'typechange', emitter: this.typechange },
      { name: 'wheel', emitter: this.yawheel },
    ];

    const fn = (event: ymaps.Event): YaEvent => ({
      event,
      instance: map,
      ymaps,
    });

    listeners.forEach((listener) => {
      map.events.add(listener.name, (e: ymaps.Event) =>
        listener.runOutsideAngular
          ? this._ngZone.runOutsideAngular(() => listener.emitter.emit(fn(e)))
          : this._ngZone.run(() => listener.emitter.emit(fn(e))),
      );
    });
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
