# YaConfig

API loading parameters. See [API](https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/load.html/#load__param) for further information

```ts
export interface YaConfig {
  /**
   * API key. You can get a key in the developer's dashboard
   */
  apikey?: string;
  /**
   * Locales
   */
  lang: 'ru_RU' | 'en_US' | 'en_RU' | 'ru_UA' | 'uk_UA' | 'tr_TR';
  /**
   * The order for setting geographical coordinates in API functions that accept longitude-latitude input
   */
  coordorder?: 'latlong' | 'longlat';
  /**
   * List of modules to load
   */
  load?: string;
  /**
   * API loading mode
   */
  mode?: 'release' | 'debug';
  /**
   * Use commercial version of the API
   */
  enterprise?: boolean;
  /**
   * Version number of the API
   */
  version?: string;
}
```

## Source

[lib/interfaces/config.ts](https://github.com/ddubrava/angular8-yandex-maps/blob/master/projects/angular8-yandex-maps/src/lib/interfaces/config.ts)
