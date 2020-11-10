# Controls

Directive for creating and managing controls on the map

[Controls](https://searchcontrol.stackblitz.io ':include :type=iframe height=550px')

## Usage

```html
<ya-map [center]="[55.751952, 37.600739]">
  <ya-control
    type="RoutePanel"
    [parameters]="{ options: { float: 'right' } }"
  ></ya-control>
</ya-map>
```

## Inputs

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>type</td>
      <td>Button | FullscreenControl | GeolocationControl | ListBox | ListBoxItem | RouteButton | RouteEditor | RoutePanel | RulerControl | SearchControl | TrafficControl | TypeSelector | ZoomControl</td>
      <td></td>
      <td>yes</td>
      <td>Control type</td>
    </tr>
    <tr>
      <td>parameters</td>
      <td>any</td>
      <td></td>
      <td>no</td>
      <td>Parameters for the Control</td>
    </tr>
  </tbody>
</table>

## Outputs

All events execute within the Angular zone

| Name | Type         | Supported event type | Description                                                    |
| ---- | ------------ | -------------------- | -------------------------------------------------------------- |
| load | [ILoadEvent] |                      | Emits immediately after this entity is added in root container |

[iloadevent]: interfaces/load-event.md

## Examples

- [Search Control](https://stackblitz.com/edit/searchcontrol)
- [RoutePanel Control](https://stackblitz.com/edit/route-panel)

## Source

[lib/directives/ya-control](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/directives/ya-control)
