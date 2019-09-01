import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren, QueryList } from '@angular/core';
import { YandexMapService } from '../../services/yandex-map/yandex-map.service';
import { take } from 'rxjs/operators';
import { YandexMapModule } from '../../types/yandex-map.type';
import { YandexPlacemarkComponent } from '../yandex-placemark-component/yandex-placemark.component';

@Component({
  selector: 'angular-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) public mapContainer: ElementRef;
  @ContentChildren(YandexPlacemarkComponent) placemarks: QueryList<YandexPlacemarkComponent>;

  @Input() public center: Array<number>;
  @Input() public zoom: number;
  @Input() public mapState: YandexMapModule.IYandexMapState = {};
  @Input() public mapOptions: YandexMapModule.IYandexMapOptions = {};

  constructor(private _yandexMapService: YandexMapService) { }

  public ngOnInit(): void {
    const uniqueMapId = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    this.mapState.zoom = this.zoom;
    this.mapState.center = this.center;

    this.mapContainer.nativeElement.setAttribute('id', uniqueMapId);
    this._yandexMapService.initMap()
      .pipe(take(1))
      .subscribe(() => {
        this._yandexMapService.createMap(uniqueMapId, this.mapState, this.mapOptions);

        this.placemarks.forEach((placemark) => {
          this._setPlacemarks(placemark.geometry);
        });
      });
  }

  private _setPlacemarks(geometry: Array<number>): void {
    this._yandexMapService.createPlacemark(geometry);
  }
}
