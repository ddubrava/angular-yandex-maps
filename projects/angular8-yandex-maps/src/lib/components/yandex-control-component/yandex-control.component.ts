import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'angular-yandex-control',
  templateUrl: './yandex-control.component.html',
  styleUrls: ['./yandex-control.component.scss']
})
export class YandexControlComponent implements OnInit {
  @Input() public type: string;
  @Input() public parameters: any;

  @Output() public onInit = new EventEmitter<any>();

  constructor() {}
  public ngOnInit(): void {}

  public initControl(ymaps: any, map: any): void {
    const control = new ymaps.control[this.type](this.parameters);

    map.controls.add(control);
    this.onInit.emit(control);
  }
}
