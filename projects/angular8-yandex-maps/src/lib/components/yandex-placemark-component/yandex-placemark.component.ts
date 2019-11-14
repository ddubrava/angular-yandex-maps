import { Component, OnInit, Input } from '@angular/core';

export interface IPlacemark {
  [key: string]: any;
}

@Component({
  selector: 'angular-yandex-placemark',
  templateUrl: './yandex-placemark.component.html',
  styleUrls: ['./yandex-placemark.component.scss']
})
export class YandexPlacemarkComponent implements OnInit {
  @Input() public geometry: any;
  @Input() public properties: any;
  @Input() public options: any;

  constructor() {}

  public ngOnInit(): void {
    this._logErrors();
  }

  private _logErrors(): void {
    if (!this.geometry) {
      console.error('Placemark: geometry input is required.');
      this.geometry = [];
    }
  }

  public initPlacemark(ymaps: any, map: any): IPlacemark {
    const placemark = new ymaps.Placemark(this.geometry, this.properties, this.options);

    map.geoObjects.add(placemark);
    return placemark;
  }
}
