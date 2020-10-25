# IEvent

| Name     | Type                | Description                                                                                                              |
| -------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| instance | Any                 | Instance of created entity                                                                                               |
| ymaps    | YMaps               | API global object                                                                                                        |
| type     | String \| Undefined | String event type, event.originalEvent.type                                                                              |
| event    | [Event]             | Provides methods for accessing the originalObject object's fields and methods, with the possibility for redefining them. |

[event]: https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Event.html/

## Source

[lib/models/models.ts](https://github.com/ddubrava/angular8-yandex-maps/blob/master/projects/angular8-yandex-maps/src/lib/models/models.ts)
