# Map

Component for creating and managing a map

[Map](https://map-onload-event.stackblitz.io ':include :type=iframe height=550px')

## Usage

```html
<ya-map
  [center]="[55.751952, 37.600739]"
  [state]="{type: 'yandex#satellite'}"
></ya-map>
```

## Inputs

| Name    | Type         | Default | Required | Description               |
| ------- | ------------ | ------- | -------- | ------------------------- |
| center  | Number[]     |         | yes      | Map center geocoordinates |
| zoom    | Number       | 10      | no       | Map zoom level            |
| state   | [MapState]   |         | no       | States for the map        |
| options | [MapOptions] |         | no       | Options for the map       |

[scriptservice]: services/script.md
[mapstate]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Map__param-state
[mapoptions]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Map__param-options

## Outputs

| Name               | Type           | Inside the angular zone | Description                                                   |
| ------------------ | -------------- | ----------------------- | ------------------------------------------------------------- |
| ready              | [YaReadyEvent] | yes                     | Entity is added in root container                             |
| actionbegin        | [YaEvent]      | no                      | The start of a new smooth map movement                        |
| actionbreak        | [YaEvent]      | no                      | Event that occurs when an action step was prematurely stopped |
| actionend          | [YaEvent]      | no                      | The end of smooth map movement                                |
| actiontick         | [YaEvent]      | no                      | The start of a new step of smooth movement                    |
| actiontickcomplete | [YaEvent]      | no                      | The end of performing a step of smooth movement               |
| balloonclose       | [YaEvent]      | yes                     | Closing the balloon                                           |
| balloonopen        | [YaEvent]      | yes                     | Opening a balloon on a map                                    |
| boundschange       | [YaEvent]      | yes                     | Event for a change to the map viewport                        |
| yaclick            | [YaEvent]      | yes                     | Single left-click on the object                               |
| yacontextmenu      | [YaEvent]      | yes                     | Calls the element's context menu                              |
| yadblclick         | [YaEvent]      | yes                     | Double left-click on the object                               |
| destroy            | [YaEvent]      | yes                     | The map was destroyed                                         |
| hintclose          | [YaEvent]      | yes                     | Closing the hint                                              |
| hintopen           | [YaEvent]      | yes                     | Opening a hint on a map                                       |
| marginchange       | [YaEvent]      | yes                     | Map margins changed                                           |
| yamousedown        | [YaEvent]      | yes                     | Pressing the mouse button over the object                     |
| yamouseenter       | [YaEvent]      | no                      | Pointing the cursor at the object                             |
| yamouseleave       | [YaEvent]      | no                      | Moving the cursor off of the object                           |
| yamousemove        | [YaEvent]      | no                      | Moving the cursor over the object                             |
| yamouseup          | [YaEvent]      | no                      | Letting go of the mouse button over an object                 |
| multitouchend      | [YaEvent]      | no                      | End of multitouch                                             |
| multitouchmove     | [YaEvent]      | no                      | Repeating event during multitouch                             |
| multitouchstart    | [YaEvent]      | no                      | Start of multitouch                                           |
| optionschange      | [YaEvent]      | yes                     | Map options changed                                           |
| sizechange         | [YaEvent]      | yes                     | Map size changed                                              |
| typechange         | [YaEvent]      | yes                     | The map type changed                                          |
| yawheel            | [YaEvent]      | yes                     | Mouse wheel scrollin                                          |

[yareadyevent]: interfaces/ya-ready-event.md
[yaevent]: interfaces/event.md

## ContentChildren

- [Placemark](directives/placemark.md)
- [GeoObject](directives/geoobject.md)
- [MultiRoute](directives/multiroute.md)
- [Control](directives/control.md)

## Source

- [lib/components/ya-map](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/components/ya-map)
- [jsapi/doc/2.1/ref/reference/Map.html](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Map.html/)
