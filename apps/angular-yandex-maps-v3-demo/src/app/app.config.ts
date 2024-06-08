import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideYConfig, YConfig } from 'angular-yandex-maps-v3';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../environments/environment';

export const config$ = new BehaviorSubject<YConfig>({
  apikey: environment.apikey,
});

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideYConfig(config$)],
};
