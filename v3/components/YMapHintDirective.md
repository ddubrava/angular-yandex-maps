# YMapHintDirective


This component wraps the [ymaps3.YMapHint](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/hint/#class-ymaphint) class from the Yandex.Maps API.
All component inputs are named the same as the API class constructor arguments.
This component is from the `@yandex/ymaps3-hint@0.0.1` package, which is asynchronously loaded when you use this component.

The API of this component is complicated, but it's very close to what the official React wrapper suggests.
We strongly recommend reading and understanding the [official React example](https://yandex.ru/dev/jsapi30/doc/ru/examples/cases/hints) for this component.

In a nutshell, each entity (YMapFeature, YMapMarker, YMapHotspot) has a `properties` property, which is `Record<string, unknown>`.
When you define these components, you can pass any metadata to this property, which you can later access using `YMapHintProps['hint']`.
When you pass a callback to `YMapHintProps['hint']`, you can read the `properties` property and return the hint based on the metadata.
What you return from `YMapHintProps['hint']` will be available in `<ng-template />` (it's set via $implicit, so you can use any name for let-*).

```html
<y-map
  [props]="{
    location: {
      center: [-0.127696, 51.507351],
      zoom: 9,
    },
  }"
>
  <y-map-default-scheme-layer />
  <y-map-default-features-layer />

  <!-- onHint = (object?: YMapFeature | YMapMarker | YMapHotspot) => object?.properties?.['anyNameKey']; -->
  <!-- It accepts an entity on which a user hovered and returns a context, which is set to $implicit in ng-template. -->
  <!-- Your function can return anything since we have access to the returned value. -->
  <y-map-hint [props]="{ hint: onHint }">
    <ng-template let-context>
      <div
        style="
          background-color: #fff;
          border-radius: 6px;
          padding: 3px 6px 4px;
          margin-left: 15px;
        "
      >
        <!-- context.hint is the return value of onHint -->
        {{ context?.hint }}
      </div>
    </ng-template>
  </y-map-hint>

  <y-map-default-marker
    [props]="{
      coordinates: [-0.127696, 51.507351],
      properties: {
        anyNameKey: 'Central London',
      },
    }"
  />
</y-map>
```




## Inputs
| Name  | Description                                                                          | Type          | API Reference                                                                           |
| ----- | ------------------------------------------------------------------------------------ | ------------- | --------------------------------------------------------------------------------------- |
| props |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapHintProps | [#YMapHintProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/hint/#YMapHintProps) |

## Outputs
| Name  | Description                                                                 | Type                                | API Reference |
| ----- | --------------------------------------------------------------------------- | ----------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter<YReadyEvent<YMapHint>> | —             |