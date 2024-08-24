# YMapClustererDirective


This component wraps the [ymaps3.YMapClusterer](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/clusterer/#class-ymapclusterer) class from the Yandex.Maps API.
All component inputs are named the same as the API class constructor arguments.
This component is from the `@yandex/ymaps3-clusterer@0.0.1` package, which is asynchronously loaded when you use this component.

The Yandex.Maps class is quite challenging, so I recommend checking the official documentation.
The component encapsulates some logic, making the class easier to use.
It remains fully customizable, and you can replicate the entire code from the official example.

The Yandex.Maps class accepts `cluster` and `marker` callbacks that should return HTML for the elements
You can achieve the same behavior using this component in two ways:

1. Pass cluster and marker to props and write completely custom logic. This is the same process that the library handles internally.
2. Use <ng-template #cluster let-context> and <ng-template #marker let-context>, where the HTML from the templates is passed to YMapMarker.

When using templates, you can access arguments from the callback through the `$implicit` variable.

To define markers, you do not need to create the markers themselves; instead, you need to pass a `Feature[]`.
The official example creates an array of coordinates and maps it to the features array.

The clustering method is `clusterByGrid({ gridSize: 64 })` by default, but you can override it and other options by passing them to `props`.

```html
<y-map
  [props]="{
    location: {
      center: [-0.127696, 51.507351],
      zoom: 10,
    },
  }"
>
  <y-map-default-scheme-layer />
  <y-map-default-features-layer />

  <!-- Define your coordinates in the component and map them to Feature[] -->
  <y-map-clusterer
    [props]="{
      features: [
        {
          type: 'Feature',
          id: '0',
          geometry: {
            type: 'Point',
            coordinates: [-0.597696, 51.907351],
          },
        },
      ],
    }"
  >
    <ng-template #marker let-context>
      <!-- Your custom HTML for a point/marker -->
      <img src="./pin.svg" />
    </ng-template>

    <ng-template #cluster let-context>
      <!-- Your custom HTML for a clusterer point/marker -->
      {{ context.features.length }}
    </ng-template>
  </y-map-clusterer>
</y-map>
```




## Inputs
| Name  | Description                                                                                                             | Type                                                                | API Reference                                                                                          |
| ----- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| props |   Read the component description and see the API entity documentation for detailed information. Supports ngOnChanges.   | Optional\<YMapClustererProps \| "marker" \| "cluster" \| "method"\> | [#YMapClustererProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/clusterer/#YMapClustererProps) |

## Outputs
| Name  | Description                                                                 | Type                                         | API Reference |
| ----- | --------------------------------------------------------------------------- | -------------------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter\<YReadyEvent\<YMapClusterer\>\> | —             |