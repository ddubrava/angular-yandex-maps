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
import {
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultFeaturesLayerProps,
} from '@yandex/ymaps3-types';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ComplexOptions } from '../../../types/complex-options';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../../common/y-map/y-map.component';

/**
 * This component wraps the [ymaps3.YMapDefaultFeaturesLayer](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymapdefaultfeatureslayer) class from the Yandex.Maps API.
 * All component inputs are named the same as the API class constructor arguments.
 *
 * ```html
 * <y-map
 *   [props]="{
 *     location: {
 *       center: [-0.127696, 51.507351],
 *       zoom: 10,
 *     },
 *   }"
 * >
 *   <y-map-default-features-layer />
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-default-features-layer',
  standalone: true,
})
export class YMapDefaultFeaturesLayerDirective implements OnInit, OnDestroy, OnChanges {
  private readonly ngZone = inject(NgZone);
  private readonly yMapComponent = inject(YMapComponent);

  private readonly destroy$ = new Subject<void>();

  private layer?: YMapDefaultFeaturesLayer;

  /**
   * See the API entity documentation for detailed information. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapDefaultFeaturesLayerProps}
   */
  @Input() props: YMapDefaultFeaturesLayerProps = {};

  /**
   * See the API entity documentation for detailed information.
   */
  @Input() options?: ComplexOptions<YMap>;

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapDefaultFeaturesLayer>> = new EventEmitter<
    YReadyEvent<YMapDefaultFeaturesLayer>
  >();

  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map) => {
      this.layer = new ymaps3.YMapDefaultFeaturesLayer(this.props, this.options);
      map.addChild(this.layer);
      this.ready.emit({ ymaps3, entity: this.layer });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // It must be run outside a zone; otherwise, all async events within this call will cause ticks.
    this.ngZone.runOutsideAngular(() => {
      if (this.layer) {
        this.layer.update(changes['props'].currentValue);
      }
    });
  }

  ngOnDestroy() {
    if (this.layer) {
      this.yMapComponent.map$.value?.removeChild(this.layer);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
