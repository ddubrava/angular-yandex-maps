# Control

Directive for creating and managing controls on the map

[Control](https://searchcontrol.stackblitz.io ':include :type=iframe height=550px')

## Usage

```html
<ya-map [center]="[55.751952, 37.600739]">
  <ya-control type="RoutePanel" [parameters]="{ options: { float: 'right' } }"></ya-control>
</ya-map>
```

## Inputs

| Name       | Type            | Default | Required | Description                |
| ---------- | --------------- | ------- | -------- | -------------------------- |
| type       | [YaControlType] |         | yes      | Control type               |
| parameters | any             |         | no       | Parameters for the control |

[yacontroltype]: interfaces/ya-control-type.md

## Outputs

| Name  | Type           | Inside the angular zone | Description                        |
| ----- | -------------- | ----------------------- | ---------------------------------- |
| ready | [YaReadyEvent] | yes                     | Control instance is added in a Map |

[yareadyevent]: interfaces/ya-ready-event.md

## Source

[lib/directives/ya-control](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/directives/ya-control)
