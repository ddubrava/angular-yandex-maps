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
    AngularYandexMapsModule.forRoot(null)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
