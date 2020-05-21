import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularYandexMapsModule, IConfig } from '../../projects/angular8-yandex-maps/src/public_api';

const mapConfig: Partial<IConfig> = {
  apiKey: '658f67a2-fd77-42e9-b99e-2bd48c4ccad4',
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
