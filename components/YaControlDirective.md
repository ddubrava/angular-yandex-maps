# YaControlDirective


The `ya-control` component wraps `ymaps.control[YaControlType]` classes from the Yandex.Maps API.
You can configure `ymaps.control[YaControlType]` via the component's inputs.
API Events can be bound only manually. You can use `ready` event to get an instance.



```html
```html
<ya-map [center]="[55.761952, 37.620739]">
  <ya-control
    type="RoutePanel"
    [parameters]="{ options: { float: 'right' } }"
  ></ya-control>
</ya-map>
```
```

## Example
[filename](https://stackblitz.com/edit/searchcontrol?embed=1&view=preview ':include :type=iframe width=100% height=650px')

## Inputs
| Name       | Description            | Type                                      | API Reference |
| ---------- | ---------------------- | ----------------------------------------- | ------------- |
| parameters |   Control parameters.  | any                                       | —             |
| type       |   Control type.        | [YaControlType](interfaces/YaControlType) | —             |

## Outputs
| Name  | Description                            | Type                                    | API Reference |
| ----- | -------------------------------------- | --------------------------------------- | ------------- |
| ready |   Control instance is added to a Map.  | [YaReadyEvent](interfaces/YaReadyEvent) | —             |