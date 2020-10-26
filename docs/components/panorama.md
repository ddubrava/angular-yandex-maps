# Panorama

Component for creating and controlling the panorama player

## Usage

```html
<ya-panorama [point]="[59.938557, 30.316198]" layer="yandex#airPanorama"></ya-panorama>
```

## Inputs

| Name    | Type                                  | Default         | Required | Description                                  |
| ------- | ------------------------------------- | --------------- | -------- | -------------------------------------------- |
| point   | Number[]                              |                 | yes      | The point for searching for nearby panoramas |
| layer   | yandex#panorama \| yandex#airPanorama | yandex#panorama | no       | The layer to search for panoramas            |
| options | [PlayerOptions]                       |                 | no       | Options for the player                       |

[playeroptions]: https://tech.yandex.com/maps/jsapi/doc/2.1/ref/reference/panorama.Player-docpage/#panorama.Player__param-options

## Outputs

All events execute within the Angular zone

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Supported event type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>load</td>
			<td><a href="#/interfaces/load-event">ILoadEvent</a></td>
			<td></td>
			<td>Emits immediately after this entity is added in root container</td>
		</tr>
		<tr>
			<td>direction</td>
			<td><a href="#/interfaces/event">IEvent</a></td>
			<td>directionchange</td>
			<td>The view direction changed</td>
		</tr>
		<tr>
			<td>fullscreen</td>
			<td><a href="#/interfaces/event">IEvent</a></td>
			<td>fullscreenenter, fullscreenexit</td>
			<td>The panorama player screen mode is switched</td>
		</tr>
		<tr>
			<td>marker</td>
			<td><a href="#/interfaces/event">IEvent</a></td>
			<td>markercollapse, markerexpand, markermouseenter, markermouseleave</td>
			<td>Actions with the marker</td>
		</tr>
	</tbody>
</table>

## Examples

- [Panorama](https://stackblitz.com/edit/panorama)

## Source

- [lib/components/ya-panorama](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/components/ya-panorama)
- [jsapi/doc/2.1/ref/reference/panorama.Player.html](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/panorama.Player.html/)
