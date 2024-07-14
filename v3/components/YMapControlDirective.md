# YMapControlDirective


This component wraps the [ymaps3.YMapControl](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymapcontrol) class from the Yandex.Maps API.
All component inputs are named the same as the API class constructor arguments. This component must be used inside a `y-map-controls` component.
Custom HTML can only be projected, see the example below.

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
    <y-map-control>
      <p>Custom HTML</p>
    </y-map-control>
  </y-map-controls>
</y-map>
```




## Inputs
| Name  | Description                                                                          | Type             | API Reference                                                                   |
| ----- | ------------------------------------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------- |
| props |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapControlProps | [#YMapControlProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapControlProps) |

## Outputs
| Name  | Description                                                                 | Type                                   | API Reference |
| ----- | --------------------------------------------------------------------------- | -------------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter<YReadyEvent<YMapControl>> | —             |