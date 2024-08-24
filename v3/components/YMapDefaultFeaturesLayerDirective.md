# YMapDefaultFeaturesLayerDirective


This component wraps the [ymaps3.YMapDefaultFeaturesLayer](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymapdefaultfeatureslayer) class from the Yandex.Maps API.
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
  <y-map-default-features-layer />
</y-map>
```




## Inputs
| Name    | Description                                                                          | Type                          | API Reference                                                                                             |
| ------- | ------------------------------------------------------------------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| options |   See the API entity documentation for detailed information.                         | ComplexOptions\<YMap\>        | —                                                                                                         |
| props   |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapDefaultFeaturesLayerProps | [#YMapDefaultFeaturesLayerProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapDefaultFeaturesLayerProps) |

## Outputs
| Name  | Description                                                                 | Type                                                    | API Reference |
| ----- | --------------------------------------------------------------------------- | ------------------------------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter\<YReadyEvent\<YMapDefaultFeaturesLayer\>\> | —             |