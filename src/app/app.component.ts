import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public mapOptions: any = {
    center: [60.169931, 24.938513],
    zoom: 13
  };
}
