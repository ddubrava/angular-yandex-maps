import { Component, OnInit, Input } from '@angular/core';
import { YandexMapService } from '../../services/yandex-map/yandex-map.service';
import { take } from 'rxjs/operators';
import { YandexMapModule } from '../../services/yandex-map/yandex-map.type';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ng-yandex-map',
  templateUrl: './ng-yandex-map.component.html',
  styleUrls: ['./ng-yandex-map.component.scss']
})
export class NgYandexMapComponent implements OnInit {
  @Input() public mapState: YandexMapModule.IYandexMapState;
  @Input() public mapOptions: YandexMapModule.IYandexMapOptions;

  constructor(private _yandexMapService: YandexMapService) { }

  public ngOnInit(): void {
    this._yandexMapService.initMap('map', this.mapState, this.mapOptions)
      .pipe(take(1))
      .subscribe();
  }
}
