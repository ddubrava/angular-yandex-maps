import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'angular-yandex-placemark',
  templateUrl: './yandex-placemark.component.html',
  styleUrls: ['./yandex-placemark.component.scss']
})
export class YandexPlacemarkComponent implements OnInit {
  @Input() public geometry: any;
  @Input() public properties: any;
  @Input() public options: any;

  @Output() public onInit = new EventEmitter<any>();

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

  public initPlacemark(ymaps: any, map: any): any {
    const placemark = new ymaps.Placemark(this.geometry, this.properties, this.options);

    map.geoObjects.add(placemark);
    this.onInit.emit(placemark);

    return placemark;
  }
}
