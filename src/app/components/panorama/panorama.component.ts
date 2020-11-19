import { Component } from '@angular/core';

@Component({
  selector: 'app-panorama',
  templateUrl: './panorama.component.html',
  styleUrls: ['./panorama.component.css'],
})
export class PanoramaComponent {
  public onEvent(event): void {
    console.log(event);
  }

  ngDoCheck(): void {
    console.log(true);
  }
}
