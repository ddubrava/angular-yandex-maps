import { generateRandomId } from '../../utils/generateRandomId';
import { IEvent, ILoadEvent } from '../../models/models';
import { ScriptService } from '../../services/script/script.service';
import { startWith, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { YaClustererComponent } from '../ya-clusterer/ya-clusterer.component';
import { YaControlComponent } from '../ya-control/ya-control.component';
import { YaGeoObjectComponent } from '../ya-geoobject/ya-geoobject.component';
import { YaMultirouteComponent } from '../ya-multiroute/ya-multiroute.component';
import { YaPlacemarkComponent } from '../ya-placemark/ya-placemark.component';
import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

/**
 * Component for creating and managing a map
 * @example <ya-map [center]="[55.751952, 37.600739]" [state]="{type: 'yandex#satellite'}"></ya-map>
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/components/map}
 */
@Component({
  selector: 'ya-map',
  templateUrl: './ya-map.component.html',
  styleUrls: ['./ya-map.component.scss']
})
export class YaMapComponent implements OnInit, OnChanges, OnDestroy {
  // Map container
  @ViewChild('container') public mapContainer: ElementRef;

  // Components inside <ya-map>
  @ContentChildren(YaPlacemarkComponent) public placemarks: QueryList<YaPlacemarkComponent>;
  @ContentChildren(YaMultirouteComponent) public multiroutes: QueryList<YaMultirouteComponent>;
  @ContentChildren(YaGeoObjectComponent) public geoObjects: QueryList<YaGeoObjectComponent>;
  @ContentChildren(YaControlComponent) public controls: QueryList<YaControlComponent>;
  @ContentChildren(YaClustererComponent) public clusterers: QueryList<YaClustererComponent>;

  /**
   * @deprecated Use ScriptService
   * @description Map will not be created, only returns ILoadEvent
   */
  @Input() public onlyInstance: boolean;
  /**
   * Map center geocoordinates
   */
  @Input() public center: Array<number>;
  /**
   * Map zoom level
   */
  @Input() public zoom = 10;
  /**
   * States for the map
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Map__param-state}
   */
  @Input() public state: any = {};
  /**
   * Options for the map
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Map__param-options}
   */
  @Input() public options: any = {};

  /**
   * Emits immediately after this entity is added in root container
   */
  @Output() public load = new EventEmitter<ILoadEvent>();
  /**
   * Smooth map movement
   */
  @Output() public action = new EventEmitter<IEvent>();
  /**
   * Actions with ballon
   */
  @Output() public baloon = new EventEmitter<IEvent>();
  /**
   * Clicks on the object
   */
  @Output() public yaclick = new EventEmitter<IEvent>();
  /**
   * Action with hint
   */
  @Output() public hint = new EventEmitter<IEvent>();
  /**
   * Mouse actions over the object
   */
  @Output() public mouse = new EventEmitter<IEvent>();
  /**
   * Multitouch actions over the object
   */
  @Output() public multitouch = new EventEmitter<IEvent>();

  private _sub: Subscription;
  private _map: any;

  constructor(private _scriptService: ScriptService) { }

  public ngOnInit(): void {
    this._sub = new Subscription();

    this._logErrors();

    this._scriptService.initScript()
      .pipe(take(1))
      .subscribe((ymaps: any) => {
        if (this.onlyInstance) {
          this.load.emit({ ymaps });
          return;
        }

        // Map
        const map = this._createMap(ymaps, generateRandomId());
        this._map = map;

        // Events
        this._addEventListeners(ymaps, map);

        // Objects
        this._initObjects(ymaps, map);
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._configMap(changes);
  }

  /**
   * Method for dynamic entity configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _configMap(changes: SimpleChanges): void {
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
   * Destructs state and provides new values to API
   * @param state https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Map-docpage/#Map__param-state
   * @param map
   */
  private _setState(state: any, map: any): void {
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
      controls.forEach((c: string) => {
        map.controls.add(c);
      });
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

  private _createMap(ymaps: any, id: string): any {
    const containerElem: HTMLElement = this.mapContainer.nativeElement;
    containerElem.setAttribute('id', id);
    containerElem.style.cssText = 'width: 100%; height: 100%;';

    return new ymaps.Map(
      id, { ...this.state, zoom: this.zoom, center: this.center }, this.options
    );
  }

  /**
   * Provides ContentChildren components to API.
   * Subscribes on ContentChildren changes to provide them to API.
   * @param ymaps
   * @param map
   */
  private _initObjects(ymaps: any, map: any): void {
    // Placemarks (async)
    const placemarksSub = this.placemarks.changes
      .pipe(startWith(this.placemarks))
      .subscribe((list: QueryList<YaPlacemarkComponent>) => {
        list.forEach((placemark: YaPlacemarkComponent) => {
          if (!placemark.id) {
            placemark.initPlacemark(ymaps, map);
          }
        });
      });

    this._sub.add(placemarksSub);

    // Multiroutes (async)
    const multiroutesSub = this.multiroutes.changes
      .pipe(startWith(this.multiroutes))
      .subscribe((list: QueryList<YaMultirouteComponent>) => {
        list.forEach((multiroute: YaMultirouteComponent) => {
          if (!multiroute.id) {
            multiroute.initMultiroute(ymaps, map);
          }
        });
      });

    this._sub.add(multiroutesSub);

    // GeoObjects (async)
    const geoObjectsSub = this.geoObjects.changes
      .pipe(startWith(this.geoObjects))
      .subscribe((list: QueryList<YaGeoObjectComponent>) => {
        list.forEach((geoObject: YaGeoObjectComponent) => {
          if (!geoObject.id) {
            geoObject.initGeoObject(ymaps, map);
          }
        });
      });

    this._sub.add(geoObjectsSub);

    // Controls (not async)
    this.controls.forEach((control: YaControlComponent) => {
      control.initControl(ymaps, map);
    });

    // Clusterers (not async)
    this.clusterers.forEach((clusterer: YaClustererComponent) => {
      clusterer.initClusterer(ymaps, map);
    });
  }

  /**
   * Add listeners on map events
   * @param ymaps
   * @param map
   */
  private _addEventListeners(ymaps: any, map: any): void {
    this.load.emit({ ymaps, instance: map });

    // Action
    map.events
      .add(
        ['actionbegin', 'actionend'],
        (e: any) => this.action.emit({ ymaps, instance: map, type: e.originalEvent.type, event: e })
      );

    // Baloon
    map.events
      .add(
        ['balloonopen', 'balloonclose'],
        (e: any) => this.baloon.emit({ ymaps, instance: map, type: e.originalEvent.type, event: e })
      );

    // Click
    map.events
      .add(
        ['click', 'dblclick'],
        (e: any) => this.yaclick.emit({ ymaps, instance: map, type: e.originalEvent.type, event: e })
      );

    // Hint
    map.events
      .add(
        ['hintopen', 'hintclose'],
        (e: any) => this.hint.emit({ ymaps, instance: map, type: e.originalEvent.type, event: e })
      );

    // Mouse
    map.events
      .add(
        ['mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseup'],
        (e: any) => this.mouse.emit({ ymaps, instance: map, type: e.originalEvent.type, event: e })
      );

    // Multitouch
    map.events
      .add(
        ['multitouchstart', 'multitouchmove', 'multitouchend'],
        (e: any) => this.multitouch.emit({ ymaps, instance: map, type: e.originalEvent.type, event: e })
      );
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
