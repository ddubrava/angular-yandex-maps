import { CommonModule } from '@angular/common';
import { IConfig, YA_MAP_CONFIG } from './models/models';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { YaClustererComponent } from './components/ya-clusterer/ya-clusterer.component';
import { YaControlComponent } from './components/ya-control/ya-control.component';
import { YaGeoObjectComponent } from './components/ya-geoobject/ya-geoobject.component';
import { YaMapComponent } from './components/ya-map/ya-map.component';
import { YaMultirouteComponent } from './components/ya-multiroute/ya-multiroute.component';
import { YaPanoramaComponent } from './components/ya-panorama/ya-panorama.component';
import { YaPlacemarkComponent } from './components/ya-placemark/ya-placemark.component';

@NgModule({
  declarations: [
    YaClustererComponent,
    YaControlComponent,
    YaGeoObjectComponent,
    YaMapComponent,
    YaMultirouteComponent,
    YaPanoramaComponent,
    YaPlacemarkComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YaClustererComponent,
    YaControlComponent,
    YaGeoObjectComponent,
    YaMapComponent,
    YaMultirouteComponent,
    YaPanoramaComponent,
    YaPlacemarkComponent,
  ]
})

export class AngularYandexMapsModule {
  /**
   * Please use this method when you register the module at the root level
   * @param config
   */
  public static forRoot(config: Partial<IConfig>): ModuleWithProviders<AngularYandexMapsModule> {
    return {
      ngModule: AngularYandexMapsModule,
      providers: [
        { provide: YA_MAP_CONFIG, useValue: config }
      ]
    };
  }
}
