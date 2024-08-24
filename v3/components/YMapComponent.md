# YMapComponent


This component wraps the [ymaps3.YMap](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymap) class from the Yandex.Maps API.
All component inputs are named the same as the API class constructor arguments.

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
| Name     | Description                                                                      | Type                     | API Reference                                                     |
| -------- | -------------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------- |
| children |   See the API entity documentation for detailed information.                     | YMapEntity\<, object\>[] | —                                                                 |
| props    |   See the API entity documentation for detailed information. Supports updates.   | YMapProps                | [#YMapProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapProps) |

## Outputs
| Name  | Description                                                                 | Type                                | API Reference |
| ----- | --------------------------------------------------------------------------- | ----------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter\<YReadyEvent\<YMap\>\> | —             |