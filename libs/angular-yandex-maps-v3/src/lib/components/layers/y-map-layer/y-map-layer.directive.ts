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
import { YMapLayer, YMapLayerProps } from '@yandex/ymaps3-types';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../../common/y-map/y-map.component';

/**
 * This component wraps the [ymaps3.YMapLayer](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymaplayer) class from the Yandex.Maps API.
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
 *   <y-map-default-scheme-layer />
 *
 *   <y-map-layer
 *     [props]="{
 *       type: 'markers',
 *       zIndex: 1800,
 *     }"
 *   />
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-layer',
  standalone: true,
})
export class YMapLayerDirective implements OnInit, OnDestroy, OnChanges {
  private readonly ngZone = inject(NgZone);
  private readonly yMapComponent = inject(YMapComponent);

  private readonly destroy$ = new Subject<void>();

  private layer?: YMapLayer;

  /**
   * See the API entity documentation for detailed information. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapLayerProps}
   */
  @Input({ required: true }) props!: YMapLayerProps;

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapLayer>> = new EventEmitter<
    YReadyEvent<YMapLayer>
  >();

  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map) => {
      this.layer = new ymaps3.YMapLayer(this.props);
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
