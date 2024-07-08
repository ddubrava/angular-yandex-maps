import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../environments/environment';

export const config$ = new BehaviorSubject<YaConfig>({
  apikey: environment.apikey,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(AngularYandexMapsModule.forRoot(config$)),
  ],
};
