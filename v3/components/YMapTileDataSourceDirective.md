# YMapTileDataSourceDirective


This component wraps the [ymaps3.YMapTileDataSource](https://yandex.com/maps-api/docs/js-api/object/data-source/YMapTileDataSource.html) class from the Yandex.Maps API.
All component inputs are named the same as the API class constructor arguments.

```html
<y-map
  [props]="{
    location: {
      center: [-0.127696, 51.507351],
      zoom: 14,
    },
  }"
>
  <y-map-tile-data-source
    [props]="{
      id: 'urlSource',
      raster: {
        type: 'tiles',
        fetchTile: 'https://sitename.com/?x={{x}}&y={{y}}&z={{z}}&scale={{scale}}',
      },
    }"
  />
</y-map>
```




## Inputs
| Name  | Description                                                                          | Type                    | API Reference                                                                                                             |
| ----- | ------------------------------------------------------------------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| props |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapTileDataSourceProps | [YMapTileDataSource.html#props](https://yandex.com/maps-api/docs/js-api/object/data-source/YMapTileDataSource.html#props) |

## Outputs
| Name  | Description                                                                 | Type                                              | API Reference |
| ----- | --------------------------------------------------------------------------- | ------------------------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter\<YReadyEvent\<YMapTileDataSource\>\> | —             |