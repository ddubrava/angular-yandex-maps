import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList } from '@angular/core';

import { YandexPlacemarkComponent } from '../yandex-placemark-component/yandex-placemark.component';
import { YandexMultirouteComponent } from '../yandex-multiroute-component/yandex-multiroute.component';
import { YandexGeoObjectComponent } from '../yandex-geoobject-component/yandex-geoobject.component';
import { YandexSearchComponent } from '../yandex-search-component/yandex-search.component';

import { YandexMapService } from '../../services/yandex-map/yandex-map.service';

import { take } from 'rxjs/operators';
import { generateRandomId } from '../../utils/utils';

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
  @ContentChildren(YandexSearchComponent) searchControls: QueryList<YandexSearchComponent>;

  /**
   * Map inputs
   */
  @Input() public center: Array<number>;
  @Input() public zoom: number = 10;
  @Input() public state: any = {};
  @Input() public options: any = {};
  @Input() public clusterer: any;

  constructor(private _yandexMapService: YandexMapService) { }

  public ngOnInit(): void {
    this._logErrors();

    // Init script, on sub create map & add objects on map
    this._yandexMapService.initScript()
      .pipe(take(1))
      .subscribe((ymaps: any) => {
        const map = this._createMap(ymaps, generateRandomId());
        this._addObjectsOnMap(ymaps, map);
      });
  }

  private _logErrors(): void {
    if (!this.center) {
      console.error('Map: center input is required.');
      this.center = [];
    }
  }

  private _getRandomId(): string {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`;
  }

  /**
   * Create map with unique ID
   * @param ymaps - class from Yandex.Map API
   * @param mapId - unique mapId
   */
  private _createMap(ymaps: any, mapId: string): any {
    this.mapContainer.nativeElement.setAttribute('id', mapId);

    return new ymaps.Map(
      mapId, { ...this.state, zoom: this.zoom, center: this.center }, this.options
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

    // SearchControls
    this.searchControls.forEach((searchControl) => {
      searchControl.initSearchControl(ymaps, map);
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
