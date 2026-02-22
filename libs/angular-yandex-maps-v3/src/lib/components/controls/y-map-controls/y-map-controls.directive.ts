import type { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Directive, EventEmitter, inject, Input, NgZone, Output } from '@angular/core';
import type { YMapControls, YMapControlsProps, YMapEntity } from '@yandex/ymaps3-types';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import type { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../../common/y-map/y-map.component';

/**
 * This component wraps the [ymaps3.YMapControls](https://yandex.com/maps-api/docs/js-api/object/controls/YMapControls.html) class from the Yandex.Maps API.
 * All component inputs are named the same as the API class constructor arguments.
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
 *     ...
 *   </y-map-controls>
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-controls',
})
export class YMapControlsDirective implements OnInit, OnChanges, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly yMapComponent = inject(YMapComponent);

  private readonly destroy$ = new Subject<void>();

  controls$ = new BehaviorSubject<YMapControls | null>(null);

  /**
   * Controls properties. Supports ngOnChanges.
   * {@link https://yandex.com/maps-api/docs/js-api/object/controls/YMapControls.html#props}
   */
  @Input({ required: true }) props!: YMapControlsProps;

  /**
   * See the API entity documentation for detailed information.
   */
  @Input() children?: YMapEntity<unknown, object>[];

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapControls>> = new EventEmitter<
    YReadyEvent<YMapControls>
  >();

  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map) => {
      const controls = new ymaps3.YMapControls(this.props, this.children);

      map.addChild(controls);
      this.controls$.next(controls);
      this.ready.emit({ ymaps3, entity: controls });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // It must be run outside a zone; otherwise, all async events within this call will cause ticks.
    this.ngZone.runOutsideAngular(() => {
      if (this.controls$.value) {
        this.controls$.value.update(changes['props'].currentValue);
      }
    });
  }

  ngOnDestroy() {
    if (this.controls$.value) {
      this.yMapComponent.map$.value?.removeChild(this.controls$.value);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
