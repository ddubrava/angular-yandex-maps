import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'angular-yandex-geoobject',
  templateUrl: './yandex-geoobject.component.html',
  styleUrls: ['./yandex-geoobject.component.scss']
})
export class YandexGeoobjectComponent implements OnInit {
  @Input() public feature: any;
  @Input() public options: any;

  constructor() {}

  public ngOnInit(): void {
    this._logErrors();
  }

  private _logErrors(): void {
    if (!this.feature) {
      console.error('GeoObjects: feature input is required.');
      this.feature = {};
    }
  }
}
