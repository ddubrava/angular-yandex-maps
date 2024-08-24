# YMapDefaultMarkerDirective


This component wraps the [ymaps3.YMapDefaultMarker](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/markers/#class-ymapdefaultmarker) class from the Yandex.Maps API.
All component inputs are named the same as the API class constructor arguments.
This component is from the `@yandex/ymaps3-markers@0.0.1` package, which is asynchronously loaded when you use this component.

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
  <y-map-default-features-layer />

  <y-map-default-marker
    [props]="{
      coordinates: [-0.127696, 51.507351],
      title: 'Hello World!',
      subtitle: 'kind and bright',
      color: 'blue',
    }"
  />
</y-map>
```




## Inputs
| Name  | Description                                                                          | Type                   | API Reference                                                                                                |
| ----- | ------------------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| props |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapDefaultMarkerProps | [#YMapDefaultMarkerProps](https://yandex.ru/dev/jsapi30/doc/en/ref/packages/markers/#YMapDefaultMarkerProps) |

## Outputs
| Name  | Description                                                                 | Type                                             | API Reference |
| ----- | --------------------------------------------------------------------------- | ------------------------------------------------ | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter\<YReadyEvent\<YMapDefaultMarker\>\> | —             |