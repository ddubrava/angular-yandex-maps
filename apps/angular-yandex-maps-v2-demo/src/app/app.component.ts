import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { AngularYandexMapsModule, YaConfig, YaReadyEvent } from 'angular8-yandex-maps';

import { environment } from '../environments/environment';
import { config$ } from './app.config';

@Component({
  imports: [AngularYandexMapsModule, NgForOf],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // Do not enable OnPush, otherwise, we can't catch performance issues.
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements DoCheck {
  coordinates = new Array(3000).fill(null).map(() => {
    const max = 55;
    const min = 35;

    const lat = Math.random() * (max - min) + min;
    const lon = Math.random() * (max - min) + min;

    return [lat, lon];
  });

  lang: YaConfig['lang'] = 'ru_RU';

  onObjectManagerReady({ target }: YaReadyEvent<ymaps.ObjectManager>) {
    target.objects.options.set('preset', 'islands#grayIcon');

    const allCoordinates = [
      [55.751952, 37.600739],
      [55.721312, 37.791323],
      [55.692309, 37.481239],
      [55.771325, 37.419208],
    ];

    allCoordinates.forEach((coordinates, index) => {
      target.add({
        type: 'Feature',
        id: index,
        geometry: {
          type: 'Point',
          coordinates,
        },
        properties: {
          hintContent: 'Содержание всплывающей подсказки',
          balloonContent: 'Содержание балуна',
        },
      });
    });
  }

  ngDoCheck() {
    console.log('do check');
  }

  toggleLanguage() {
    this.lang = this.lang === 'ru_RU' ? 'en_US' : 'ru_RU';
    config$.next({ lang: this.lang, apikey: environment.apikey });
  }
}
