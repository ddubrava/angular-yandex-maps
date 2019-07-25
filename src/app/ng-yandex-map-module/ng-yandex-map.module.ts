import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgYandexMapComponent } from './components/ng-yandex-map/ng-yandex-map.component';

@NgModule({
  declarations: [
    NgYandexMapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgYandexMapComponent
  ]
})
export class NgYandexMapModule { }
