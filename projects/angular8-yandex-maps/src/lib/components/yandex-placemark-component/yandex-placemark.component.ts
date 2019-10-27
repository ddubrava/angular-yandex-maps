import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'angular-yandex-placemark',
  templateUrl: './yandex-placemark.component.html',
  styleUrls: ['./yandex-placemark.component.scss']
})
export class YandexPlacemarkComponent implements OnInit {
  @Input() public geometry: any = [];
  @Input() public placemarkProperties: any;
  @Input() public placemarkOptions: any;

  constructor() {}

  public ngOnInit(): void {
    this._logErrors();
  }

  private _logErrors(): void {
    if (!this.geometry.length) console.error('Placemark: geometry is required');
  }
}
