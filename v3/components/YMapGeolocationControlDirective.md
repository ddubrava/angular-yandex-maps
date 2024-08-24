# YMapGeolocationControlDirective


This component wraps the [ymaps3.YMapGeolocationControl](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/controls/#class-ymapgeolocationcontrol) class from the Yandex.Maps API.
All component inputs are named the same as the API class constructor arguments. This component must be used inside a `y-map-controls` component.
This component is from the `@yandex/ymaps3-controls@0.0.1` package, which is asynchronously loaded when you use this component.

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
    <y-map-geolocation-control />
  </y-map-controls>
</y-map>
```




## Inputs
| Name  | Description                                                                          | Type                        | API Reference                                                                                                           |
| ----- | ------------------------------------------------------------------------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| props |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapGeolocationControlProps | [#YMapGeolocationControlProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/controls/#YMapGeolocationControlProps) |

## Outputs
| Name  | Description                                                                 | Type                                                  | API Reference |
| ----- | --------------------------------------------------------------------------- | ----------------------------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter\<YReadyEvent\<YMapGeolocationControl\>\> | —             |