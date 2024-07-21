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
import { YMap, YMapDefaultSchemeLayer, YMapDefaultSchemeLayerProps } from '@yandex/ymaps3-types';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ComplexOptions } from '../../../types/complex-options';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../../common/y-map/y-map.component';

/**
 * This component wraps the [ymaps3.YMapDefaultSchemeLayer](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymapdefaultschemelayer) class from the Yandex.Maps API.
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
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-default-scheme-layer',
  standalone: true,
})
export class YMapDefaultSchemeLayerDirective implements OnInit, OnDestroy, OnChanges {
  private readonly destroy$ = new Subject<void>();

  private layer?: YMapDefaultSchemeLayer;

  /**
   * See the API entity documentation for detailed information. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapDefaultSchemeLayerProps}
   */
  @Input() props: YMapDefaultSchemeLayerProps = {};

  /**
   * See the API entity documentation for detailed information.
   */
  @Input() options?: ComplexOptions<YMap>;

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapDefaultSchemeLayer>> = new EventEmitter<
    YReadyEvent<YMapDefaultSchemeLayer>
  >();

  constructor(
    private readonly ngZone: NgZone,
    private readonly yMapComponent: YMapComponent,
  ) {}

  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map) => {
      this.layer = new ymaps3.YMapDefaultSchemeLayer(this.props, this.options);
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
