import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';

import { YandexPlacemarkComponent } from '../yandex-placemark-component/yandex-placemark.component';
import { YandexMultirouteComponent } from '../yandex-multiroute-component/yandex-multiroute.component';
import { YandexGeoObjectComponent } from '../yandex-geoobject-component/yandex-geoobject.component';

import { YandexMapService } from '../../services/yandex-map/yandex-map.service';

import { take } from 'rxjs/operators';
import { generateRandomId } from '../../utils/utils';
import { YandexControlComponent } from '../yandex-control-component/yandex-control.component';

@Component({
  selector: 'angular-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit {
  /**
   * Get MapContainer & components inside MapContainer
   */
  @ViewChild('container') public mapContainer: ElementRef;
  @ContentChildren(YandexPlacemarkComponent) placemarks: QueryList<YandexPlacemarkComponent>;
  @ContentChildren(YandexMultirouteComponent) multiroutes: QueryList<YandexMultirouteComponent>;
  @ContentChildren(YandexGeoObjectComponent) geoObjects: QueryList<YandexGeoObjectComponent>;
  @ContentChildren(YandexControlComponent) controls: QueryList<YandexControlComponent>;

  /**
   * Map inputs
   */
  @Input() public center: Array<number>;
  @Input() public zoom: number = 10;
  @Input() public state: any = {};
  @Input() public options: any = {};
  @Input() public clusterer: any;

  /**
   * Map outpus
   */
  @Output() public onInit = new EventEmitter<any>();

  constructor(private _yandexMapService: YandexMapService) { }

  public ngOnInit(): void {
    this._logErrors();

    // Init script, on sub create map & add objects on map
    this._yandexMapService.initScript()
      .pipe(take(1))
      .subscribe((ymaps: any) => {
        const map = this._createMap(ymaps, generateRandomId());

        this.onInit.emit(map);
        this._addObjectsOnMap(ymaps, map);
      });
  }

  private _logErrors(): void {
    if (!this.center) {
      console.error('Map: center input is required.');
      this.center = [];
    }
  }

  /**
   * Create map
   * @param ymaps - class from Yandex.Map API
   * @param id - unique id
   */
  private _createMap(ymaps: any, id: string): any {
    this.mapContainer.nativeElement.setAttribute('id', id);

    return new ymaps.Map(
      id, { ...this.state, zoom: this.zoom, center: this.center }, this.options
    );
  }

  /**
   * Add ymaps entities/objects on map
   */
  private _addObjectsOnMap(ymaps: any, map: any): void {
    // Placemarks with clusterer
    const placemarks = [];

    this.placemarks.forEach((placemark) => {
      placemarks.push(placemark.initPlacemark(ymaps, map));
    });

    if (this.clusterer) this._createClusterer(ymaps, map, placemarks);

    // Multiroutes
    this.multiroutes.forEach((multiroute) => {
      multiroute.initMultiroute(ymaps, map);
    });

    // GeoObjects
    this.geoObjects.forEach((geoObject) => {
      geoObject.initGeoObject(ymaps, map);
    });

    // Controls
    this.controls.forEach((control) => {
      control.initControl(ymaps, map);
    });
  }

  /**
   * Create clusterer for the provided GeoObjects
   * @param geoObjects - Yandex.Map GeoObject class, can be Placemark, Polylin, Polygon, Circle etc.
   */
  private _createClusterer(ymaps: any, map: any, geoObjects: Array<any>) {
    const clusterer = new ymaps.Clusterer(this.clusterer);

    clusterer.add(geoObjects);
    map.geoObjects.add(clusterer);
  }
}
