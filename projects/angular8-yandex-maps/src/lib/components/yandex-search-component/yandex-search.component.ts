import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'angular-yandex-search',
  templateUrl: './yandex-search.component.html',
  styleUrls: ['./yandex-search.component.scss']
})
export class YandexSearchComponent implements OnInit {
  @Input() public searchRequest: string;
  @Input() public parameters: any;

  constructor() {}
  public ngOnInit(): void {}
}
