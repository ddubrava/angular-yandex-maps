# Panorama

Component for creating and controlling the panorama player

## Usage

```html
<ya-panorama [point]="[59.938557, 30.316198]" layer="yandex#airPanorama"></ya-panorama>
```

## Inputs

| Name    | Type                                  | Default         | Required | Description                                  |
|---------|---------------------------------------|-----------------|----------|----------------------------------------------|
| point   | Number[]                              |                 | yes      | The point for searching for nearby panoramas |
| layer   | yandex#panorama or yandex#airPanorama | yandex#panorama | no       | The layer to search for panoramas            |
| options | [PlayerOptions]                       |                 | no       | Options for the player                       |

[PlayerOptions]:https://tech.yandex.com/maps/jsapi/doc/2.1/ref/reference/panorama.Player-docpage/#panorama.Player__param-options

## Outputs

All events execute within the Angular zone

| Name       | Type         | Supported event type                                             | Description                                                    |
|------------|--------------|------------------------------------------------------------------|----------------------------------------------------------------|
| load       | [ILoadEvent] |                                                                  | Emits immediately after this entity is added in root container |
| direction  | [IEvent]     | directionchange                                                  | The view direction changed                                     |
| fullscreen | [IEvent]     | fullscreenenter, fullscreenexit                                  | The panorama player screen mode is switched                    |
| marker     | [IEvent]     | markercollapse, markerexpand, markermouseenter, markermouseleave | Actions with the marker                                        |


[ILoadEvent]: interfaces/load-event.md
[IEvent]: interfaces/event.md

## Examples

- [Panorama](https://stackblitz.com/edit/panorama)

## Source

[lib/components/ya-panorama](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/components/ya-panorama)
