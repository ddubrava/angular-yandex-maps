import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgYandexMapModule } from './ng-yandex-map-module/ng-yandex-map.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgYandexMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
