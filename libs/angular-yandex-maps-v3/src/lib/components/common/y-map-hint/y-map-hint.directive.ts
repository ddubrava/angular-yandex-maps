import {
  AfterContentInit,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { DomDetach } from '@yandex/ymaps3-types/imperative/DomContext';
import { YMapHint, YMapHintContext } from '@yandex/ymaps3-types/packages/hint';
import { from, Subject, takeUntil, tap } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { YMapHintProps } from '../../../types/y-map-hint-props';
import { YReadyEvent } from '../../../types/y-ready-event';
import { YMapComponent } from '../y-map/y-map.component';

/**
 * This component wraps the [ymaps3.YMapHint](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/hint/#class-ymaphint) class from the Yandex.Maps API.
 * All component inputs are named the same as the API class constructor arguments.
 * This component is from the `@yandex/ymaps3-hint@0.0.1` package, which is asynchronously loaded when you use this component.
 *
 * The API of this component is complicated, but it's very close to what the official React wrapper suggests.
 * We strongly recommend reading and understanding the [official React example](https://yandex.ru/dev/jsapi30/doc/ru/examples/cases/hints) for this component.
 *
 * In a nutshell, each entity (YMapFeature, YMapMarker, YMapHotspot) has a `properties` property, which is `Record<string, unknown>`.
 * When you define these components, you can pass any metadata to this property, which you can later access using `YMapHintProps['hint']`.
 * When you pass a callback to `YMapHintProps['hint']`, you can read the `properties` property and return the hint based on the metadata.
 * What you return from `YMapHintProps['hint']` will be available in `<ng-template />` (it's set via $implicit, so you can use any name for let-*).
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
 *   <!-- onHint = (object?: YMapFeature | YMapMarker | YMapHotspot) => object?.properties?.['anyNameKey']; -->
 *   <!-- It accepts an entity on which a user hovered and returns a context, which is set to $implicit in ng-template. -->
 *   <!-- Your function can return anything since we have access to the returned value. -->
 *   <y-map-hint [props]="{ hint: onHint }">
 *     <ng-template let-context>
 *       <div
 *         style="
 *           background-color: #fff;
 *           border-radius: 6px;
 *           padding: 3px 6px 4px;
 *           margin-left: 15px;
 *         "
 *       >
 *         <!-- context.hint is the return value of onHint -->
 *         {{ context?.hint }}
 *       </div>
 *     </ng-template>
 *   </y-map-hint>
 *
 *   <y-map-default-marker
 *     [props]="{
 *       coordinates: [-0.127696, 51.507351],
 *       properties: {
 *         anyNameKey: 'Central London',
 *       },
 *     }"
 *   />
 * </y-map>
 * ```
 */
@Directive({
  selector: 'y-map-hint',
  standalone: true,
})
export class YMapHintDirective implements AfterContentInit, OnChanges, OnDestroy {
  @ContentChild(TemplateRef) template?: TemplateRef<any>;

  private readonly destroy$ = new Subject<void>();

  private hint?: YMapHint;

  /**
   * See the API entity documentation for detailed information. Supports ngOnChanges.
   * {@link https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/hint/#YMapHintProps}
   */
  @Input({ required: true }) props!: YMapHintProps;

  /**
   * The entity instance is created. This event runs outside an Angular zone.
   */
  @Output() ready: EventEmitter<YReadyEvent<YMapHint>> = new EventEmitter<YReadyEvent<YMapHint>>();

  constructor(private readonly yMapComponent: YMapComponent) {}

  ngAfterContentInit() {
    this.yMapComponent.map$
      .pipe(
        filter(Boolean),
        switchMap((map) =>
          // It's safe to call it each time, the Yandex.Maps API handles multiple requests under the hood.
          from(ymaps3.import('@yandex/ymaps3-hint@0.0.1')).pipe(
            tap(({ YMapHint, YMapHintContext }) => {
              if (!this.template) {
                throw new Error(
                  'TemplateRef cannot be undefined. It must be projected to the component.',
                );
              }

              this.hint = new YMapHint(this.props);
              this.hint.addChild(this.createHintContainer(this.template, YMapHintContext));
              map.addChild(this.hint);
              this.ready.emit({ ymaps3, entity: this.hint });
            }),
          ),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.hint) {
      this.hint.update(changes['props'].currentValue);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * To render a hint, a container is required.
   * This method isolates all the container creation logic and returns the entity.
   */
  private createHintContainer(
    templateRef: TemplateRef<any>,
    _YMapHintContext: typeof YMapHintContext,
  ) {
    // The main logic is taken from the official documentation.
    // See https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/hint/#class-ymaphint
    class HintContainer extends ymaps3.YMapGroupEntity<any> {
      _element?: Element;
      _detachDom?: DomDetach;

      override _onAttach() {
        // Create a view with an empty context to get a basic HTML layout.
        const view = templateRef.createEmbeddedView({ $implicit: null });

        view.detectChanges();

        // Get the first node, which is inside <ng-template />
        this._element = view.rootNodes[0];

        if (!this._element) {
          throw new Error('TemplateRef cannot be empty. It must contain a node.');
        }

        this._detachDom = ymaps3.useDomContext(this, this._element, null);

        this._watchContext(
          _YMapHintContext,
          () => {
            // Provide the hint context to the <ng-template /> component.
            // This context can be either null, or { hint: any }.
            // The value inside the context depends on YMapHintProps['hint'] value.
            view.context.$implicit = this._consumeContext(_YMapHintContext);
            view.detectChanges();
          },
          { immediate: true },
        );
      }

      override _onDetach() {
        if (this._detachDom) {
          this._detachDom();
        }

        this._detachDom = undefined;
      }
    }

    return new HintContainer({});
  }
}
