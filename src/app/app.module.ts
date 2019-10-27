import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularYandexMapsModule } from '../../projects/angular8-yandex-maps/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularYandexMapsModule.forRoot('658f67a2-fd77-42e9-b99e-2bd48c4ccad4')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
