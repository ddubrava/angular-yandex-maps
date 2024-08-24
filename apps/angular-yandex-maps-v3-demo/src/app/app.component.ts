import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import type { YMapFeature, YMapHotspot, YMapMarker } from '@yandex/ymaps3-types/imperative';
import { Feature } from '@yandex/ymaps3-types/packages/clusterer';
import {
  YConfig,
  YMapClustererDirective,
  YMapComponent,
  YMapControlButtonDirective,
  YMapControlCommonButtonDirective,
  YMapControlDirective,
  YMapControlsDirective,
  YMapDefaultFeaturesLayerDirective,
  YMapDefaultMarkerDirective,
  YMapDefaultSchemeLayerDirective,
  YMapFeatureDirective,
  YMapGeolocationControlDirective,
  YMapHintDirective,
  YMapListenerDirective,
  YMapMarkerDirective,
  YMapOpenMapsButtonDirective,
  YMapScaleControlDirective,
  YMapZoomControlDirective,
} from 'angular-yandex-maps-v3';

import { environment } from '../environments/environment';
import { config$ } from './app.config';

@Component({
  standalone: true,
  imports: [
    YMapComponent,
    YMapDefaultFeaturesLayerDirective,
    YMapDefaultMarkerDirective,
    YMapDefaultSchemeLayerDirective,
    YMapFeatureDirective,
    YMapMarkerDirective,
    YMapListenerDirective,
    YMapControlsDirective,
    YMapControlCommonButtonDirective,
    YMapScaleControlDirective,
    YMapControlButtonDirective,
    YMapZoomControlDirective,
    YMapGeolocationControlDirective,
    YMapOpenMapsButtonDirective,
    YMapControlDirective,
    YMapHintDirective,
    YMapClustererDirective,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // Do not enable OnPush, otherwise, we can't catch performance issues.
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements DoCheck {
  lang: YConfig['lang'] = 'ru_RU';

  coordinates: [number, number][] = [
    [-0.597696, 51.907351],
    [0.412304, 51.287351],
    [-0.087696, 51.947351],
    [-0.477696, 51.117351],
    [0.152304, 51.867351],
    [-0.627696, 51.347351],
    [0.402304, 51.737351],
    [-0.057696, 51.107351],
    [-0.457696, 51.787351],
    [0.362304, 51.627351],
  ];

  features: Feature[] = this.coordinates.map((coordinates, i) => ({
    type: 'Feature',
    id: i.toString(),
    geometry: {
      type: 'Point',
      coordinates,
    },
  }));

  ngDoCheck() {
    console.log('do check');
  }

  onMarkerClick(event: unknown) {
    console.log(event);
  }

  onListenerClick(event: unknown) {
    console.log(event);
  }

  onHint(object?: YMapFeature | YMapMarker | YMapHotspot) {
    return object?.properties?.['anyNameKey'];
  }

  toggleLanguage() {
    this.lang = this.lang === 'ru_RU' ? 'en_US' : 'ru_RU';
    config$.next({ lang: this.lang, apikey: environment.apikey });
  }
}
