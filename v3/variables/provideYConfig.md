# provideYConfig
Provides a Y_CONFIG token with the given configuration.

```ts
import { provideYConfig, YConfig } from 'angular-yandex-maps-v3';

export const config: YConfig = {
  apikey: 'X-X-X',
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideYConfig(config)],
};
```