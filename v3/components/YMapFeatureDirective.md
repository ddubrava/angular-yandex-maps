# YMapFeatureDirective


This component wraps the [ymaps3.YMapFeature](https://yandex.ru/dev/jsapi30/doc/en/ref/#class-ymapfeature) class from the Yandex.Maps API.
All component inputs are named the same as the API class constructor arguments.

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
| Name  | Description                                                                          | Type             | API Reference                                                                   |
| ----- | ------------------------------------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------- |
| props |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapFeatureProps | [#YMapFeatureProps](https://yandex.ru/dev/jsapi30/doc/en/ref/#YMapFeatureProps) |

## Outputs
| Name  | Description                                                                 | Type                                   | API Reference |
| ----- | --------------------------------------------------------------------------- | -------------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter<YReadyEvent<YMapFeature>> | —             |