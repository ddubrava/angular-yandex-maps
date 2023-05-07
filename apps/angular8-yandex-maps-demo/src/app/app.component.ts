import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { YaReadyEvent } from 'angular8-yandex-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements DoCheck {
  coordinates = new Array(3000).fill(null).map(() => {
    const max = 55;
    const min = 35;

    const lat = Math.random() * (max - min) + min;
    const lon = Math.random() * (max - min) + min;

    return [lat, lon];
  });

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
}
