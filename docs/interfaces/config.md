# IConfig

API loading parameters. See [API](https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/load.html/#load__param) for further information

| Name       | Type                                                           | Optional | Description                                                                                          |
|------------|----------------------------------------------------------------|----------|------------------------------------------------------------------------------------------------------|
| apikey     | String                                                         | yes      | API key. You can get a key in the developer's dashboard                                              |
| lang       | 'ru_RU' \| 'en_US' \| 'en_RU' \| 'ru_UA' \| 'uk_UA' \| 'tr_TR' | yes      | Locales                                                                                              |
| coordorder | 'latlong' \| 'longlat'                                         | no       | The order for setting geographical coordinates in API functions that accept longitude-latitude input |
| load       | String                                                         | no       | List of modules to load                                                                              |
| mode       | 'release' \| 'debug'                                           | no       | API loading mode                                                                                     |
| enterprise | Boolean                                                        | no       | Use commercial version of the API                                                                    |
| version    | String                                                         | no       | Version number of the API                                                                            |

## Source

[lib/models/models.ts](https://github.com/ddubrava/angular8-yandex-maps/blob/master/projects/angular8-yandex-maps/src/lib/models/models.ts)
