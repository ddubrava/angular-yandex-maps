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
import { YMap } from '@yandex/ymaps3-types';
import {
  YMapControlCommonButton,
  YMapControlCommonButtonProps,
} from '@yandex/ymaps3-types/imperative/YMapControl';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ComplexOptions } from '../../../types/complex-options';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapControlsDirective } from '../y-map-controls/y-map-controls.directive';

/**
 * This component wraps the [ymaps3.YMapControlCommonButton](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymapcontrolcommonbutton) class from the Yandex.Maps API.
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
 *     <y-map-control-common-button [props]="{ text: 'Hello' }" />
 *   </y-map-controls>
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-control-common-button',
  standalone: true,
})
export class YMapControlCommonButtonDirective implements OnInit, OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private control?: YMapControlCommonButton;

  /**
   * Button properties. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapControlCommonButtonProps}
   */
  @Input({ required: true }) props!: YMapControlCommonButtonProps;

  /**
   * See the API entity documentation for detailed information.
   */
  @Input() options?: ComplexOptions<YMap>;

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapControlCommonButton>> = new EventEmitter<
    YReadyEvent<YMapControlCommonButton>
  >();

  constructor(
    private readonly ngZone: NgZone,
    private readonly yMapControlsDirective: YMapControlsDirective,
  ) {}

  ngOnInit() {
    this.yMapControlsDirective.controls$
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe((controls) => {
        this.control = new ymaps3.YMapControlCommonButton(this.props, this.options);
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
