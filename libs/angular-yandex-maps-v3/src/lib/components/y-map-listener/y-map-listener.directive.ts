import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { YMapListener, YMapListenerProps } from '@yandex/ymaps3-types';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { YReadyEvent } from '../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';

/**
 * This component wraps the [ymaps3.YMapListener](https://yandex.ru/dev/jsapi30/doc/en/ref/#class-ymaplistener) class from the Yandex.Maps API.
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
 *
 *   <y-map-listener
 *     [props]="{
 *       onClick: onClick,
 *     }"
 *   />
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-listener',
  standalone: true,
})
export class YMapListenerDirective implements OnInit, OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private listener?: YMapListener;

  /**
   * Listener properties. Supports changes.
   * {@link https://yandex.ru/dev/jsapi30/doc/en/ref/#YMapListenerProps}
   */
  @Input({ required: true }) props!: YMapListenerProps;

  /**
   * The listener instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapListener>> = new EventEmitter<
    YReadyEvent<YMapListener>
  >();

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly yMapComponent: YMapComponent,
  ) {}

  ngOnInit() {
    this.yMapComponent.map$.pipe(filter(Boolean), takeUntil(this.destroy$)).subscribe((map) => {
      this.listener = new ymaps3.YMapListener(this.props);
      map.addChild(this.listener);
      this.ready.emit({ ymaps3, entity: this.listener });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const listener = this.listener;

    if (listener) {
      listener.update(changes['props'].currentValue);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
