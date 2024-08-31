# YaPanoramaDirective


The `ya-panorama` component wraps `ymaps.panorama.Player` class from the Yandex.Maps API.
You can configure it via the component's inputs.
Events can be bound using the outputs of the component.

```html
<ya-map>
  <ya-panorama [point]="[59.938557, 30.316198]" layer="yandex#airPanorama"></ya-panorama>
</ya-map>
```




## Inputs
| Name    | Description                                       | Type                          | API Reference                                                                                                                                                                  |
| ------- | ------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| layer   |   The layer to search for panoramas.              | ymaps.panorama.Layer          | [panorama.locate.html#panorama.locate__param-options.layer](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.locate.html#panorama.locate__param-options.layer) |
| options |   Player options.                                 | ymaps.panorama.IPlayerOptions | [panorama.Player.html#panorama.Player__param-options](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#panorama.Player__param-options)             |
| point   |   The point for searching for nearby panoramas.   | number[]                      | [panorama.locate.html#panorama.locate__param-point](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.locate.html#panorama.locate__param-point)                 |

## Outputs
| Name             | Description                                                                                          | Type                                                  | API Reference                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| destroy          |   The player was closed by the user or destroyed using the panorama.Player.destroy method.           | Observable\<YaEvent\<ymaps.panorama.Player\>\>        | [panorama.Player.html#event_detail__event-destroy](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-destroy)                   |
| directionchange  |   The view direction changed.                                                                        | Observable\<YaEvent\<ymaps.panorama.Player\>\>        | [panorama.Player.html#event_detail__event-directionchange](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-directionchange)   |
| fullscreenenter  |   The panorama player switched to full-screen mode.                                                  | Observable\<YaEvent\<ymaps.panorama.Player\>\>        | [panorama.Player.html#event_detail__event-fullscreenenter](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-fullscreenenter)   |
| fullscreenexit   |   The panorama player exited full-screen mode.                                                       | Observable\<YaEvent\<ymaps.panorama.Player\>\>        | [panorama.Player.html#event_detail__event-fullscreenexit](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-fullscreenexit)     |
| markercollapse   |   The user clicked on an expanded marker.                                                            | Observable\<YaEvent\<ymaps.panorama.Player\>\>        | [panorama.Player.html#event_detail__event-markercollapse](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-markercollapse)     |
| markerexpand     |   The user clicked on a collapsed marker.                                                            | Observable\<YaEvent\<ymaps.panorama.Player\>\>        | [panorama.Player.html#event_detail__event-markerexpand](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-markerexpand)         |
| markermouseenter |   The user's cursor hovered over a marker.                                                           | Observable\<YaEvent\<ymaps.panorama.Player\>\>        | [panorama.Player.html#event_detail__event-markermouseenter](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-markermouseenter) |
| markermouseleave |   The user's cursor left a marker.                                                                   | Observable\<YaEvent\<ymaps.panorama.Player\>\>        | [panorama.Player.html#event_detail__event-markermouseleave](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-markermouseleave) |
| panoramachange   |   The open panorama changed.                                                                         | Observable\<YaEvent\<ymaps.panorama.Player\>\>        | [panorama.Player.html#event_detail__event-panoramachange](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-panoramachange)     |
| ready            |   Panorama instance is created. This event runs outside an Angular zone.                             | EventEmitter\<YaReadyEvent\<ymaps.panorama.Player\>\> | —                                                                                                                                                                              |
| spanchange       |   The size of the viewport has been changed.                                                         | Observable\<YaEvent\<ymaps.panorama.Player\>\>        | [panorama.Player.html#event_detail__event-spanchange](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-spanchange)             |
| yaerror          |   An error occurred during operation of the player. The user will be shown the appropriate screen.   | Observable\<YaEvent\<ymaps.panorama.Player\>\>        | [panorama.Player.html#event_detail__event-error](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html#event_detail__event-error)                       |