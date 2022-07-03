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
import { Subject, takeUntil } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { YaReadyEvent } from '../../models/ya-ready-event';
import { YaMapComponent } from '../ya-map/ya-map.component';

/**
 * Control types.
 */
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
 * The `ya-control` component wraps `ymaps.control[YaControlType]` classes from the Yandex.Maps API.
 * You can configure `ymaps.control[YaControlType]` via the component's inputs.
 * API Events can be bound only manually. You can use `ready` event to get an instance.
 *
 * <example-url>https://stackblitz.com/edit/searchcontrol?embed=1</example-url>
 *
 * @example
 * ```html
 * <ya-map [center]="[55.761952, 37.620739]">
 *   <ya-control
 *     type="RoutePanel"
 *     [parameters]="{ options: { float: 'right' } }"
 *   ></ya-control>
 * </ya-map>
 * ```
 */
@Directive({
  selector: 'ya-control',
})
export class YaControlDirective implements OnInit, OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private control?: any;

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

  constructor(private readonly ngZone: NgZone, private readonly yaMapComponent: YaMapComponent) {}

  ngOnChanges(): void {
    if (this.control) {
      console.warn(
        'Control does not support dynamic configuration. You can config it manually using ymaps or recreate the component with new configuration',
      );
    }
  }

  ngOnInit(): void {
    // It should be a noop during server-side rendering.
    if (this.yaMapComponent.isBrowser) {
      this.yaMapComponent.map$
        .pipe(filter(Boolean), take(1), takeUntil(this.destroy$))
        .subscribe((map) => {
          const control = new ymaps.control[this.type](this.parameters);
          this.control = control;

          // RoutePanel ignores state in parameters. API bug
          if (
            control instanceof ymaps.control.RoutePanel &&
            this.parameters &&
            this.parameters.state
          ) {
            control.routePanel.state.set({ ...this.parameters.state });
          }

          map.controls.add(control);
          this.ngZone.run(() => this.ready.emit({ ymaps, target: control }));
        });
    }
  }

  ngOnDestroy(): void {
    if (this.control) {
      this.yaMapComponent?.map$.value?.controls.remove(this.control);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
