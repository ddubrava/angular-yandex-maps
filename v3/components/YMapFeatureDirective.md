# YMapFeatureDirective


This component wraps the [ymaps3.YMapFeature](https://yandex.ru/dev/jsapi30/doc/en/ref/#class-ymapfeature) class from the Yandex.Maps API.
All class constructor arguments are component inputs.
The component implements `OnChanges` and supports inputs updates.

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

  <y-map-feature
    [props]="{
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.557696, 51.727351],
            [0.302304, 51.727351],
            [0.302304, 51.237351],
            [-0.557696, 51.237351],
          ],
        ],
      },
      style: {
        stroke: [{ color: '#006efc', width: 4, dash: [5, 10] }],
        fill: 'rgba(56, 56, 219, 0.5)',
      },
    }"
  />
</y-map>
```




## Inputs
| Name  | Description                               | Type             | API Reference                                                                   |
| ----- | ----------------------------------------- | ---------------- | ------------------------------------------------------------------------------- |
| props |   Feature properties. Supports changes.   | YMapFeatureProps | [#YMapFeatureProps](https://yandex.ru/dev/jsapi30/doc/en/ref/#YMapFeatureProps) |

## Outputs
| Name  | Description                                                                  | Type                                   | API Reference |
| ----- | ---------------------------------------------------------------------------- | -------------------------------------- | ------------- |
| ready |   The feature instance is created. This event runs outside an Angular zone.  | EventEmitter<YReadyEvent<YMapFeature>> | —             |