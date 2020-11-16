# Multiroute

Directive for creating Multi-route on the map

## Usage

```html
<ya-map [center]="[55.761952, 37.620739]">
  <ya-multiroute
    [referencePoints]="[[55.751952, 37.600739], 'Красные ворота, Москва']"
  ></ya-multiroute>
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
			<td>referencePoints</td>
			<td><a href="https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteReferencePoint-docpage/" target="_blank" rel="noopener">IMultiRouteReferencePoint</a>[]</td>
			<td></td>
			<td>yes</td>
			<td>Reference points for the multi-route</td>
		</tr>
		<tr>
			<td>model</td>
			<td><a href="https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRouteModel-docpage/" target="_blank" rel="noopener">multiRouter.MultiRouteModel</a> | <a href="https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IMultiRouteModelJson-docpage/" target="_blank" rel="noopener">MultiRouteModelJson</a></td>
			<td></td>
			<td>no</td>
			<td>The data model of a multi-route, or the model description object</td>
		</tr>
		<tr>
			<td>options</td>
			<td><a href="https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute-docpage/#multiRouter.MultiRoute__param-options" target="_blank" rel="noopener">MultiRouteOptions</a></td>
			<td></td>
			<td>no</td>
			<td>Options for the multiroute</td>
		</tr>
	</tbody>
</table>

## Outputs

All events execute within the Angular zone

| Name              | Type         | Supported event type                                  | Description                                                    |
| ----------------- | ------------ | ----------------------------------------------------- | -------------------------------------------------------------- |
| ready             | [ILoadEvent] |                                                       | Emits immediately after this entity is added in root container |
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

- [lib/directives/ya-multiroute](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/directives/ya-multiroute)
- [jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html)
