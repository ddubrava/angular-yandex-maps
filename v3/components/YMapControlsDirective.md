# YMapControlsDirective


This component wraps the [ymaps3.YMapControls](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymapcontrols) class from the Yandex.Maps API.
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

  <y-map-controls [props]="{ position: 'top' }">
    ...
  </y-map-controls>
</y-map>
```




## Inputs
| Name     | Description                                                   | Type                   | API Reference                                                                     |
| -------- | ------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------- |
| children |   See the API entity documentation for detailed information.  | YMapEntity<, object>[] | —                                                                                 |
| props    |   Controls properties. Supports ngOnChanges.                  | YMapControlsProps      | [#YMapControlsProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapControlsProps) |

## Outputs
| Name  | Description                                                                 | Type                                    | API Reference |
| ----- | --------------------------------------------------------------------------- | --------------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter<YReadyEvent<YMapControls>> | —             |