import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IEvent, ILoadEvent } from '../../models/models';

import { ScriptService } from '../../services/script/script.service';
import { generateRandomId } from '../../utils/generateRandomId';
import { removeLeadingSpaces } from '../../utils/removeLeadingSpaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ya-panorama',
  templateUrl: './ya-panorama.component.html',
  styleUrls: ['./ya-panorama.component.scss']
})
export class YaPanoramaComponent implements OnInit, OnChanges {
  @ViewChild('container', { static: false }) public panoramaContainer: ElementRef;

  @Input() public point: Array<number>;
  @Input() public layer: string;
  @Input() public options: any;

  @Output() public load = new EventEmitter<ILoadEvent>();
  @Output() public direction = new EventEmitter<IEvent>();
  @Output() public fullscreen = new EventEmitter<IEvent>();
  @Output() public marker = new EventEmitter<IEvent>();

  // Yandex.Maps API
  private _player: any;

  constructor(private _scriptService: ScriptService) { }

  public ngOnInit(): void {
    this._logErrors();

    this._scriptService.initScript()
      .pipe(take(1))
      .subscribe((ymaps: any) => {
        this._createPanorama(ymaps, generateRandomId());
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._configPanorama(changes);
  }

  /**
   * Method for dynamic entity configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _configPanorama(changes: SimpleChanges): void {
    const player = this._player;

    if (!player) return;

    const { point, layer, options } = changes;

    if (point) {
      player.moveTo(point.currentValue, layer ? { layer: layer.currentValue } : {});
    }

    if (layer && !point) {
      console.error('Panorama: You cannot change the layer without point');
    }

    if (options) {
      console.error(removeLeadingSpaces(`
        The options of Panorama cannot be changed after entity init.

        Solutions:
        1. Use ymaps from ILoadEvent
        2. Recreate Panorama component with new options
      `));
    }
  }

  private _logErrors(): void {
    if (!this.point) {
      console.error('Panorama: point input is required.');
      this.point = [];
    }
  }

  /**
   * Create panorama with player
   * @param ymaps
   * @param id - unique id
   */
  private _createPanorama(ymaps: any, id: string): void {
    const containerElem: HTMLElement = this.panoramaContainer.nativeElement;
    containerElem.setAttribute('id', id);
    containerElem.style.cssText = 'width: 100%; height: 100%;';

    ymaps.panorama.locate(this.point, { layer: this.layer })
      .then((panorama: any) => {
        const player = new ymaps.panorama.Player(id, panorama[0], this.options);
        this._player = player;

        this.emitEvents(ymaps, player);
      });
  }

  /**
   * Emit events
   * @param ymaps
   * @param player - player instance
   */
  public emitEvents(ymaps: any, player: any): void {
    this.load.emit({ ymaps, instance: player });

    // Direction
    player.events
      .add(
        'directionchange',
        (e: any) => this.direction.emit({ ymaps, instance: player, type: e.originalEvent.type, event: e })
      );

    // Fullscreen
    player.events
      .add(
        ['fullscreenenter', 'fullscreenexit'],
        (e: any) => this.fullscreen.emit({ ymaps, instance: player, type: e.originalEvent.type, event: e })
      );

    // Marker
    player.events
      .add(
        ['markercollapse', 'markerexpand', 'markermouseenter', 'markermouseleave'],
        (e: any) => this.marker.emit({ ymaps, instance: player, type: e.originalEvent.type, event: e })
      );
  }
}
