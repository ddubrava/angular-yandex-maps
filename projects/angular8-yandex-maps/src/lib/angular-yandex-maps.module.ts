import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YandexMapComponent } from './components/yandex-map-component/yandex-map.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { YandexPlacemarkComponent } from './components/yandex-placemark-component/yandex-placemark.component';

@NgModule({
  declarations: [
    YandexMapComponent,
    YandexPlacemarkComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YandexMapComponent,
    YandexPlacemarkComponent
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
