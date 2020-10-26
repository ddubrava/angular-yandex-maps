# IConfig

API loading parameters. See [API](https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/load.html/#load__param) for further information.

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Required</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>apikey</td>
			<td>String</td>
			<td>no</td>
			<td>API key. You can get a key in the developer's dashboard</td>
		</tr>
		<tr>
			<td>lang</td>
			<td>ru_RU | en_US | en_RU | ru_UA | uk_UA | tr_TR</td>
			<td>yes</td>
			<td>Locales</td>
		</tr>
		<tr>
			<td>coordorder</td>
			<td>latlong | longlat</td>
			<td>no</td>
			<td>The order for setting geographical coordinates in API functions that accept longitude-latitude input</td>
		</tr>
		<tr>
			<td>load</td>
			<td>String</td>
			<td>no</td>
			<td>List of modules to load</td>
		</tr>
		<tr>
			<td>mode</td>
			<td>release | debug</td>
			<td>no</td>
			<td>API loading mode</td>
		</tr>
		<tr>
			<td>enterprise</td>
			<td>Boolean</td>
			<td>no</td>
			<td>Use commercial version of the API</td>
		</tr>
		<tr>
			<td>version</td>
			<td>String</td>
			<td>no</td>
			<td>Version number of the API</td>
		</tr>
	</tbody>
</table>

## Source

[lib/models/models.ts](https://github.com/ddubrava/angular8-yandex-maps/blob/master/projects/angular8-yandex-maps/src/lib/models/models.ts)
