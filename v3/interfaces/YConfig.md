# YConfig


API loading parameters.
See https://yandex.com/maps-api/docs/js-api/dg/concepts/load.html#params


```ts
export interface YConfig {
  /**
   * API key.
   */
  apikey?: string;
  /**
   * Locale.
   */
  lang?: 'ru_RU' | 'ru_UA' | 'uk_UA' | 'tr_TR' | 'en_RU' | 'en_US' | 'he_IL' | 'en_IL';
}

```