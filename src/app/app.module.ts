import {
  AngularYandexMapsModule,
  IConfig,
} from '../../projects/angular8-yandex-maps/src/public-api';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClustererComponent } from './components/clusterer/clusterer.component';
import { ControlsComponent } from './components/controls/controls.component';
import { GeoobjectComponent } from './components/geoobject/geoobject.component';
import { MapComponent } from './components/map/map.component';
import { MultirouteComponent } from './components/multiroute/multiroute.component';
import { NgModule } from '@angular/core';
import { PanoramaComponent } from './components/panorama/panorama.component';
import { PlacemarkComponent } from './components/placemark/placemark.component';

const mapConfig: IConfig = {
  apikey: null,
  lang: 'en_US',
};

@NgModule({
  declarations: [
    AppComponent,
    ClustererComponent,
    ControlsComponent,
    GeoobjectComponent,
    MapComponent,
    MultirouteComponent,
    PanoramaComponent,
    PlacemarkComponent,
  ],
  imports: [AngularYandexMapsModule.forRoot(mapConfig), AppRoutingModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
