import {
  Directive,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { YMap } from '@yandex/ymaps3-types';
import { YMapZoomControl, YMapZoomControlProps } from '@yandex/ymaps3-types/packages/controls';
import { from, Subject, takeUntil, tap } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { ComplexOptions } from '../../../types/complex-options';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapControlsDirective } from '../y-map-controls/y-map-controls.directive';

/**
 * This component wraps the [ymaps3.YMapZoomControl](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/controls/#class-ymapzoomcontrol) class from the Yandex.Maps API.
 * All component inputs are named the same as the API class constructor arguments. This component must be used inside a `y-map-controls` component.
 * This component is from the `@yandex/ymaps3-controls@0.0.1` package, which is asynchronously loaded when you use this component.
 *
 * ```html
 * <y-map
 *   [props]="{
 *     location: {
 *       center: [-0.127696, 51.507351],
 *       zoom: 9,
 *     },
 *   }"
 * >
 *   <y-map-default-scheme-layer />
 *
 *   <y-map-controls [props]="{ position: 'top' }">
 *     <y-map-zoom-control-button />
 *   </y-map-controls>
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-zoom-control-button',
  standalone: true,
})
export class YMapZoomControlDirective implements OnInit, OnChanges, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly yMapControlsDirective = inject(YMapControlsDirective);

  private readonly destroy$ = new Subject<void>();

  private control?: YMapZoomControl;

  /**
   * See the API entity documentation for detailed information. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/controls/#YMapZoomControlProps}
   */
  @Input() props: YMapZoomControlProps = {};

  /**
   * See the API entity documentation for detailed information.
   */
  @Input() options?: ComplexOptions<YMap>;

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapZoomControl>> = new EventEmitter<
    YReadyEvent<YMapZoomControl>
  >();

  ngOnInit() {
    this.yMapControlsDirective.controls$
      .pipe(
        filter(Boolean),
        switchMap((controls) =>
          // It's safe to call it each time, the Yandex.Maps API handles multiple requests under the hood.
          from(ymaps3.import('@yandex/ymaps3-controls@0.0.1')).pipe(
            tap(({ YMapZoomControl }) => {
              this.control = new YMapZoomControl(this.props, this.options);
              controls.addChild(this.control);
              this.ready.emit({ ymaps3, entity: this.control });
            }),
          ),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    // It must be run outside a zone; otherwise, all async events within this call will cause ticks.
    this.ngZone.runOutsideAngular(() => {
      if (this.control) {
        this.control.update(changes['props'].currentValue);
      }
    });
  }

  ngOnDestroy() {
    if (this.control) {
      this.yMapControlsDirective.controls$.value?.removeChild(this.control);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
