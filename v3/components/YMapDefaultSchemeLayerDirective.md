# YMapDefaultSchemeLayerDirective


This component wraps the [ymaps3.YMapDefaultSchemeLayer](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymapdefaultschemelayer) class from the Yandex.Maps API.
All class constructor arguments are component inputs.
The component implements `OnChanges` and supports inputs updates.

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
</y-map>
```




## Inputs
| Name     | Description                                              | Type                        | API Reference                                                                                         |
| -------- | -------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------- |
| children |                                                          |                             | —                                                                                                     |
| options  |                                                          |                             | —                                                                                                     |
| props    |   YMapDefaultSchemeLayer properties. Supports updates.   | YMapDefaultSchemeLayerProps | [#YMapDefaultSchemeLayerProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapDefaultSchemeLayerProps) |

## Outputs
| Name  | Description                                                                | Type                                              | API Reference |
| ----- | -------------------------------------------------------------------------- | ------------------------------------------------- | ------------- |
| ready |   The layer instance is created. This event runs outside an Angular zone.  | EventEmitter<YReadyEvent<YMapDefaultSchemeLayer>> | —             |