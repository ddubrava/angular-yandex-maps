import { Component, OnInit, Input } from '@angular/core';
import { YandexMapModule } from '../../types/yandex-map.type';

@Component({
  selector: 'angular-yandex-placemark',
  templateUrl: './yandex-placemark.component.html',
  styleUrls: ['./yandex-placemark.component.scss']
})
export class YandexPlacemarkComponent implements OnInit {
  @Input() public geometry: any;
  @Input() public placemarkProperties: any;
  @Input() public placemarkOptions: YandexMapModule.IPlacemarkOptions;

  constructor() {}
  public ngOnInit(): void {}
}
