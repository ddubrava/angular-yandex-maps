# YMapListenerDirective


This component wraps the [ymaps3.YMapListener](https://yandex.ru/dev/jsapi30/doc/en/ref/#class-ymaplistener) class from the Yandex.Maps API.
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
  <y-map-default-scheme-layer />

  <y-map-listener
    [props]="{
      onClick: onClick,
    }"
  />
</y-map>
```




## Inputs
| Name  | Description                                                                          | Type              | API Reference                                                                     |
| ----- | ------------------------------------------------------------------------------------ | ----------------- | --------------------------------------------------------------------------------- |
| props |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapListenerProps | [#YMapListenerProps](https://yandex.ru/dev/jsapi30/doc/en/ref/#YMapListenerProps) |

## Outputs
| Name  | Description                                                                 | Type                                    | API Reference |
| ----- | --------------------------------------------------------------------------- | --------------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter<YReadyEvent<YMapListener>> | —             |