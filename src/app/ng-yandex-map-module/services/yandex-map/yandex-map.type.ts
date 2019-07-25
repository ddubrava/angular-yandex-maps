import { Subject } from 'rxjs';

export namespace YandexMapModule {
  export interface IYandexMapService {
    initMap(element: string, options: any): Subject<any>;
  }
}
