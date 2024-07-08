import { InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { Observable } from 'rxjs';

import { YConfig } from '../types/y-config';

/**
 * @internal
 */
export const Y_CONFIG = new InjectionToken<YConfig | Observable<YConfig>>('Y_CONFIG', {
  factory: () => ({}),
});

// It must be an arrow function, because compodoc cannot parse functions without issues.
// TODO convert provideYConfig to a function + create an issue in compodoc about rawdescription.

/**
 * Provides a Y_CONFIG token with the given configuration.
 *
 * ```ts
 * import { provideYConfig, YConfig } from 'angular-yandex-maps-v3';
 *
 * export const config: YConfig = {
 *   apikey: 'X-X-X',
 * };
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideYConfig(config)],
 * };
 * ```
 */
export const provideYConfig = (config: YConfig | Observable<YConfig>) => {
  return makeEnvironmentProviders([
    {
      provide: Y_CONFIG,
      useValue: config,
    },
  ]);
};
