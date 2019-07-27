import { Component, OnInit, Input } from '@angular/core';
import { YandexMapService } from '../../services/yandex-map/yandex-map.service';
import { take } from 'rxjs/operators';
import { YandexMapModule } from '../../services/yandex-map/yandex-map.type';

@Component({
  selector: 'angular-yandex-map',
  templateUrl: './yandex-map.component.html',
  styleUrls: ['./yandex-map.component.scss']
})
export class YandexMapComponent implements OnInit {
  @Input() public mapState: YandexMapModule.IYandexMapState;
  @Input() public mapOptions: YandexMapModule.IYandexMapOptions;

  constructor(private _yandexMapService: YandexMapService) { }

  public ngOnInit(): void {
    this._yandexMapService.initMap('map', this.mapState, this.mapOptions)
      .pipe(take(1))
      .subscribe();
  }
}
