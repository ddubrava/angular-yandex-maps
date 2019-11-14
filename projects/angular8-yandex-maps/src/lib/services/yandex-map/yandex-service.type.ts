import { Subject } from 'rxjs';

export interface IYandexMapService {
  initScript(): Subject<any>;
  createMap(mapId: string, state: any, options: any): void;
  addPlacemark(geometry: any, properties: any, options: any): void;
  addMultiroute(model: any, options: any): void;
  addGeoObject(feature: any, options: any): void;
  addSearchControl(request: string, properties: any): void;
}
