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

All events except 'mouse', 'multitouch' execute within the Angular zone

| Name       | Type         | Supported event type                                  | Description                                                    |
| ---------- | ------------ | ----------------------------------------------------- | -------------------------------------------------------------- |
| ready      | [ILoadEvent] |                                                       | Emits immediately after this entity is added in root container |
| action     | [IEvent]     | actionbegin, actionend                                | Smooth map movement                                            |
| balloon    | [IEvent]     | balloonopen, balloonclose                             | Actions with the balloon                                       |
| yaclick    | [IEvent]     | click, dblclick                                       | Left-click on the object                                       |
| hint       | [IEvent]     | hintopen, hintclose                                   | Actions with the hint                                          |
| mouse      | [IEvent]     | mousedown, mouseenter, mouseleave, mousemove, mouseup | Mouse actions with the object                                  |
| multitouch | [IEvent]     | multitouchstart, multitouchmove, multitouchend        | Multitouch actions with the object                             |

[iloadevent]: interfaces/load-event.md
[ievent]: interfaces/event.md

## ContentChildren

- [Placemark](directives/placemark.md)
- [GeoObject](directives/geoobject.md)
- [MultiRoute](directives/multiroute.md)
- [Controls](directives/controls.md)

## Source

- [lib/components/ya-map](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/components/ya-map)
- [jsapi/doc/2.1/ref/reference/Map.html](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Map.html/)
