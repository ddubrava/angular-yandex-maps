# Map

Component for creating and managing a map

## Usage

```html
<ya-map [center]="[55.751952, 37.600739]" [state]="{type: 'yandex#satellite'}"></ya-map>
```

## Inputs

| Name         | Type         | Default | Required | Description                                                                            |
|--------------|--------------|---------|----------|----------------------------------------------------------------------------------------|
| onlyInstance | Boolean      | false   | no       | @deprecated, use [ScriptService] // Map will not be created, only returns [ILoadEvent] |
| center       | Number[]     |         | yes      | Map center geocoordinates                                                              |
| zoom         | Number       | 10      | no       | Map zoom level                                                                         |
| state        | [MapState]   |         | no       | States for the map                                                                     |
| options      | [MapOptions] |         | no       | Options for the map                                                                    |

[ScriptService]: services/script.md
[MapState]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Map__param-state
[MapOptions]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#Map__param-options

## Outputs

| Name       | Type         | Supported event type                                  | Description                                                    |
|------------|--------------|-------------------------------------------------------|----------------------------------------------------------------|
| load       | [ILoadEvent] |                                                       | Emits immediately after this entity is added in root container |
| action     | [IEvent]     | actionbegin, actionend                                | Smooth map movement                                            |
| balloon    | [IEvent]     | balloonopen, balloonclose                             | Actions with the balloon                                       |
| yaclick    | [IEvent]     | click, dblclick                                       | Left-click on the object                                       |
| hint       | [IEvent]     | hintopen, hintclose                                   | Actions with the hint                                          |
| mouse      | [IEvent]     | mousedown, mouseenter, mouseleave, mousemove, mouseup | Mouse actions with the object                                  |
| multitouch | [IEvent]     | multitouchstart, multitouchmove, multitouchend        | Multitouch actions with the object                             |

[ILoadEvent]: https://github.com/ddubrava/angular8-yandex-maps/blob/develop/projects/angular8-yandex-maps/src/lib/models/models.ts#L23
[IEvent]: https://github.com/ddubrava/angular8-yandex-maps/blob/develop/projects/angular8-yandex-maps/src/lib/models/models.ts#L34

## ContentChildren
- [Placemark](components/placemark.md)
- [GeoObject](components/geoobject.md)
- [MultiRoute](components/multiroute.md)
- [Controls](components/controls.md)
