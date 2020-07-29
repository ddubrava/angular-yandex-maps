# Multiroute

Component for Multi-route on the map

## Usage

```html
<ya-map [center]="[55.761952, 37.620739]">
  <ya-multiroute [referencePoints]="[[55.751952, 37.600739], 'Красные ворота, Москва']"></ya-multiroute>
</ya-map>
```

## Inputs

| Name            | Type                                                    | Default | Required | Description                          |
|-----------------|---------------------------------------------------------|---------|----------|--------------------------------------|
| referencePoints | [IMultiRouteReferencePoint][][]                         |         | yes      | Reference points for the multi-route |
| model           | [multiRouter.MultiRouteModel] || [MultiRouteModelJson]  |         | no       | Properties for the multiroute        |
| options         | [MultiRouteOptions]                                     |         | no       | Options for the multiroute           |

[IMultiRouteReferencePoint]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteReferencePoint-docpage/
[multiRouter.MultiRouteModel]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRouteModel-docpage/
[MultiRouteModelJson]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteModelJson-docpage/
[MultiRouteOptions]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute-docpage/#multiRouter.MultiRoute__param-options

## Outputs

| Name              | Type         | Supported event type                                  | Description                                                    |
|-------------------|--------------|-------------------------------------------------------|----------------------------------------------------------------|
| load              | [ILoadEvent] |                                                       | Emits immediately after this entity is added in root container |
| activeroutechange | [IEvent]     | activeroutechange                                     | Change to the active route                                     |
| baloon            | [IEvent]     | balloonopen, balloonclose                             | Actions with ballon                                            |
| yaclick           | [IEvent]     | click, dblclick                                       | Clicks on the object                                           |
| mouse             | [IEvent]     | mousedown, mouseenter, mouseleave, mousemove, mouseup | Mouse actions over the object                                  |
| multitouch        | [IEvent]     | multitouchstart, multitouchmove, multitouchend        | Multitouch actions over the object                             |

[ILoadEvent]: https://github.com/ddubrava/angular-yandex-maps/blob/develop/projects/angular8-yandex-maps/src/lib/models/models.ts#L23
[IEvent]: https://github.com/ddubrava/angular-yandex-maps/blob/develop/projects/angular8-yandex-maps/src/lib/models/models.ts#L34

## Examples

- [Building a driving multiroute](https://stackblitz.com/edit/multiroute)
- [Building a pedestrian multiroute](https://stackblitz.com/edit/multiroute-pedestrian)
