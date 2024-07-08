# YMapDefaultFeaturesLayerDirective


This component wraps the [ymaps3.YMapDefaultFeaturesLayer](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymapdefaultfeatureslayer) class from the Yandex.Maps API.
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
  <y-map-default-features-layer />
</y-map>
```




## Inputs
| Name     | Description                                                | Type                          | API Reference                                                                                             |
| -------- | ---------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| children |                                                            |                               | —                                                                                                         |
| options  |                                                            |                               | —                                                                                                         |
| props    |   YMapDefaultFeaturesLayer properties. Supports updates.   | YMapDefaultFeaturesLayerProps | [#YMapDefaultFeaturesLayerProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapDefaultFeaturesLayerProps) |

## Outputs
| Name  | Description                                                                | Type                                                | API Reference |
| ----- | -------------------------------------------------------------------------- | --------------------------------------------------- | ------------- |
| ready |   The layer instance is created. This event runs outside an Angular zone.  | EventEmitter<YReadyEvent<YMapDefaultFeaturesLayer>> | —             |