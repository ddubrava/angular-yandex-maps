import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'angular-yandex-geoobject',
  templateUrl: './yandex-geoobject.component.html',
  styleUrls: ['./yandex-geoobject.component.scss']
})
export class YandexGeoObjectComponent implements OnInit {
  @Input() public feature: any;
  @Input() public options: any;

  @Output() public onInit = new EventEmitter<any>();

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

  public initGeoObject(ymaps: any, map: any): void {
    const geoObject = new ymaps.GeoObject(this.feature, this.options);

    map.geoObjects.add(geoObject);
    this.onInit.emit(geoObject);
  }
}
