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

All events execute within the Angular zone

| Name       | Type         | Supported event type                                  | Description                                                    |
| ---------- | ------------ | ----------------------------------------------------- | -------------------------------------------------------------- |
| load       | [ILoadEvent] |                                                       | Emits immediately after this entity is added in root container |
| balloon    | [IEvent]     | balloonopen, balloonclose                             | Actions with the balloon                                       |
| yaclick    | [IEvent]     | click, dblclick                                       | Left-click on the object                                       |
| drag       | [IEvent]     | dragstart, dragend                                    | Placemark dragging                                             |
| hint       | [IEvent]     | hintopen, hintclose                                   | Actions with the hint                                          |
| mouse      | [IEvent]     | mousedown, mouseenter, mouseleave, mousemove, mouseup | Mouse actions with the object                                  |
| multitouch | [IEvent]     | multitouchstart, multitouchmove, multitouchend        | Multitouch actions with the object                             |

[iloadevent]: interfaces/load-event.md
[ievent]: interfaces/event.md

## Examples

- [Changing a placemark icon when hovering over it](https://stackblitz.com/edit/changing-a-placemark-on-hover)

## Source

- [lib/directives/ya-placemark](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/directives/ya-placemark)
- [jsapi/doc/2.1/ref/reference/Placemark.html](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Placemark.html)
