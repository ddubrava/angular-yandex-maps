import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import type { YMapFeature, YMapHotspot, YMapMarker } from '@yandex/ymaps3-types/imperative';
import {
  YConfig,
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
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // Do not enable OnPush, otherwise, we can't catch performance issues.
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements DoCheck {
  lang: YConfig['lang'] = 'ru_RU';

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
