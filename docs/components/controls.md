# Controls

Component for creating and managing controls on the map

## Usage

```html
<ya-map [center]="[55.751952, 37.600739]">
  <ya-control type="RoutePanel" [parameters]="{ options: { float: 'right' } }"></ya-control>
</ya-map>
```

## Inputs

| Name       | Type   | Default | Required | Description                                                                                                              |
|------------|--------|---------|----------|--------------------------------------------------------------------------------------------------------------------------|
| type       | String |         | yes      | Control type. List of types you can find in left list - [Controls]. E.g. Control.FullscreenControl - 'FullscreenControl' |
| parameters | Any    |         | no       | Parameters for the Control                                                                                               |

[Controls]: https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/control.Button-docpage/

## Outputs

All events execute within the Angular zone

| Name       | Type         | Supported event type                                  | Description                                                    |
|------------|--------------|-------------------------------------------------------|----------------------------------------------------------------|
| load       | [ILoadEvent] |                                                       | Emits immediately after this entity is added in root container |

[ILoadEvent]: interfaces/load-event.md

## Examples

- [Search Control](https://stackblitz.com/edit/searchcontrol)
- [RoutePanel Control](https://stackblitz.com/edit/route-panel)

## Source

[lib/components/ya-control](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/components/ya-control)
