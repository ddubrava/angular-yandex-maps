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
import { generateRandomId } from '../../utils/generateRandomId';
import { IEvent, ILoadEvent } from '../../models/models';
import { ScriptService } from '../../services/script/script.service';
import { YaPlacemarkDirective } from '../../directives/ya-placemark/ya-placemark.directive';
import { YaMultirouteDirective } from '../../directives/ya-multiroute/ya-multiroute.directive';
import { YaGeoobjectDirective } from '../../directives/ya-geoobject/ya-geoobject.directive';
import { YaControlDirective } from '../../directives/ya-control/ya-control.directive';
import { YaClustererDirective } from '../../directives/ya-clusterer/ya-clusterer.directive';

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
   * @deprecated Use `ScriptService`.
   * @description Map will not be created, only returns ILoadEvent.
   */
  @Input() public onlyInstance: boolean;

  /**
   * Map center geocoordinates.
   */
  @Input() public center: Array<number>;

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
   * Emits immediately after this entity is added in root container.
   */
  @Output() public load = new EventEmitter<ILoadEvent>();

  /**
   * Smooth map movement.
   */
  @Output() public action = new EventEmitter<IEvent>();

  /**
   * Actions with the balloon.
   */
  @Output() public balloon = new EventEmitter<IEvent>();

  /**
   * Left-click on the object.
   */
  @Output() public yaclick = new EventEmitter<IEvent>();

  /**
   * Actions with the hint.
   */
  @Output() public hint = new EventEmitter<IEvent>();

  /**
   * Mouse actions with the object.
   */
  @Output() public mouse = new EventEmitter<IEvent>();

  /**
   * Multitouch actions with the object.
   */
  @Output() public multitouch = new EventEmitter<IEvent>();

  private _sub: Subscription;

  private _map: ymaps.Map;

  constructor(private _ngZone: NgZone, private _scriptService: ScriptService) {}

  public ngOnInit(): void {
    this._sub = new Subscription();

    this._logErrors();
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

  private _logErrors(): void {
    if (!this.center && !this.onlyInstance) {
      console.error('Map: center input is required.');
      this.center = [];
    }
  }

  private _initScript(): void {
    const sub = this._scriptService.initScript().subscribe(() => {
      if (this.onlyInstance) {
        this.load.emit({ ymaps });
        return;
      }

      const id = generateRandomId();
      this._map = this._createMap(id);

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

    this._ngZone.run(() => this.load.emit({ ymaps, instance: map }));

    const handlers = [
      {
        name: ['actionbegin', 'actionend'],
        fn: (e: any) =>
          this.action.emit({
            ymaps,
            instance: map,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['balloonopen', 'balloonclose'],
        fn: (e: any) =>
          this.balloon.emit({
            ymaps,
            instance: map,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['click', 'dblclick'],
        fn: (e: any) =>
          this.yaclick.emit({
            ymaps,
            instance: map,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['hintopen', 'hintclose'],
        fn: (e: any) =>
          this.hint.emit({
            ymaps,
            instance: map,
            type: e.originalEvent.type,
            event: e,
          }),
      },
      {
        name: ['mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseup'],
        fn: (e: any) =>
          this.mouse.emit({
            ymaps,
            instance: map,
            type: e.originalEvent.type,
            event: e,
          }),
        runOutsideAngular: true,
      },
      {
        name: ['multitouchstart', 'multitouchmove', 'multitouchend'],
        fn: (e: any) =>
          this.multitouch.emit({
            ymaps,
            instance: map,
            type: e.originalEvent.type,
            event: e,
          }),
        runOutsideAngular: true,
      },
    ];

    /**
     * Mouse and multitouch events should be run outside angular for better perfomance.
     * @see {@link https://github.com/ddubrava/angular8-yandex-maps/issues/35}
     */
    handlers.forEach((handler) => {
      map.events.add(handler.name, (e: any) =>
        handler.runOutsideAngular
          ? this._ngZone.runOutsideAngular(() => handler.fn(e))
          : this._ngZone.run(() => handler.fn(e)),
      );
    });
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
