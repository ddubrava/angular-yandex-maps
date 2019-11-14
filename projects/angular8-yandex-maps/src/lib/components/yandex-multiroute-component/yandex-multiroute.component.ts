import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'angular-yandex-multiroute',
  templateUrl: './yandex-multiroute.component.html',
  styleUrls: ['./yandex-multiroute.component.scss']
})
export class YandexMultirouteComponent implements OnInit {
  @Input() public referencePoints: Array<any>;
  @Input() public model: any;
  @Input() public options: any;

  constructor() { }

  public ngOnInit(): void {
    this._logErrors();
  }

  private _logErrors(): void {
    if (!this.referencePoints) {
      console.error('Multiroute: referencePoints input is required.');
      this.referencePoints = [];
    }
  }

  public initMultiroute(ymaps: any, map: any): void {
    map.geoObjects
      .add(new ymaps.multiRouter.MultiRoute(
        { ...this.model, referencePoints: this.referencePoints }, this.options
      ));
  }
}
