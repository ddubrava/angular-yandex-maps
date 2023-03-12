import { ChangeDetectionStrategy, Component } from '@angular/core';
import { YaReadyEvent } from 'angular8-yandex-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
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
}
