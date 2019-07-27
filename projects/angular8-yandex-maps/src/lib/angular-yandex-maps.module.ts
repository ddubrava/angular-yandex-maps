import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YandexMapComponent } from './components/yandex-map-component/yandex-map.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  declarations: [
    YandexMapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YandexMapComponent
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
