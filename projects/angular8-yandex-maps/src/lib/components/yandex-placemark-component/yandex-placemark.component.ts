import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'angular-yandex-placemark',
  templateUrl: './yandex-placemark.component.html',
  styleUrls: ['./yandex-placemark.component.scss']
})
export class YandexPlacemarkComponent implements OnInit {
  @Input() public geometry: Array<number>;

  constructor() {}
  public ngOnInit(): void {}
}
