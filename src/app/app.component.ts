import { Component } from '@angular/core';
import { YandexMapModule } from 'projects/angular8-yandex-maps/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public mapOptions: YandexMapModule.IYandexMapOptions = {
    maxZoom: 12
  };
}
