import { Component, OnInit, Input } from '@angular/core';
import { YandexMapService } from '../../services/yandex-map/yandex-map.service';
import { take } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ng-yandex-map',
  templateUrl: './ng-yandex-map.component.html',
  styleUrls: ['./ng-yandex-map.component.scss']
})
export class NgYandexMapComponent implements OnInit {
  @Input() public mapOptions: any;

  constructor(private _yandexMapService: YandexMapService) { }

  public ngOnInit(): void {
    this._yandexMapService.initMap('map', this.mapOptions)
      .pipe(take(1))
      .subscribe();
  }
}
