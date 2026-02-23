# YMapComponent


This component wraps the [ymaps3.YMap](https://yandex.com/maps-api/docs/js-api/map/YMap.html) class from the Yandex.Maps API.
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


## Example
[filename](https://stackblitz.com/edit/create-a-map-v3?embed=1&view=preview ':include :type=iframe width=100% height=650px')

## Inputs
| Name     | Description                                                                      | Type                            | API Reference                                                                  |
| -------- | -------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------ |
| children |   See the API entity documentation for detailed information.                     | YMapEntity\<unknown, object\>[] | —                                                                              |
| props    |   See the API entity documentation for detailed information. Supports updates.   | YMapProps                       | [YMap.html#props](https://yandex.com/maps-api/docs/js-api/map/YMap.html#props) |

## Outputs
| Name  | Description                                                                 | Type                                | API Reference |
| ----- | --------------------------------------------------------------------------- | ----------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter\<YReadyEvent\<YMap\>\> | —             |