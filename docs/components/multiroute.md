# Multiroute

Component for creating Multi-route on the map

## Usage

```html
<ya-map [center]="[55.761952, 37.620739]">
  <ya-multiroute
    [referencePoints]="[[55.751952, 37.600739], 'Красные ворота, Москва']"
  ></ya-multiroute>
</ya-map>
```

## Inputs

| Name            | Type                                                   | Default | Required | Description                                                      |
| --------------- | ------------------------------------------------------ | ------- | -------- | ---------------------------------------------------------------- |
| referencePoints | [IMultiRouteReferencePoint][][]                        |         | yes      | Reference points for the multi-route                             |
| model           | [multiRouter.MultiRouteModel] or [MultiRouteModelJson] |         | no       | The data model of a multi-route, or the model description object |
| options         | [MultiRouteOptions]                                    |         | no       | Options for the multiroute                                       |

[imultiroutereferencepoint]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteReferencePoint-docpage/
[multirouter.multiroutemodel]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRouteModel-docpage/
[multiroutemodeljson]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteModelJson-docpage/
[multirouteoptions]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute-docpage/#multiRouter.MultiRoute__param-options

## Outputs

All events execute within the Angular zone

| Name              | Type         | Supported event type                                  | Description                                                    |
| ----------------- | ------------ | ----------------------------------------------------- | -------------------------------------------------------------- |
| load              | [ILoadEvent] |                                                       | Emits immediately after this entity is added in root container |
| activeroutechange | [IEvent]     | activeroutechange                                     | Change to the active route                                     |
| balloon           | [IEvent]     | balloonopen, balloonclose                             | Actions with the balloon                                       |
| yaclick           | [IEvent]     | click, dblclick                                       | Left-click on the object                                       |
| mouse             | [IEvent]     | mousedown, mouseenter, mouseleave, mousemove, mouseup | Mouse actions with the object                                  |
| multitouch        | [IEvent]     | multitouchstart, multitouchmove, multitouchend        | Multitouch actions with the object                             |

[iloadevent]: interfaces/load-event.md
[ievent]: interfaces/event.md

## Examples

- [Building a driving multiroute](https://stackblitz.com/edit/multiroute)
- [Building a pedestrian multiroute](https://stackblitz.com/edit/multiroute-pedestrian)

## Source

[lib/components/ya-multiroute](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/components/ya-multiroute)
