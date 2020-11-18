import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { YA_CONFIG } from './constants/constant';
import { YaClustererDirective } from './directives/ya-clusterer/ya-clusterer.directive';
import { YaConfig } from './interfaces/config';
import { YaControlDirective } from './directives/ya-control/ya-control.directive';
import { YaGeoobjectDirective } from './directives/ya-geoobject/ya-geoobject.directive';
import { YaMapComponent } from './components/ya-map/ya-map.component';
import { YaMultirouteDirective } from './directives/ya-multiroute/ya-multiroute.directive';
import { YaPanoramaComponent } from './components/ya-panorama/ya-panorama.component';
import { YaPlacemarkDirective } from './directives/ya-placemark/ya-placemark.directive';

@NgModule({
  declarations: [
    YaClustererDirective,
    YaControlDirective,
    YaGeoobjectDirective,
    YaMapComponent,
    YaMultirouteDirective,
    YaPanoramaComponent,
    YaPlacemarkDirective,
  ],
  imports: [CommonModule],
  exports: [
    YaClustererDirective,
    YaControlDirective,
    YaGeoobjectDirective,
    YaMapComponent,
    YaMultirouteDirective,
    YaPanoramaComponent,
    YaPlacemarkDirective,
  ],
})
export class AngularYandexMapsModule {
  /**
   * Please use this method when you register the module at the root level
   * @param config
   */
  public static forRoot(
    config: YaConfig,
  ): ModuleWithProviders<AngularYandexMapsModule> {
    return {
      ngModule: AngularYandexMapsModule,
      providers: [{ provide: YA_CONFIG, useValue: config }],
    };
  }
}
