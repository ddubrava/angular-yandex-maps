# YMapMarkerDirective


This component wraps the [ymaps3.YMapMarker](https://yandex.com/maps-api/docs/js-api/object/markers/YMapMarker.html) class from the Yandex.Maps API.
All component inputs are named the same as the API class constructor arguments. `YMapMarker['element']` can only be projected, see the example below.

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
  <y-map-default-features-layer />

  <y-map-marker
    [props]="{
      coordinates: [-0.127696, 51.507351],
      draggable: true,
    }"
  >
    <img
      width="64"
      height="64"
      style="border-radius: 50%"
      src="https://cdn.openart.ai/published/nI5hC8sFzqKnKbJtW1hA/ExVfxYNJ_E0Yh_256.webp"
      alt="Bulldog"
    />
  </y-map-marker>
</y-map>
```




## Inputs
| Name  | Description                                                                          | Type            | API Reference                                                                                         |
| ----- | ------------------------------------------------------------------------------------ | --------------- | ----------------------------------------------------------------------------------------------------- |
| props |   See the API entity documentation for detailed information. Supports ngOnChanges.   | YMapMarkerProps | [YMapMarker.html#props](https://yandex.com/maps-api/docs/js-api/object/markers/YMapMarker.html#props) |

## Outputs
| Name  | Description                                                                 | Type                                      | API Reference |
| ----- | --------------------------------------------------------------------------- | ----------------------------------------- | ------------- |
| ready |   The entity instance is created. This event runs outside an Angular zone.  | EventEmitter\<YReadyEvent\<YMapMarker\>\> | —             |