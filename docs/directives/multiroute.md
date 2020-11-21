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

| Name              | Type           | Inside the angular zone | Description                                                             |
| ----------------- | -------------- | ----------------------- | ----------------------------------------------------------------------- |
| ready             | [YaReadyEvent] | yes                     | Entity is added in root container                                       |
| activeroutechange | [YaEvent]      | yes                     | Change to the active route.                                             |
| balloonclose      | [YaEvent]      | yes                     | Closing the balloon                                                     |
| balloonopen       | [YaEvent]      | yes                     | Opening a balloon on a map                                              |
| boundsautoapply   | [YaEvent]      | yes                     | The event occurs at the time of setting the map center...               |
| boundschange      | [YaEvent]      | yes                     | Changing coordinates of the geographical area covering the multi-route. |
| yaclick           | [YaEvent]      | yes                     | Single left-click on the object                                         |
| yacontextmenu     | [YaEvent]      | yes                     | Calls the element's context menu                                        |
| yadbclick         | [YaEvent]      | yes                     | Double left-click on the object                                         |
| geometrychange    | [YaEvent]      | yes                     | Change to the geo object geometry                                       |
| mapchange         | [YaEvent]      | yes                     | Map reference changed                                                   |
| yamousedown       | [YaEvent]      | yes                     | Pressing the mouse button over the object                               |
| yamouseenter      | [YaEvent]      | no                      | Pointing the cursor at the object                                       |
| yamouseleave      | [YaEvent]      | no                      | Moving the cursor off of the object                                     |
| yamousemove       | [YaEvent]      | no                      | Moving the cursor over the object                                       |
| yamouseup         | [YaEvent]      | no                      | Letting go of the mouse button over an object                           |
| multitouchend     | [YaEvent]      | no                      | End of multitouch                                                       |
| multitouchmove    | [YaEvent]      | no                      | Repeating event during multitouch                                       |
| multitouchstart   | [YaEvent]      | no                      | Start of multitouch                                                     |
| optionschange     | [YaEvent]      | yes                     | Change to the object options                                            |
| overlaychange     | [YaEvent]      | yes                     | Change to the geo object overlay                                        |
| parentchange      | [YaEvent]      | yes                     | The parent object reference changed                                     |
| pixelboundschange | [YaEvent]      | yes                     | Changing pixel coordinates of the area covering the multi-route         |
| propertieschange  | [YaEvent]      | yes                     | Change to the geo object data                                           |
| update            | [YaEvent]      | yes                     | Updating the multi-route                                                |
| yawheel           | [YaEvent]      | yes                     | Mouse wheel scrolling                                                   |

[yareadyevent]: interfaces/ya-ready-event.md
[yaevent]: interfaces/event.md

## Source

- [lib/directives/ya-multiroute](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/directives/ya-multiroute)
- [jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/multiRouter.MultiRoute.html)
