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
import { YMapScaleControl, YMapScaleControlProps } from '@yandex/ymaps3-types';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapControlsDirective } from '../y-map-controls/y-map-controls.directive';

/**
 * This component wraps the [ymaps3.YMapScaleControl](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymapscalecontrol) class from the Yandex.Maps API.
 * All component inputs are named the same as the API class constructor arguments. This component must be used inside a `y-map-controls` component.
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
 *     <y-map-scale-control />
 *   </y-map-controls>
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-scale-control',
  standalone: true,
})
export class YMapScaleControlDirective implements OnInit, OnChanges, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly yMapControlsDirective = inject(YMapControlsDirective);

  private readonly destroy$ = new Subject<void>();

  private control?: YMapScaleControl;

  /**
   * See the API entity documentation for detailed information. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapScaleControlProps}
   */
  @Input() props: YMapScaleControlProps = {};

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapScaleControl>> = new EventEmitter<
    YReadyEvent<YMapScaleControl>
  >();

  ngOnInit() {
    this.yMapControlsDirective.controls$
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe((controls) => {
        this.control = new ymaps3.YMapScaleControl(this.props);
        controls.addChild(this.control);
        this.ready.emit({ ymaps3, entity: this.control });
      });
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
