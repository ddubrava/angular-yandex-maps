# Placemark

Directive for creating a geo object with the geometry geometry.Point

[Placemark](https://custom-placemark.stackblitz.io ':include :type=iframe height=550px')

## Usage

```html
<ya-map [center]="[55.751952, 37.600739]">
  <ya-placemark [geometry]="[55.751952, 37.600739]"></ya-placemark>
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
			<td>geometry</td>
			<td>Number[] | Object | <a href="https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/IPointGeometry-docpage" target="_blank" rel="noopener">IPointGeometry</a></td>
			<td></td>
			<td>yes</td>
			<td>Coordinates of the placemark, or a hash describing the geometry, or a reference to the point geometry object</td>
		</tr>
		<tr>
			<td>properties</td>
			<td><a href="https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemark__param-properties" target="_blank" rel="noopener">PlacemarkProperties</a></td>
			<td></td>
			<td>no</td>
			<td>Properties for the placemark</td>
		</tr>
		<tr>
			<td>options</td>
			<td><a href="https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/Placemark-docpage/#Placemark__param-options" target="_blank" rel="noopener">PlacemarkOptions</a></td>
			<td></td>
			<td>no</td>
			<td>Options for the placemark</td>
		</tr>
	</tbody>
</table>

## Outputs

| Name              | Type           | Inside the angular zone | Description                                                     |
| ----------------- | -------------- | ----------------------- | --------------------------------------------------------------- |
| ready             | [YaReadyEvent] | yes                     | Placemark instance is created                                   |
| balloonclose      | [YaEvent]      | yes                     | Closing the balloon                                             |
| balloonopen       | [YaEvent]      | yes                     | Opening a balloon on a map                                      |
| beforedrag        | [YaEvent]      | yes                     | Event preceding the "drag" event                                |
| beforedragstart   | [YaEvent]      | yes                     | Event preceding the "dragstart" event                           |
| yaclick           | [YaEvent]      | yes                     | Single left-click on the object                                 |
| yacontextmenu     | [YaEvent]      | yes                     | Calls the element's context menu                                |
| yadbclick         | [YaEvent]      | yes                     | Double left-click on the object                                 |
| drag              | [YaEvent]      | yes                     | Dragging a geo object                                           |
| dragend           | [YaEvent]      | yes                     | End of geo object dragging                                      |
| dragstart         | [YaEvent]      | yes                     | Start of geo object dragging                                    |
| editorstatechange | [YaEvent]      | yes                     | Change in the state of the editor for the geo object's geometry |
| geometrychange    | [YaEvent]      | yes                     | Change to the geo object geometry                               |
| hintclose         | [YaEvent]      | yes                     | Closing the hint                                                |
| hintopen          | [YaEvent]      | yes                     | Opening a hint on a map                                         |
| mapchange         | [YaEvent]      | yes                     | Map reference changed                                           |
| yamousedown       | [YaEvent]      | yes                     | Pressing the mouse button over the object                       |
| yamouseenter      | [YaEvent]      | no                      | Pointing the cursor at the object                               |
| yamouseleave      | [YaEvent]      | no                      | Moving the cursor off of the object                             |
| yamousemove       | [YaEvent]      | no                      | Moving the cursor over the object                               |
| yamouseup         | [YaEvent]      | no                      | Letting go of the mouse button over an object                   |
| multitouchend     | [YaEvent]      | no                      | End of multitouch                                               |
| multitouchmove    | [YaEvent]      | no                      | Repeating event during multitouch                               |
| multitouchstart   | [YaEvent]      | no                      | Start of multitouch                                             |
| optionschange     | [YaEvent]      | yes                     | Change to the object options                                    |
| overlaychange     | [YaEvent]      | yes                     | Change to the geo object overlay                                |
| parentchange      | [YaEvent]      | yes                     | The parent object reference changed                             |
| propertieschange  | [YaEvent]      | yes                     | Change to the geo object data                                   |
| yawheel           | [YaEvent]      | yes                     | Mouse wheel scrolling                                           |

[yareadyevent]: interfaces/ya-ready-event.md
[yaevent]: interfaces/event.md

## Source

- [lib/directives/ya-placemark](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/directives/ya-placemark)
- [jsapi/doc/2.1/ref/reference/Placemark.html](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Placemark.html)
