import * as _ymaps from 'yandex-maps';

declare global {
  const ymaps: typeof _ymaps;

  interface Window {
    ymaps: typeof _ymaps;
  }
}
