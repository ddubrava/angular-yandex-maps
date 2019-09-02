import { Subject } from 'rxjs';
import { YandexMapModule } from 'angular8-yandex-maps/public-api';

export interface IYandexMapService {
  initMap(): Subject<boolean>;
  createMap(mapId: string, state: YandexMapModule.IYandexMapState, options: YandexMapModule.IYandexMapOptions): void;
  createPlacemark(geometry: Array<number>): void;
}
