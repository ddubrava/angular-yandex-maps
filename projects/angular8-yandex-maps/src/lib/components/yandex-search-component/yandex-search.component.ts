import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'angular-yandex-search',
  templateUrl: './yandex-search.component.html',
  styleUrls: ['./yandex-search.component.scss']
})
export class YandexSearchComponent implements OnInit {
  @Input() public searchRequest: string;
  @Input() public parameters: any;

  @Output() public onInit = new EventEmitter<any>();

  constructor() {}
  public ngOnInit(): void {}

  public initSearchControl(ymaps: any, map: any): void {
    const searchControl = new ymaps.control.SearchControl(this.parameters);
    const request = this.searchRequest;

    this.onInit.emit(searchControl);

    map.controls.add(searchControl);
    if (request) searchControl.search(request);
  }
}
