import {
  Directive,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  YMapGeolocationControl,
  YMapGeolocationControlProps,
} from '@yandex/ymaps3-types/packages/controls';
import { from, Subject, takeUntil, tap } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapControlsDirective } from '../y-map-controls/y-map-controls.directive';

/**
 * This component wraps the [ymaps3.YMapGeolocationControl](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/controls/#class-ymapgeolocationcontrol) class from the Yandex.Maps API.
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
 *     <y-map-geolocation-control />
 *   </y-map-controls>
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-geolocation-control',
  standalone: true,
})
export class YMapGeolocationControlDirective implements OnInit, OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private control?: YMapGeolocationControl;

  /**
   * See the API entity documentation for detailed information. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/controls/#YMapGeolocationControlProps}
   */
  @Input() props: YMapGeolocationControlProps = {};

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapGeolocationControl>> = new EventEmitter<
    YReadyEvent<YMapGeolocationControl>
  >();

  constructor(
    private readonly ngZone: NgZone,
    private readonly yMapControlsDirective: YMapControlsDirective,
  ) {}

  ngOnInit() {
    this.yMapControlsDirective.controls$
      .pipe(
        filter(Boolean),
        switchMap((controls) =>
          // It's safe to call it each time, the Yandex.Maps API handles multiple requests under the hood.
          from(ymaps3.import('@yandex/ymaps3-controls@0.0.1')).pipe(
            tap(({ YMapGeolocationControl }) => {
              this.control = new YMapGeolocationControl(this.props);
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
