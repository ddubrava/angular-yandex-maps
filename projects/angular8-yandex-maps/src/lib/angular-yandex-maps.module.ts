import { ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IConfig, YA_MAP_CONFIG } from './models/models';
import { YandexControlComponent } from './components/yandex-control-component/yandex-control.component';
import { YandexGeoObjectComponent } from './components/yandex-geoobject-component/yandex-geoobject.component';
import { YandexMapComponent } from './components/yandex-map-component/yandex-map.component';
import { YandexMultirouteComponent } from './components/yandex-multiroute-component/yandex-multiroute.component';
import { YandexPanoramaComponent } from './components/yandex-panorama-component/yandex-panorama.component';
import { YandexPlacemarkComponent } from './components/yandex-placemark-component/yandex-placemark.component';

@NgModule({
  declarations: [
    YandexControlComponent,
    YandexGeoObjectComponent,
    YandexMapComponent,
    YandexMultirouteComponent,
    YandexPanoramaComponent,
    YandexPlacemarkComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YandexControlComponent,
    YandexGeoObjectComponent,
    YandexMapComponent,
    YandexMultirouteComponent,
    YandexPanoramaComponent,
    YandexPlacemarkComponent,
  ]
})

export class AngularYandexMapsModule {
   /**
   * Please use this method when you register the module at the root level.
   */
  public static forRoot(config: Partial<IConfig>): ModuleWithProviders<AngularYandexMapsModule> {
    return {
      ngModule: AngularYandexMapsModule,
      providers: [
        { provide: YA_MAP_CONFIG, useValue: config }
      ]
    };
  }
}
