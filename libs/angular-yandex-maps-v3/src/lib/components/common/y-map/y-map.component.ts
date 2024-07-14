import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { YMap, YMapEntity, YMapProps } from '@yandex/ymaps3-types';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { YApiLoaderService } from '../../../services/y-api-loader/y-api-loader.service';
import { YReadyEvent } from '../../../types/y-ready-event';
import { generateRandomId } from '../../../utils/generate-random-id/generate-random-id';

/**
 * This component wraps the [ymaps3.YMap](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymap) class from the Yandex.Maps API.
 * All component inputs are named the same as the API class constructor arguments.
 *
 * ```html
 * <y-map
 *   [props]="{
 *     location: {
 *       center: [-0.127696, 51.507351],
 *       zoom: 10,
 *     },
 *     theme: 'dark',
 *   }"
 * >
 *   <y-map-default-scheme-layer />
 * </y-map>
 * ```
 */
@Component({
  selector: 'y-map',
  standalone: true,
  template: '<div #container></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('container') readonly container!: ElementRef;

  private readonly destroy$ = new Subject<void>();

  map$ = new BehaviorSubject<YMap | null>(null);

  /**
   * See the API entity documentation for detailed information. Supports updates.
   * {@link https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapProps}
   */
  @Input({ required: true }) props!: YMapProps;

  /**
   * See the API entity documentation for detailed information.
   */
  @Input() children?: YMapEntity<unknown, object>[];

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMap>> = new EventEmitter<YReadyEvent<YMap>>();

  constructor(
    private readonly yaApiLoaderService: YApiLoaderService,
    private readonly ngZone: NgZone,
  ) {}

  ngAfterViewInit() {
    this.yaApiLoaderService
      .load()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const id = generateRandomId();
        const map = this.createMap(id);

        /**
         * Once the configuration is changed, e.g. language,
         * we need to reinitialize the map.
         */
        if (this.map$.value) {
          this.map$.value.destroy();
        }

        this.map$.next(map);
        this.ready.emit({ ymaps3, entity: map });
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.map$.value) {
      this.map$.value.update(changes['props'].currentValue);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createMap(containerId: string): YMap {
    const containerElem: HTMLElement = this.container.nativeElement;

    containerElem.setAttribute('id', containerId);
    containerElem.style.cssText = 'width: 100%; height: 100%;';

    return new ymaps3.YMap(containerElem, this.props, this.children);
  }
}
