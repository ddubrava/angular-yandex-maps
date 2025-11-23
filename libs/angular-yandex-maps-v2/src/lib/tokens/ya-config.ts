import { InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { Observable } from 'rxjs';

import { YaConfig } from '../types/ya-config';

/**
 * @internal
 */
export const YA_CONFIG = new InjectionToken<YaConfig | Observable<YaConfig>>('YaConfig', {
  factory: () => ({}),
});

// It must be an arrow function, because compodoc cannot parse functions without issues.
// TODO: convert provideYConfig to a function + create an issue in compodoc about rawdescription.

/**
 * Provides a YA_CONFIG token with the given configuration.
 *
 * ```ts
 * import { provideYaConfig, YaConfig } from 'angular8-yandex-maps';
 *
 * export const config: YaConfig = {
 *   apikey: 'X-X-X',
 * };
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideYaConfig(config)],
 * };
 * ```
 */
export const provideYaConfig = (config: YaConfig | Observable<YaConfig>) => {
  return makeEnvironmentProviders([
    {
      provide: YA_CONFIG,
      useValue: config,
    },
  ]);
};
