import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClustererComponent } from './components/clusterer/clusterer.component';
import { ControlsComponent } from './components/controls/controls.component';
import { GeoobjectComponent } from './components/geoobject/geoobject.component';
import { MapComponent } from './components/map/map.component';
import { MultirouteComponent } from './components/multiroute/multiroute.component';
import { PanoramaComponent } from './components/panorama/panorama.component';
import { PlacemarkComponent } from './components/placemark/placemark.component';
import { environment } from '../environments/environment';

const mapConfig: YaConfig = {
  lang: 'en_US',
  apikey: environment.apikey,
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
  imports: [
    AngularYandexMapsModule.forRoot(mapConfig),
    AppRoutingModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
