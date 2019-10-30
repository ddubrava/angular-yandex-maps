import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList } from '@angular/core';
import { YandexMapService } from '../../services/yandex-map/yandex-map.service';
import { take } from 'rxjs/operators';
import { YandexPlacemarkComponent } from '../yandex-placemark-component/yandex-placemark.component';
import { YandexMultirouteComponent } from '../yandex-multiroute-component/yandex-multiroute.component';
import { YandexGeoobjectComponent } from '../yandex-geoobject-component/yandex-geoobject.component';
import { YandexSearchComponent } from '../yandex-search-component/yandex-search.component';

@Component({
  selector: 'angular-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit {
  @ViewChild('mapContainer') public mapContainer: ElementRef;
  @ContentChildren(YandexPlacemarkComponent) placemarks: QueryList<YandexPlacemarkComponent>;
  @ContentChildren(YandexMultirouteComponent) multiroutes: QueryList<YandexMultirouteComponent>;
  @ContentChildren(YandexGeoobjectComponent) geoObjects: QueryList<YandexGeoobjectComponent>;
  @ContentChildren(YandexSearchComponent) searchControl: QueryList<YandexSearchComponent>;

  @Input() public center: Array<number>;
  @Input() public zoom: number = 10;
  @Input() public mapState: any = {};
  @Input() public mapOptions: any = {};

  private _uniqueMapId: string;

  constructor(private _yandexMapService: YandexMapService) { }

  public ngOnInit(): void {
    this._logErrors();

    this._setUniqueMapIdOfMap();
    this._createMapWithObjects();
  }

  private _logErrors(): void {
    if (!this.center) {
      console.error('Map: center input is required.');
      this.center = [];
    }
  }

  private _setUniqueMapIdOfMap(): void {
    this._uniqueMapId = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    this.mapContainer.nativeElement.setAttribute('id', this._uniqueMapId);
  }

  private _createMapWithObjects(): void {
    this._yandexMapService.initMap()
      .pipe(take(1))
      .subscribe(() => {
        this._combineInputs();

        this._yandexMapService.createMap(this._uniqueMapId, this.mapState, this.mapOptions);
        this._addObjectsOnMap();
      });
  }

  /**
   * Combine separated inputs in objects required for API
   */
  private _combineInputs(): void {
    // Map
    this.mapState.zoom = this.zoom;
    this.mapState.center = this.center;

    // Multiroute
    this.multiroutes.forEach((multiroute) => {
      if (!multiroute.multirouteModel) multiroute.multirouteModel = {};
      multiroute.multirouteModel.referencePoints = multiroute.referencePoints;
    });
  }

  private _addObjectsOnMap(): void {
    this.placemarks.forEach((placemark) => {
      this._addPlacemark(placemark);
    });

    this.multiroutes.forEach((multiroute) => {
      this._addMultiroute(multiroute);
    });

    this.geoObjects.forEach((geoObject) => {
      this._addGeoObject(geoObject);
    });

    if (this.searchControl.first) this._addSearchControl(this.searchControl.first);
  }

  /**
   * Add objects, controls on map
   */
  private _addPlacemark(placemark: YandexPlacemarkComponent): void {
    this._yandexMapService.addPlacemark(placemark.geometry, placemark.placemarkProperties, placemark.placemarkOptions);
  }

  private _addMultiroute(multiroute: YandexMultirouteComponent): void {
    this._yandexMapService.addMultiroute(multiroute.multirouteModel, multiroute.multirouteOptions);
  }

  private _addGeoObject(geoObject: YandexGeoobjectComponent): void {
    this._yandexMapService.addGeoObject(geoObject.feature, geoObject.options);
  }

  private _addSearchControl(search: YandexSearchComponent): void {
    this._yandexMapService.addSearchControl(search.searchRequest, search.parameters);
  }
}
