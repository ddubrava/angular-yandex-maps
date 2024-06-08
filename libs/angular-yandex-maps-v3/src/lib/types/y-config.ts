/**
 * API loading parameters.
 * See https://yandex.ru/dev/jsapi30/doc/en/dg/concepts/load#params
 */
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
