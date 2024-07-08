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
import { YMapFeature, YMapFeatureProps } from '@yandex/ymaps3-types';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { YReadyEvent } from '../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';

/**
 * This component wraps the [ymaps3.YMapFeature](https://yandex.ru/dev/jsapi30/doc/en/ref/#class-ymapfeature) class from the Yandex.Maps API.
 * All class constructor arguments are component inputs.
 * The component implements `OnChanges` and supports inputs updates.
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
 *   <y-map-default-features-layer />
 *
 *   <y-map-feature
 *     [props]="{
 *       geometry: {
 *         type: 'Polygon',
 *         coordinates: [
 *           [
 *             [-0.557696, 51.727351],
 *             [0.302304, 51.727351],
 *             [0.302304, 51.237351],
 *             [-0.557696, 51.237351],
 *           ],
 *         ],
 *       },
 *       style: {
 *         stroke: [{ color: '#006efc', width: 4, dash: [5, 10] }],
 *         fill: 'rgba(56, 56, 219, 0.5)',
 *       },
 *     }"
 *   />
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-feature',
  standalone: true,
})
export class YMapFeatureDirective implements OnInit, OnDestroy, OnChanges {
  private readonly destroy$ = new Subject<void>();

  private feature?: YMapFeature;

  /**
   * Feature properties. Supports changes.
   * {@link https://yandex.ru/dev/jsapi30/doc/en/ref/#YMapFeatureProps}
   */
  @Input({ required: true }) props!: YMapFeatureProps;

  /**
   * The feature instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapFeature>> = new EventEmitter<
    YReadyEvent<YMapFeature>
  >();

  constructor(private readonly yMapComponent: YMapComponent) {}

  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map) => {
      if (this.props) {
        this.feature = new ymaps3.YMapFeature(this.props);
        map.addChild(this.feature);
        this.ready.emit({ ymaps3, entity: this.feature });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const feature = this.feature;

    if (feature) {
      feature.update(changes['props'].currentValue);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
