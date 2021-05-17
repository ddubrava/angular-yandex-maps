import {
  Directive,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { YaReadyEvent } from '../../utils/event-manager';
import { YaMapComponent } from '../ya-map/ya-map.component';

export type YaControlType =
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
 * The `ya-control` component wraps `ymaps.control[YaControlType]` classes from the Yandex Maps API.
 * You can configure `ymaps.control[YaControlType]` via the component's inputs.
 * API Events can be bound only manually. You can use `ready` event to get an instance.
 *
 * <example-url>https://searchcontrol.stackblitz.io/</example-url>
 *
 * @example
 * <ya-map [center]="[55.761952, 37.620739]">
 *              <ya-control
 *                type="RoutePanel"
 *                [parameters]="{ options: { float: 'right' } }"
 *              ></ya-control>
 * </ya-map>
 */
@Directive({
  selector: 'ya-control',
})
export class YaControlDirective implements OnInit, OnChanges, OnDestroy {
  private readonly _sub = new Subscription();

  private _control?: any;

  /**
   * Control type.
   */
  @Input() type: YaControlType;

  /**
   * Parameters for the Control.
   */
  @Input() parameters: any;

  /**
   * Control instance is added in a Map.
   */
  @Output() ready: EventEmitter<YaReadyEvent<any>> = new EventEmitter<YaReadyEvent<any>>();

  constructor(private readonly _ngZone: NgZone, private readonly _yaMapComponent: YaMapComponent) {}

  ngOnChanges(): void {
    if (this._control) {
      console.warn(
        'Control does not support dynamic configuration. You can config it manually using ymaps or recreate the component with new configuration',
      );
    }
  }

  ngOnInit(): void {
    if (this._yaMapComponent.isBrowser) {
      const sub = this._yaMapComponent.map$.subscribe((map) => {
        if (map) {
          const control = new ymaps.control[this.type](this.parameters);
          this._control = control;

          /**
           * RoutePanel ignores state in parameters. API bug
           */
          if (
            control instanceof ymaps.control.RoutePanel &&
            this.parameters &&
            this.parameters.state
          ) {
            /**
             * Typings seems ok, bug in Yandex.Maps API documentation
             */
            (control.routePanel.state as any).set({ ...this.parameters.state });
          }

          map.controls.add(control);
          this.ready.emit({ ymaps, target: control });
        }
      });

      this._sub.add(sub);
    }
  }

  ngOnDestroy(): void {
    if (this._control) {
      this._yaMapComponent?.map$.value?.controls.remove(this._control);
    }
  }
}
