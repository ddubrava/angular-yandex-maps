# provideYaConfig
Provides a YA_CONFIG token with the given configuration.

```ts
import { provideYaConfig, YaConfig } from 'angular8-yandex-maps';

export const config: YaConfig = {
  apikey: 'X-X-X',
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideYaConfig(config)],
};
```