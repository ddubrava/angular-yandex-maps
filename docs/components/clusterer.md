# Clusterer

Component for creating a clusterer. Clusterizes objects in the visible area of the map.
If the object does not fall within the visible area of the map, it will not be added to the map.
Note, that the clusterer does not react to changing the coordinates of objects (either programmatically,
or as the result of dragging). If you want to change the coordinates of some object in the clusterer,
you should first delete the object from the clusterer and then add it back.

## Usage

```html
<ya-map [center]="[55.74, 37.58]">
  <ya-clusterer>
    <ya-placemark [geometry]="[55.74, 37.50]"></ya-placemark>
    <ya-geoobject [feature]="{ geometry: { type: 'Point', coordinates: [55.73, 37.52] } }"></ya-geoobject>
  </ya-clusterer>
</ya-map>
```

## Inputs

| Name         | Type         | Default | Required | Description                                                                              |
|--------------|--------------|---------|----------|------------------------------------------------------------------------------------------|
| options      | [ClustererOptions] |         | no       | Options for the clusterer                                                          |

[ClustererOptions]: https://tech.yandex.com/maps/jsapi/doc/2.1/ref/reference/Clusterer-docpage/#Clusterer__param-options

## Outputs

All events execute within the Angular zone

| Name          | Type         | Supported event type | Description                                                    |
|---------------|--------------|----------------------|----------------------------------------------------------------|
| load          | [ILoadEvent] |                      | Emits immediately after this entity is added in root container |
| hint          | [IEvent]     | hintopen, hintclose  | Actions with the hint                                          |
| mapChange     | [IEvent]     | mapChange            | Map reference changed                                          |
| optionsChange | [IEvent]     | optionsChange        | Change to the object options                                   |
| parentChange  | [IEvent]     | parentChange         | The parent object reference changed                            |

[ILoadEvent]: https://github.com/ddubrava/angular-yandex-maps/blob/develop/projects/angular8-yandex-maps/src/lib/models/models.ts#L23
[IEvent]: https://github.com/ddubrava/angular-yandex-maps/blob/develop/projects/angular8-yandex-maps/src/lib/models/models.ts#L34

## ContentChildren
- [Placemark](components/placemark.md)
- [GeoObject](components/geoobject.md)

## Source

[lib/components/ya-clusterer](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/components/ya-clusterer)
