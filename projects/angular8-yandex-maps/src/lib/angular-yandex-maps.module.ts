import { ModuleWithProviders, NgModule } from '@angular/core';

import { YA_CONFIG } from './tokens/ya-config';
import { YaClustererComponent } from './components/ya-clusterer/ya-clusterer.component';
import { YaConfig } from './models/ya-config';
import { YaControlDirective } from './components/ya-control/ya-control.directive';
import { YaGeoObjectDirective } from './components/ya-geoobject/ya-geoobject.directive';
import { YaMapComponent } from './components/ya-map/ya-map.component';
import { YaMultirouteDirective } from './components/ya-multiroute/ya-multiroute.directive';
import { YaObjectManagerDirective } from './components/ya-object-manager/ya-object-manager.directive';
import { YaPanoramaDirective } from './components/ya-panorama/ya-panorama.directive';
import { YaPlacemarkDirective } from './components/ya-placemark/ya-placemark.directive';

@NgModule({
  declarations: [
    YaClustererComponent,
    YaControlDirective,
    YaGeoObjectDirective,
    YaMapComponent,
    YaMultirouteDirective,
    YaObjectManagerDirective,
    YaPanoramaDirective,
    YaPlacemarkDirective,
  ],
  exports: [
    YaClustererComponent,
    YaControlDirective,
    YaGeoObjectDirective,
    YaMapComponent,
    YaMultirouteDirective,
    YaObjectManagerDirective,
    YaPanoramaDirective,
    YaPlacemarkDirective,
  ],
})
export class AngularYandexMapsModule {
  /**
   * Please use this method when you register the module at the root level
   * @param config
   */
  static forRoot(config: YaConfig): ModuleWithProviders<AngularYandexMapsModule> {
    return {
      ngModule: AngularYandexMapsModule,
      providers: [{ provide: YA_CONFIG, useValue: config }],
    };
  }
}
