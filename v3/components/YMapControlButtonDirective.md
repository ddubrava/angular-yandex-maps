# YMapControlButtonDirective


This component wraps the [ymaps3.YMapControlButton](https://yandex.ru/dev/jsapi30/doc/ru/ref/#class-ymapcontrolbutton) class from the Yandex.Maps API.
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
    <y-map-control-button [props]="{ text: 'Hello' }" />
  </y-map-controls>
</y-map>
```




## Inputs
| Name    | Description                                                                          | Type                         | API Reference                                                                                           |
| ------- | ------------------------------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| options |   See the API entity documentation for detailed information.                         | ComplexOptions\<YMap\>       | —                                                                                                       |
| props   |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapControlCommonButtonProps | [#YMapControlCommonButtonProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapControlCommonButtonProps) |

## Outputs
| Name  | Description                                                                 | Type                                             | API Reference |
| ----- | --------------------------------------------------------------------------- | ------------------------------------------------ | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter\<YReadyEvent\<YMapControlButton\>\> | —             |