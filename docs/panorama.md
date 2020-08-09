# Panorama

Component for creating and controlling the panorama player

## Usage

```html
<ya-panorama [point]="[59.938557, 30.316198]" layer="yandex#airPanorama"></ya-panorama>
```

## Inputs

| Name    | Type                                  | Default | Required           | Description                                  |
|---------|---------------------------------------|---------|--------------------|----------------------------------------------|
| point   | Number[]                              |         | yes                | The point for searching for nearby panoramas |
| layer   | yandex#panorama or yandex#airPanorama |         | yandex#airPanorama | The layer to search for panoramas            |
| options | [PlayerOptions]                       |         | no                 | Options for the player                       |

[PlayerOptions]:https://tech.yandex.com/maps/jsapi/doc/2.1/ref/reference/panorama.Player-docpage/#panorama.Player__param-options

## Outputs

| Name       | Type         | Supported event type                                  | Description                                                    |
|------------|--------------|-------------------------------------------------------|----------------------------------------------------------------|
| load       | [ILoadEvent] |                                                       | Emits immediately after this entity is added in root container |
| baloon     | [IEvent]     | balloonopen, balloonclose                             | Actions with ballon                                            |
| yaclick    | [IEvent]     | click, dblclick                                       | Clicks on the object                                           |
| drag       | [IEvent]     | dragstart, dragend                                    | Placemark dragging                                             |
| hint       | [IEvent]     | hintopen, hintclose                                   | Action with hint                                               |
| mouse      | [IEvent]     | mousedown, mouseenter, mouseleave, mousemove, mouseup | Mouse actions over the object                                  |
| multitouch | [IEvent]     | multitouchstart, multitouchmove, multitouchend        | Multitouch actions over the object                             |

[ILoadEvent]: https://github.com/ddubrava/angular8-yandex-maps/blob/develop/projects/angular8-yandex-maps/src/lib/models/models.ts#L23
[IEvent]: https://github.com/ddubrava/angular8-yandex-maps/blob/develop/projects/angular8-yandex-maps/src/lib/models/models.ts#L34

## Examples

- [Panorama](https://stackblitz.com/edit/panorama)
