import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { IEvent, ILoadEvent } from '../../types/types';
import { Subscription } from 'rxjs';
import { YandexControlComponent } from '../yandex-control-component/yandex-control.component';
import { YandexGeoObjectComponent } from '../yandex-geoobject-component/yandex-geoobject.component';
import { YandexMapService } from '../../services/yandex-map/yandex-map.service';
import { YandexMultirouteComponent } from '../yandex-multiroute-component/yandex-multiroute.component';
import { YandexPlacemarkComponent } from '../yandex-placemark-component/yandex-placemark.component';
import { generateRandomId } from '../../utils/utils';
import { take, startWith } from 'rxjs/operators';

@Component({
  selector: 'angular-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit, OnDestroy {
  // Map container
  @ViewChild('container') public mapContainer: ElementRef;

  // Components inside <angular-yandex-map>
  @ContentChildren(YandexPlacemarkComponent) public placemarks: QueryList<YandexPlacemarkComponent>;
  @ContentChildren(YandexMultirouteComponent) public multiroutes: QueryList<YandexMultirouteComponent>;
  @ContentChildren(YandexGeoObjectComponent) public geoObjects: QueryList<YandexGeoObjectComponent>;
  @ContentChildren(YandexControlComponent) public controls: QueryList<YandexControlComponent>;

  // Inputs
  @Input() public onlyInstance: boolean;
  @Input() public center: Array<number>;
  @Input() public zoom = 10;
  @Input() public state: any = {};
  @Input() public options: any = {};
  @Input() public clusterer: any;

  // Outputs
  @Output() public load = new EventEmitter<ILoadEvent>();
  @Output() public action = new EventEmitter<IEvent>();
  @Output() public baloon = new EventEmitter<IEvent>();
  @Output() public yaclick = new EventEmitter<IEvent>();
  @Output() public hint = new EventEmitter<IEvent>();
  @Output() public mouse = new EventEmitter<IEvent>();
  @Output() public multitouch = new EventEmitter<IEvent>();

  private _sub: Subscription;

  constructor(private _yandexMapService: YandexMapService) { }

  public ngOnInit(): void {
    this._sub = new Subscription();

    this._yandexMapService.initScript()
      .pipe(take(1))
      .subscribe((ymaps: any) => {
        if (this.onlyInstance) {
          this.load.emit({ ymaps });
          return;
        }

        this._logErrors();

        // Map
        const map = this._createMap(ymaps, generateRandomId());

        // Events
        this._emitEvents(ymaps, map);

        // Objects
        this._initObjects(ymaps, map);
      });
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
      .subscribe((list: QueryList<YandexPlacemarkComponent>) => {
        const placemarks = []; // for clusterer

        list.forEach((placemark: YandexPlacemarkComponent) => {
          if (!placemark.id) {
            placemarks.push(placemark.initPlacemark(ymaps, map));
          }
        });

        if (this.clusterer) {
          this._createClusterer(ymaps, map, placemarks);
        }
      });

    // Multiroutes
    const multiroutesSub = this.multiroutes.changes
      .pipe(startWith(this.multiroutes))
      .subscribe((list: QueryList<YandexMultirouteComponent>) => {
        list.forEach((multiroute: YandexMultirouteComponent) => {
          if (!multiroute.id) {
            multiroute.initMultiroute(ymaps, map);
          }
        });
      });

    // GeoObjects
    const geoObjectsSub = this.geoObjects.changes
      .pipe(startWith(this.geoObjects))
      .subscribe((list: QueryList<YandexGeoObjectComponent>) => {
        list.forEach((geoObject: YandexGeoObjectComponent) => {
          if (!geoObject.id) {
            geoObject.initGeoObject(ymaps, map);
          }
        });
      });

    // Controls
    this.controls.forEach((control: YandexControlComponent) => {
      control.initControl(ymaps, map);
    });

    this._sub
      .add(placemarksSub)
      .add(multiroutesSub)
      .add(geoObjectsSub);
  }

  /**
   * Create clusterer for the provided GeoObjects
   * @param geoObjects - Yandex.Map GeoObject class, can be Placemark, Polylin, Polygon, Circle etc.
   */
  private _createClusterer(ymaps: any, map: any, geoObjects: Array<any>): void {
    const clusterer = new ymaps.Clusterer(this.clusterer);

    clusterer.add(geoObjects);
    map.geoObjects.add(clusterer);
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
