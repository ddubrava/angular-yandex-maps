import { Component } from '@angular/core';
import { YandexMapModule } from './angular-yandex-maps-module/services/yandex-map/yandex-map.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public mapState: YandexMapModule.IYandexMapState = {
    center: [60.169931, 24.938513],
    zoom: 13
  };

  public mapOptions: YandexMapModule.IYandexMapOptions = {
    maxZoom: 15
  };
}
