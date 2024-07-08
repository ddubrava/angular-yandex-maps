# YMapDefaultMarkerDirective


This component wraps the [ymaps3.YMapDefaultMarker](https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/markers/#class-ymapdefaultmarker) class from the Yandex.Maps API.
It's a `@yandex/ymaps3-markers@0.0.1` package that is asynchronously loaded once you use this component.
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
| Name  | Description                              | Type                   | API Reference                                                                                                |
| ----- | ---------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| props |   Marker properties. Supports changes.   | YMapDefaultMarkerProps | [#YMapDefaultMarkerProps](https://yandex.ru/dev/jsapi30/doc/en/ref/packages/markers/#YMapDefaultMarkerProps) |

## Outputs
| Name  | Description                                                                 | Type                                         | API Reference |
| ----- | --------------------------------------------------------------------------- | -------------------------------------------- | ------------- |
| ready |   The marker instance is created. This event runs outside an Angular zone.  | EventEmitter<YReadyEvent<YMapDefaultMarker>> | —             |