# YMapFeatureDataSourceDirective


This component wraps the [ymaps3.YMapFeatureDataSource](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymapfeaturedatasource) class from the Yandex.Maps API.
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
  <y-map-feature-data-source [props]="{ id: 'clusterer-source' }" />
</y-map>
```




## Inputs
| Name  | Description                                                                          | Type                       | API Reference                                                                                       |
| ----- | ------------------------------------------------------------------------------------ | -------------------------- | --------------------------------------------------------------------------------------------------- |
| props |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapFeatureDataSourceProps | [#YMapFeatureDataSourceProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapFeatureDataSourceProps) |

## Outputs
| Name  | Description                                                                 | Type                                                 | API Reference |
| ----- | --------------------------------------------------------------------------- | ---------------------------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter\<YReadyEvent\<YMapFeatureDataSource\>\> | —             |