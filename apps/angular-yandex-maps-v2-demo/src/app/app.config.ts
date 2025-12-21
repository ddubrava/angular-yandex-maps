import type { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import type { YaConfig } from 'angular8-yandex-maps';
import { provideYaConfig } from 'angular8-yandex-maps';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../environments/environment';

export const config$ = new BehaviorSubject<YaConfig>({
  apikey: environment.apikey,
});

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideYaConfig(config$)],
};
