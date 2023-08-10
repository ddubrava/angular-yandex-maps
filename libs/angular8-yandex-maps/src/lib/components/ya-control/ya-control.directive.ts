import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { YaReadyEvent } from '../../interfaces/ya-ready-event';
import { YaMapComponent } from '../ya-map/ya-map.component';

/**
 * Types for `YaControlDirective[type]` input.
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
 * <example-url>https://stackblitz.com/edit/searchcontrol?embed=1&view=preview</example-url>
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
  @Input() type?: YaControlType;

  /**
   * Control parameters.
   */
  @Input() parameters?: any;

  /**
   * Control instance is added to a Map. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YaReadyEvent<any>> = new EventEmitter<YaReadyEvent<any>>();

  constructor(private readonly yaMapComponent: YaMapComponent) {}

  ngOnChanges(): void {
    if (this.control) {
      console.warn(
        'Control does not support dynamic configuration. You can config it manually using ymaps or recreate the component with new configuration.',
      );
    }
  }

  ngOnInit(): void {
    this.yaMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map) => {
      if (!this.type) {
        throw new Error('ymaps.control[type] is invalid.');
      }

      const control = new ymaps.control[this.type](this.parameters);
      this.control = control;

      // RoutePanel ignores state in parameters. API bug
      if (control instanceof ymaps.control.RoutePanel && this.parameters && this.parameters.state) {
        control.routePanel.state.set({ ...this.parameters.state });
      }

      map.controls.add(control);
      this.ready.emit({ ymaps, target: control });
    });
  }

  ngOnDestroy(): void {
    if (this.control) {
      this.yaMapComponent?.map$.value?.controls.remove(this.control);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
