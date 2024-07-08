# YMapComponent


This component wraps the [ymaps3.YMap](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymap) class from the Yandex.Maps API.
All class constructor arguments are component inputs.
The component implements `OnChanges` and supports inputs updates.

```html
<y-map
  [props]="{
    location: {
      center: [-0.127696, 51.507351],
      zoom: 10,
    },
    theme: 'dark',
  }"
>
  <y-map-default-scheme-layer />
</y-map>
```




## Inputs
| Name     | Description                           | Type                   | API Reference                                                     |
| -------- | ------------------------------------- | ---------------------- | ----------------------------------------------------------------- |
| children |                                       | YMapEntity<, object>[] | —                                                                 |
| props    |   Map properties. Supports updates.   | YMapProps              | [#YMapProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapProps) |

## Outputs
| Name  | Description                                                              | Type                            | API Reference |
| ----- | ------------------------------------------------------------------------ | ------------------------------- | ------------- |
| ready |   The map instance is created. This event runs outside an Angular zone.  | EventEmitter<YReadyEvent<YMap>> | —             |