import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { YandexMapService } from '../../services/yandex-map/yandex-map.service';
import { take } from 'rxjs/operators';
import { YandexMapModule } from '../../types/yandex-map.type';

@Component({
  selector: 'angular-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) public mapContainer: ElementRef;

  @Input() public mapState: YandexMapModule.IYandexMapState;
  @Input() public mapOptions: YandexMapModule.IYandexMapOptions;

  constructor(private _yandexMapService: YandexMapService) { }

  public ngOnInit(): void {
    const uniqueMapId = `f${(~~(Math.random() * 1e8)).toString(16)}`;

    this.mapContainer.nativeElement.setAttribute('id', uniqueMapId);
    this._yandexMapService.initMap()
      .pipe(take(1))
      .subscribe(() => {
        this._yandexMapService.createMap(uniqueMapId, this.mapState, this.mapOptions)
      });
  }
}
