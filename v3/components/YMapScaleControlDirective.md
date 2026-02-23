# YMapScaleControlDirective


This component wraps the [ymaps3.YMapScaleControl](https://yandex.com/maps-api/docs/js-api/object/controls/YMapScaleControl.html) class from the Yandex.Maps API.
All component inputs are named the same as the API class constructor arguments. This component must be used inside a `y-map-controls` component.

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

  <y-map-controls [props]="{ position: 'top' }">
    <y-map-scale-control />
  </y-map-controls>
</y-map>
```




## Inputs
| Name  | Description                                                                          | Type                  | API Reference                                                                                                      |
| ----- | ------------------------------------------------------------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| props |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapScaleControlProps | [YMapScaleControl.html#props](https://yandex.com/maps-api/docs/js-api/object/controls/YMapScaleControl.html#props) |

## Outputs
| Name  | Description                                                                 | Type                                            | API Reference |
| ----- | --------------------------------------------------------------------------- | ----------------------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter\<YReadyEvent\<YMapScaleControl\>\> | —             |