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
import { DomDetach } from '@yandex/ymaps3-types/imperative/DomContext';
import { YMapControl, YMapControlProps } from '@yandex/ymaps3-types/imperative/YMapControl';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapControlsDirective } from '../y-map-controls/y-map-controls.directive';

/**
 * This component wraps the [ymaps3.YMapControl](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymapcontrol) class from the Yandex.Maps API.
 * All component inputs are named the same as the API class constructor arguments. This component must be used inside a `y-map-controls` component.
 * Custom HTML can only be projected, see the example below.
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
 *     <y-map-control>
 *       <p>Custom HTML</p>
 *     </y-map-control>
 *   </y-map-controls>
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-control',
  standalone: true,
})
export class YMapControlDirective implements OnInit, OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private control?: YMapControl;

  /**
   * See the API entity documentation for detailed information. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapControlProps}
   */
  @Input() props: YMapControlProps = {};

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapControl>> = new EventEmitter<
    YReadyEvent<YMapControl>
  >();

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly yMapControlsDirective: YMapControlsDirective,
  ) {}

  ngOnInit() {
    this.yMapControlsDirective.controls$
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe((controls) => {
        // ContentChild cannot be used without a selector.
        // We do not have any selectors, and we do not want to force users to use them.
        // All we need is an alternative to React children, just to get everything projected to the component.
        // Using an element reference is probably the easiest solution for this.
        const element = this.elementRef.nativeElement.firstChild as HTMLElement;

        this.control = new ymaps3.YMapControl(this.props);
        this.control.addChild(this.createControlContainer(element));
        controls.addChild(this.control);
        this.ready.emit({ ymaps3, entity: this.control });
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.control) {
      this.control.update(changes['props'].currentValue);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * To render a control, a container is required.
   * This method isolates all the container creation logic and returns the entity.
   */
  private createControlContainer(element: HTMLElement) {
    // This logic is taken from the official documentation.
    // See https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/hint/#class-ymaphint
    class ControlContainer extends ymaps3.YMapGroupEntity<any> {
      _element?: Element;
      _detachDom?: DomDetach;

      override _onAttach() {
        this._element = element;
        this._detachDom = ymaps3.useDomContext(this, this._element, null);
      }

      override _onDetach() {
        if (this._detachDom) {
          this._detachDom();
        }

        this._detachDom = undefined;
      }
    }

    return new ControlContainer({});
  }
}
