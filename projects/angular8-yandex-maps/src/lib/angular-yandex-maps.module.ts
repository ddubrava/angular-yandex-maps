import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { YandexMapComponent } from './components/yandex-map-component/yandex-map.component';
import { YandexPanoramaComponent } from './components/yandex-panorama-component/yandex-panorama.component';
import { YandexPlacemarkComponent } from './components/yandex-placemark-component/yandex-placemark.component';
import { YandexMultirouteComponent } from './components/yandex-multiroute-component/yandex-multiroute.component';
import { YandexGeoObjectComponent } from './components/yandex-geoobject-component/yandex-geoobject.component';
import { YandexControlComponent } from './components/yandex-control-component/yandex-control.component';

@NgModule({
  declarations: [
    YandexMapComponent,
    YandexPanoramaComponent,
    YandexPlacemarkComponent,
    YandexMultirouteComponent,
    YandexGeoObjectComponent,
    YandexControlComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YandexMapComponent,
    YandexPanoramaComponent,
    YandexPlacemarkComponent,
    YandexMultirouteComponent,
    YandexGeoObjectComponent,
    YandexControlComponent
  ]
})

export class AngularYandexMapsModule {
  static forRoot(apiKey: string): ModuleWithProviders {
    return {
      ngModule: AngularYandexMapsModule,
      providers: [
        { provide: 'API_KEY', useValue: apiKey }
      ]
    };
  }
}
