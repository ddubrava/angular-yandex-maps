import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { YandexMapService } from '../../services/yandex-map/yandex-map.service';
import { take } from 'rxjs/operators';
import { generateRandomId } from '../../utils/utils';
import { IEvent } from '../../types/types';

@Component({
  selector: 'angular-yandex-panorama',
  templateUrl: './yandex-panorama.component.html',
  styleUrls: ['./yandex-panorama.component.scss']
})
export class YandexPanoramaComponent implements OnInit {
  @ViewChild('container') public panoramaContainer: ElementRef;

  @Input() public point: Array<number>;
  @Input() public layer: string;
  @Input() public options: any;

  @Output() public load = new EventEmitter<any>();
  @Output() public direction = new EventEmitter<IEvent>();
  @Output() public fullscreen = new EventEmitter<IEvent>();
  @Output() public marker = new EventEmitter<IEvent>();

  constructor(private _yandexMapService: YandexMapService) { }

  public ngOnInit(): void {
    this._logErrors();

    this._yandexMapService.initScript()
      .pipe(take(1))
      .subscribe((ymaps: any) => {
        this._createPanorama(ymaps, generateRandomId());
      });
  }

  private _logErrors(): void {
    if (!this.point) {
      console.error('Panorama: point input is required.');
      this.point = [];
    }
  }

  /**
   * Create panorama
   * @param ymaps - class from Yandex.Map API
   * @param id - unique id
   */
  private _createPanorama(ymaps: any, id: string): void {
    this.panoramaContainer.nativeElement.setAttribute('id', id);

    ymaps.panorama.locate(this.point, { layer: this.layer })
      .then((panorama: any) => {
        const player = new ymaps.panorama.Player(id, panorama[0], this.options);
        this.emitEvents(player);
      });
  }

  /**
   * Emit events
   * @param player - player instance
   */
  public emitEvents(player: any): void {
    this.load.emit(player);

    // Direction
    player.events
      .add(
        'directionchange',
        (e: any) => this.direction.emit({ instance: player, type: e.originalEvent.type, event: e })
      );

    // Fullscreen
    player.events
      .add(
        ['fullscreenenter', 'fullscreenexit'],
        (e: any) => this.fullscreen.emit({ instance: player, type: e.originalEvent.type, event: e })
      );

    // Marker
    player.events
      .add(
        ['markercollapse', 'markerexpand', 'markermouseenter', 'markermouseleave'],
        (e: any) => this.marker.emit({ instance: player, type: e.originalEvent.type, event: e })
      );
  }
}
