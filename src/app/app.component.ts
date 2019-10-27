import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public geoObjectFeature = {
    geometry: {
      type: 'Rectangle',
      coordinates: [
          [60.183155, 24.911892],
          [60.156454, 24.962433]
      ]
    }
  };
}
