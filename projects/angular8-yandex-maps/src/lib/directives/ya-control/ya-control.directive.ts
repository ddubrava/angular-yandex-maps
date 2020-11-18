import {
  Directive,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ILoadEvent } from '../../interfaces/event';
import { removeLeadingSpaces } from '../../utils/removeLeadingSpaces';

export type ControlType =
  | 'Button'
  | 'FullscreenControl'
  | 'GeolocationControl'
  | 'ListBox'
  | 'ListBoxItem'
  | 'RouteButton'
  | 'RouteEditor'
  | 'RoutePanel'
  | 'RulerControl'
  | 'SearchControl'
  | 'TrafficControl'
  | 'TypeSelector'
  | 'ZoomControl';

/**
 * Directive for creating and managing controls on the map.
 *
 * @example `<ya-control type="RoutePanel" [parameters]="{ options: { float: 'right' } }"></ya-control>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/components/controls}
 */
@Directive({
  selector: 'ya-control',
})
export class YaControlDirective implements OnInit, OnChanges {
  /**
   * Control type.
   */
  @Input() public type: ControlType;

  /**
   * Parameters for the Control.
   */
  @Input() public parameters: any;

  /**
   * Emits immediately after this entity is added in root container.
   */
  @Output() public ready = new EventEmitter<ILoadEvent>();

  constructor(private _ngZone: NgZone) {}

  public ngOnInit(): void {
    this._logErrors();
  }

  private _logErrors(): void {
    if (!this.type) {
      console.error('Control: type input is required.');
    }
  }

  /**
   * Creates control
   * @returns Instance of created control
   */
  public createControl(): any {
    /**
     * Wrong typings in DefinitelyTyped.
     */
    const control = new (ymaps.control as any)[this.type](this.parameters);

    // RoutePanel ignores state in parameters. API bug
    if (
      this.type === 'RoutePanel' &&
      this.parameters &&
      this.parameters.state
    ) {
      control.routePanel.state.set({ ...this.parameters.state });
    }

    this._emitEvent(control);

    return control;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._updateControl(changes);
  }

  private _updateControl(changes: SimpleChanges): void {
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

  private _emitEvent(control: any): void {
    this._ngZone.run(() => this.ready.emit({ ymaps, instance: control }));
  }
}
