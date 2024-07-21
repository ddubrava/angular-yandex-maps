# YMapLayerDirective


This component wraps the [ymaps3.YMapLayer](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymaplayer) class from the Yandex.Maps API.
All component inputs are named the same as the API class constructor arguments.

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

  <y-map-layer
    [props]="{
      type: 'markers',
      zIndex: 1800,
    }"
  />
</y-map>
```




## Inputs
| Name  | Description                                                                          | Type           | API Reference                                                               |
| ----- | ------------------------------------------------------------------------------------ | -------------- | --------------------------------------------------------------------------- |
| props |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapLayerProps | [#YMapLayerProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapLayerProps) |

## Outputs
| Name  | Description                                                                 | Type                                 | API Reference |
| ----- | --------------------------------------------------------------------------- | ------------------------------------ | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter<YReadyEvent<YMapLayer>> | —             |