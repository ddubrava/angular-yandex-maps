# YMapMarkerDirective


This component wraps the [ymaps3.YMapMarker](https://yandex.ru/dev/jsapi30/doc/en/ref/#class-ymapmarker) class from the Yandex.Maps API.
All class constructor arguments are component inputs. `YMapMarker['element']` can only be projected, see the example below.
The component implements `OnChanges` and supports inputs updates.

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
| Name  | Description                              | Type            | API Reference                                                                 |
| ----- | ---------------------------------------- | --------------- | ----------------------------------------------------------------------------- |
| props |   Marker properties. Supports changes.   | YMapMarkerProps | [#YMapMarkerProps](https://yandex.ru/dev/jsapi30/doc/ru/ref/#YMapMarkerProps) |

## Outputs
| Name  | Description                                                                   | Type                                  | API Reference |
| ----- | ----------------------------------------------------------------------------- | ------------------------------------- | ------------- |
| ready |   The listener instance is created. This event runs outside an Angular zone.  | EventEmitter<YReadyEvent<YMapMarker>> | —             |