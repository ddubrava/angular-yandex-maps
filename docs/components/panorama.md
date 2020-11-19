# Panorama

Component for creating and controlling the panorama player

## Usage

```html
<ya-panorama
  [point]="[59.938557, 30.316198]"
  layer="yandex#airPanorama"
></ya-panorama>
```

## Inputs

| Name    | Type                                  | Default         | Required | Description                                  |
| ------- | ------------------------------------- | --------------- | -------- | -------------------------------------------- |
| point   | Number[]                              |                 | yes      | The point for searching for nearby panoramas |
| layer   | yandex#panorama \| yandex#airPanorama | yandex#panorama | no       | The layer to search for panoramas            |
| options | [PlayerOptions]                       |                 | no       | Options for the player                       |

[playeroptions]: https://tech.yandex.com/maps/jsapi/doc/2.1/ref/reference/panorama.Player-docpage/#panorama.Player__param-options

## Outputs

| Name             | Type           | Inside the angular zone | Description                                                                             |
| ---------------- | -------------- | ----------------------- | --------------------------------------------------------------------------------------- |
| ready            | [YaReadyEvent] | yes                     | Entity is added in root container                                                       |
| destroy          | [YaEvent]      | yes                     | The player was closed by the user or destroyed using the panorama.Player.destroy method |
| directionchange  | [YaEvent]      | yes                     | The view direction changed                                                              |
| yaerror          | [YaEvent]      | yes                     | An error occurred during operation of the player                                        |
| fullscreenenter  | [YaEvent]      | yes                     | The panorama player switched to full-screen mode                                        |
| fullscreenexit   | [YaEvent]      | yes                     | The panorama player exited full-screen mode                                             |
| markercollapse   | [YaEvent]      | yes                     | The user clicked on an expanded marker                                                  |
| markerexpand     | [YaEvent]      | yes                     | The user clicked on a collapsed marker                                                  |
| markermouseenter | [YaEvent]      | yes                     | The user's cursor hovered over a marker                                                 |
| markermouseleave | [YaEvent]      | yes                     | The user's cursor left a marker                                                         |
| panoramachange   | [YaEvent]      | yes                     | The open panorama changed                                                               |
| spanchange       | [YaEvent]      | yes                     | The size of the viewport has been changed                                               |

[yareadyevent]: interfaces/ya-ready-event.md
[yaevent]: interfaces/event.md

## Examples

- [Panorama](https://stackblitz.com/edit/panorama)

## Source

- [lib/components/ya-panorama](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/components/ya-panorama)
- [jsapi/doc/2.1/ref/reference/panorama.Player.html](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html/)
