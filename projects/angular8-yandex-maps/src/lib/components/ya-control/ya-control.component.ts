import * as ymaps from 'yandex-maps';
import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ILoadEvent } from '../../models/models';
import { removeLeadingSpaces } from '../../utils/removeLeadingSpaces';

/**
 * Component for creating and managing controls on the map.
 *
 * @example `<ya-control type="RoutePanel" [parameters]="{ options: { float: 'right' } }"></ya-control>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/components/controls}
 */
@Component({
  selector: 'ya-control',
  templateUrl: './ya-control.component.html',
  styleUrls: ['./ya-control.component.scss'],
})
export class YaControlComponent implements OnInit, OnChanges {
  /**
   * Control type.
   * @example Control.FullscreenControl - 'FullscreenControl'.
   * @see {@link https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/control.Button-docpage/}
   */
  @Input() public type: string;
  /**
   * Parameters for the Control.
   */
  @Input() public parameters: any;

  /**
   * Emits immediately after this entity is added in root container.
   */
  @Output() public load = new EventEmitter<ILoadEvent>();

  constructor(private ngZone: NgZone) {}

  public ngOnInit(): void {
    this.logErrors();
  }

  private logErrors(): void {
    if (!this.type) {
      console.error('Control: type input is required.');
    }
  }

  /**
   * Creates control
   * @returns Instance of created control
   */
  public createControl(): any {
    const control = new ymaps.control[this.type](this.parameters);

    // RoutePanel ignores state in parameters. API bug
    if (this.type === 'RoutePanel' && this.parameters && this.parameters.state) {
      control.routePanel.state.set({ ...this.parameters.state });
    }

    this.emitEvent(control);

    return control;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.updateControl(changes);
  }

  private updateControl(changes: SimpleChanges): void {
    if (Object.values(changes).some((v) => v.firstChange)) return;

    console.error(
      removeLeadingSpaces(`
      Control doesn't support dynamic configuartion.

      Solutions:
      1. Use ymaps from ILoadEvent
      2. Recreate component with new configuration
    `),
    );
  }

  private emitEvent(control: any): void {
    this.ngZone.run(() => this.load.emit({ ymaps, instance: control }));
  }
}
