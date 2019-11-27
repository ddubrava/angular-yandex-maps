import { Observable } from 'rxjs';

export interface IYandexMapService {
  initScript(): Observable<any>;
}
