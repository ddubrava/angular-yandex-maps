import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILoadEvent } from '../../models/models';

@Component({
  selector: 'angular-yandex-control',
  templateUrl: './yandex-control.component.html',
  styleUrls: ['./yandex-control.component.scss']
})
export class YandexControlComponent implements OnInit {
  @Input() public type: string;
  @Input() public parameters: any;

  @Output() public load = new EventEmitter<ILoadEvent>();

  constructor() {}
  public ngOnInit(): void {}

  public initControl(ymaps: any, map: any): void {
    const control = new ymaps.control[this.type](this.parameters);

    // RoutePanel ignores state in parameters. Probably API bug
    if (this.type === 'RoutePanel' && this.parameters && this.parameters.state) {
      control.routePanel.state.set({ ...this.parameters.state });
    }

    map.controls.add(control);
    this.load.emit({ ymaps, instance: control });
  }
}
