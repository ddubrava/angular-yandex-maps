import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList } from '@angular/core';
import { YandexMapService } from '../../services/yandex-map/yandex-map.service';
import { take } from 'rxjs/operators';
import { YandexMapModule } from '../../types/yandex-map.type';
import { YandexPlacemarkComponent } from '../yandex-placemark-component/yandex-placemark.component';
import { YandexMultirouteComponent } from '../yandex-multiroute-component/yandex-multiroute.component';

@Component({
  selector: 'angular-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) public mapContainer: ElementRef;
  @ContentChildren(YandexPlacemarkComponent) placemarks: QueryList<YandexPlacemarkComponent>;
  @ContentChildren(YandexMultirouteComponent) multiroutes: QueryList<YandexMultirouteComponent>;

  @Input() public center: Array<number>;
  @Input() public zoom: number;
  @Input() public mapState: YandexMapModule.IYandexMapState = {};
  @Input() public mapOptions: YandexMapModule.IYandexMapOptions = {};

  private _uniqueMapId: string;

  constructor(private _yandexMapService: YandexMapService) { }

  public ngOnInit(): void {
    this._setUniqueMapIdOfMap();
    this._createMapWithObjects();
  }

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

        this.placemarks.forEach((placemark) => {
          this._setPlacemarks(placemark.geometry, placemark.placemarkProperties, placemark.placemarkOptions);
        });

        this.multiroutes.forEach((multiroute) => {
          this._createMultiroute(multiroute);
        });
      });
  }

  private _setPlacemarks(geometry: any, properties?: any, options?: YandexMapModule.IPlacemarkOptions): void {
    this._yandexMapService.createPlacemark(geometry, properties, options);
  }

  private _createMultiroute(multiroute: YandexMultirouteComponent): void {
    this._yandexMapService.createMultiroute(multiroute.multirouteModel, multiroute.multirouteOptions);
  }
}
