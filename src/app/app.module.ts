import { AngularYandexMapsModule, IConfig } from '../../projects/angular8-yandex-maps/src/public-api';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

const mapConfig: IConfig = {
  apikey: '658f67a2-fd77-42e9-b99e-2bd48c4ccad4',
  lang: 'en_US',
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularYandexMapsModule.forRoot(mapConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
