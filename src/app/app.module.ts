import { AngularYandexMapsModule, IConfig } from '../../projects/angular8-yandex-maps/src/public_api';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { YaMapComponent } from './ya-map/ya-map.component';
import { YaPlacemarkComponent } from './ya-placemark/ya-placemark.component';
import { YaPanoramaComponent } from './ya-panorama/ya-panorama.component';
import { YaMultirouteComponent } from './ya-multiroute/ya-multiroute.component';
import { YaControlComponent } from './ya-control/ya-control.component';
import { YaGeoobjectComponent } from './ya-geoobject/ya-geoobject.component';

const mapConfig: IConfig = {
  apikey: '658f67a2-fd77-42e9-b99e-2bd48c4ccad4',
  lang: 'en_US',
};

@NgModule({
  declarations: [
    AppComponent,
    YaMapComponent,
    YaPlacemarkComponent,
    YaPanoramaComponent,
    YaMultirouteComponent,
    YaControlComponent,
    YaGeoobjectComponent
  ],
  imports: [
    BrowserModule,
    AngularYandexMapsModule.forRoot(mapConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
