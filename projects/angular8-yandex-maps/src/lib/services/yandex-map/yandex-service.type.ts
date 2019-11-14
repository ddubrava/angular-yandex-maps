import { Subject } from 'rxjs';

export interface IYandexMapService {
  initScript(): Subject<any>;
}
