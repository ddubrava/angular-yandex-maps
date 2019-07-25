import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularYandexMapsModule } from './angular-yandex-maps-module/angular-yandex-maps.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularYandexMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
