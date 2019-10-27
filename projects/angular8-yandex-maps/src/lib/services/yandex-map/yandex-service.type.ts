import { Subject } from 'rxjs';

export interface IYandexMapService {
  initMap(): Subject<boolean>;
  createMap(mapId: string, state: any, options: any): void;
  createPlacemark(geometry: any, properties: any, options: any): void;
  createMultiroute(model: any, options: any): void;
  createGeoObject(feature: any, options: any): void;
}
