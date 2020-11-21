import {
  Directive,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { YaControlType } from '../../interfaces/control-type';
import { YaReadyEvent } from '../../interfaces/event';

/**
 * Directive for creating and managing controls on the map.
 *
 * @example `<ya-control type="RoutePanel" [parameters]="{ options: { float: 'right' } }"></ya-control>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/directives/control}
 */
@Directive({
  selector: 'ya-control',
})
export class YaControlDirective implements OnChanges {
  /**
   * Control type.
   */
  @Input() public type: YaControlType;

  /**
   * Parameters for the Control.
   */
  @Input() public parameters: any;

  /**
   * Emits immediately after this entity is added in root container.
   */
  @Output() public ready = new EventEmitter<YaReadyEvent>();

  private _control: any;

  constructor(private _ngZone: NgZone) {}

  /**
   * Creates control
   * @returns Instance of created control
   */
  public createControl(): any {
    this._checkRequiredInputs();

    /**
     * Wrong typings in DefinitelyTyped.
     */
    const control = new (ymaps.control as any)[this.type](this.parameters);
    this._control = control;

    // RoutePanel ignores state in parameters. API bug
    if (
      this.type === 'RoutePanel' &&
      this.parameters &&
      this.parameters.state
    ) {
      control.routePanel.state.set({ ...this.parameters.state });
    }

    this._ngZone.run(() => this.ready.emit({ ymaps, instance: control }));

    return control;
  }

  public ngOnChanges(): void {
    if (!this._control) return;

    throw new Error(
      "Control doesn't support dynamic configuartion. You can config it manually using ymaps or recreate the component with new configuration",
    );
  }

  private _checkRequiredInputs(): void {
    if (this.type === undefined || this.type === null) {
      throw new Error('Type is required');
    }
  }
}
