import {
  Directive,
  EventEmitter,
  Input,
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

  constructor(private readonly yMapComponent: YMapComponent) {}

  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map) => {
      this.layer = new ymaps3.YMapDefaultFeaturesLayer(this.props, this.options);
      map.addChild(this.layer);
      this.ready.emit({ ymaps3, entity: this.layer });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.layer) {
      this.layer.update(changes['props'].currentValue);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
