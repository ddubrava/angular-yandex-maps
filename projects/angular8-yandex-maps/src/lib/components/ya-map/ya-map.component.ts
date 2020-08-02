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
import { IEvent, ILoadEvent } from '../../models/models';
import { startWith, take } from 'rxjs/operators';

import { ScriptService } from '../../services/script/script.service';
import { Subscription } from 'rxjs';
import { YaClustererComponent } from '../ya-clusterer/ya-clusterer.component';
import { YaControlComponent } from '../ya-control/ya-control.component';
import { YaGeoObjectComponent } from '../ya-geoobject/ya-geoobject.component';
import { YaMultirouteComponent } from '../ya-multiroute/ya-multiroute.component';
import { YaPlacemarkComponent } from '../ya-placemark/ya-placemark.component';
import { generateRandomId } from '../../utils/generateRandomId';

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

  // Inputs
  @Input() public onlyInstance: boolean;
  @Input() public center: Array<number>;
  @Input() public zoom = 10;
  @Input() public state: any = {};
  @Input() public options: any = {};

  // Outputs
  @Output() public load = new EventEmitter<ILoadEvent>();
  @Output() public action = new EventEmitter<IEvent>();
  @Output() public baloon = new EventEmitter<IEvent>();
  @Output() public yaclick = new EventEmitter<IEvent>();
  @Output() public hint = new EventEmitter<IEvent>();
  @Output() public mouse = new EventEmitter<IEvent>();
  @Output() public multitouch = new EventEmitter<IEvent>();

  private _sub: Subscription;
  private _map: any;

  constructor(private _scriptService: ScriptService) { }

  public ngOnInit(): void {
    this._sub = new Subscription();

    this._scriptService.initScript()
      .pipe(take(1))
      .subscribe((ymaps: any) => {
        if (this.onlyInstance) {
          this.load.emit({ ymaps });
          return;
        }

        this._logErrors();

        // Map
        const map = this._createMap(ymaps, generateRandomId());
        this._map = map;

        // Events
        this._emitEvents(ymaps, map);

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
   * Destructuring state and provides new values to API
   * @param state - https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Map-docpage/#Map__param-state
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
    if (!this.center) {
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
   * Add new objects on ContentChildren changes
   * @param ymaps
   * @param map
   */
  private _initObjects(ymaps: any, map: any): void {
    // Placemarks
    const placemarksSub = this.placemarks.changes
      .pipe(startWith(this.placemarks))
      .subscribe((list: QueryList<YaPlacemarkComponent>) => {
        list.forEach((placemark: YaPlacemarkComponent) => {
          if (!placemark.id) {
            placemark.initPlacemark(ymaps, map);
          }
        });
      });

    // Multiroutes
    const multiroutesSub = this.multiroutes.changes
      .pipe(startWith(this.multiroutes))
      .subscribe((list: QueryList<YaMultirouteComponent>) => {
        list.forEach((multiroute: YaMultirouteComponent) => {
          if (!multiroute.id) {
            multiroute.initMultiroute(ymaps, map);
          }
        });
      });

    // GeoObjects
    const geoObjectsSub = this.geoObjects.changes
      .pipe(startWith(this.geoObjects))
      .subscribe((list: QueryList<YaGeoObjectComponent>) => {
        list.forEach((geoObject: YaGeoObjectComponent) => {
          if (!geoObject.id) {
            geoObject.initGeoObject(ymaps, map);
          }
        });
      });

    // Controls
    this.controls.forEach((control: YaControlComponent) => {
      control.initControl(ymaps, map);
    });

    // Clusterers
    this.clusterers.forEach((clusterer: YaClustererComponent) => {
      clusterer.initClusterer(ymaps, map);
    });

    this._sub.add(placemarksSub);
    this._sub.add(multiroutesSub);
    this._sub.add(geoObjectsSub);
  }

  /**
   * Add listeners on map events
   * @param ymaps
   * @param map
   */
  private _emitEvents(ymaps: any, map: any): void {
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
