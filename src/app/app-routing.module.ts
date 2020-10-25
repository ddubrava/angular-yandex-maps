import { ClustererComponent } from './components/clusterer/clusterer.component';
import { ControlsComponent } from './components/controls/controls.component';
import { GeoobjectComponent } from './components/geoobject/geoobject.component';
import { MapComponent } from './components/map/map.component';
import { MultirouteComponent } from './components/multiroute/multiroute.component';
import { NgModule } from '@angular/core';
import { PanoramaComponent } from './components/panorama/panorama.component';
import { PlacemarkComponent } from './components/placemark/placemark.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'map',
    component: MapComponent,
  },
  {
    path: 'panorama',
    component: PanoramaComponent,
  },
  {
    path: 'clusterer',
    component: ClustererComponent,
  },
  {
    path: 'placemark',
    component: PlacemarkComponent,
  },
  {
    path: 'geoobject',
    component: GeoobjectComponent,
  },
  {
    path: 'multiroute',
    component: MultirouteComponent,
  },
  {
    path: 'controls',
    component: ControlsComponent,
  },
  {
    path: '**',
    redirectTo: 'map',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
