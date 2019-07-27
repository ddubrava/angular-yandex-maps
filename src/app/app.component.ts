import { Component } from '@angular/core';
import { YandexMapModule } from 'projects/angular8-yandex-maps/src/public-api';

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
