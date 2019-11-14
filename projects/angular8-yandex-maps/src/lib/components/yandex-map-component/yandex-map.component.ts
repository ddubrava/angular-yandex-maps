import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList } from '@angular/core';

import { YandexPlacemarkComponent } from '../yandex-placemark-component/yandex-placemark.component';
import { YandexMultirouteComponent } from '../yandex-multiroute-component/yandex-multiroute.component';
import { YandexGeoObjectComponent } from '../yandex-geoobject-component/yandex-geoobject.component';
import { YandexSearchComponent } from '../yandex-search-component/yandex-search.component';

import { YandexMapService } from '../../services/yandex-map/yandex-map.service';

import { take } from 'rxjs/operators';

@Component({
  selector: 'angular-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit {
  /**
   * Get MapContainer & components inside MapContainer
   */
  @ViewChild('mapContainer') public mapContainer: ElementRef;
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

  private _uniqueMapId: string;

  constructor(private _yandexMapService: YandexMapService) { }

  public ngOnInit(): void {
    this._logMapErrors();
    this._setUniqueMapId();

    this._yandexMapService.initScript()
      .pipe(take(1))
      .subscribe((ymaps: any) => this._createMapWithObjects(ymaps));
  }

  private _logMapErrors(): void {
    if (!this.center) {
      console.error('Map: center input is required.');
      this.center = [];
    }
  }

  private _setUniqueMapId(): void {
    this._uniqueMapId = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    this.mapContainer.nativeElement.setAttribute('id', this._uniqueMapId);
  }

  private _createMapWithObjects(ymaps: any): void {
    const map = new ymaps.Map(
      this._uniqueMapId, { ...this.state, zoom: this.zoom, center: this.center }, this.options
    );

    this._addObjectsOnMap(ymaps, map);
  }

  private _addObjectsOnMap(ymaps: any, map: any): void {
    this.placemarks.forEach((placemark) => {
      placemark.initPlacemark(ymaps, map);
    });

    this.multiroutes.forEach((multiroute) => {
      multiroute.initMultiroute(ymaps, map);
    });

    this.geoObjects.forEach((geoObject) => {
      geoObject.initGeoObject(ymaps, map);
    });

    this.searchControls.forEach((searchControl) => {
      searchControl.initSearchControl(ymaps, map);
    });
  }
}
