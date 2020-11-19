import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { generateRandomId } from '../../utils/generateRandomId';
import { YaEvent, YaReadyEvent } from '../../interfaces/event';
import { removeLeadingSpaces } from '../../utils/removeLeadingSpaces';
import { ScriptService } from '../../services/script/script.service';
import { Listener } from '../../interfaces/listener';

/**
 * Component for creating and controlling the panorama player.
 *
 * @example `<ya-panorama [point]="[59.938557, 30.316198]" layer="yandex#airPanorama"></ya-panorama>`.
 * @see {@link https://ddubrava.github.io/angular8-yandex-maps/#/components/panorama}
 */
@Component({
  selector: 'ya-panorama',
  templateUrl: './ya-panorama.component.html',
  styleUrls: ['./ya-panorama.component.scss'],
})
export class YaPanoramaComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('container') public panoramaContainer: ElementRef;

  /**
   * The point for searching for nearby panoramas.
   */
  @Input() public point: Array<number>;

  /**
   * The layer to search for panoramas.
   */
  @Input() public layer: 'yandex#panorama' | 'yandex#airPanorama';

  /**
   * Options for the player.
   * @see {@link https://tech.yandex.com/maps/jsapi/doc/2.1/ref/reference/panorama.Player-docpage/#panorama.Playerparam-options}
   */
  @Input() public options: any;

  /**
   * Emits immediately after this entity is added in root container.
   */
  @Output() public ready = new EventEmitter<YaReadyEvent>();

  /**
   * The player was closed by the user or destroyed using the panorama.Player.destroy method.
   */
  @Output() public destroy = new EventEmitter<YaEvent>();

  /**
   * The view direction changed.
   */
  @Output() public directionchange = new EventEmitter<YaEvent>();

  /**
   * An error occurred during operation of the player. The user will be shown the appropriate screen.
   */
  @Output() public yaerror = new EventEmitter<YaEvent>();

  /**
   * The panorama player switched to full-screen mode.
   */
  @Output() public fullscreenenter = new EventEmitter<YaEvent>();

  /**
   * The panorama player exited full-screen mode.
   */
  @Output() public fullscreenexit = new EventEmitter<YaEvent>();

  /**
   * The user clicked on an expanded marker.
   */
  @Output() public markercollapse = new EventEmitter<YaEvent>();

  /**
   * The user clicked on a collapsed marker.
   */
  @Output() public markerexpand = new EventEmitter<YaEvent>();

  /**
   * The user's cursor hovered over a marker.
   */
  @Output() public markermouseenter = new EventEmitter<YaEvent>();

  /**
   * The user's cursor left a marker.
   */
  @Output() public markermouseleave = new EventEmitter<YaEvent>();

  /**
   * The open panorama changed.
   */
  @Output() public panoramachange = new EventEmitter<YaEvent>();

  /**
   * The size of the viewport has been changed.
   */
  @Output() public spanchange = new EventEmitter<YaEvent>();

  private _sub: Subscription;

  // Yandex.Maps API.
  private _player: ymaps.panorama.Player;

  constructor(private _ngZone: NgZone, private _scriptService: ScriptService) {}

  public ngOnInit(): void {
    this._sub = new Subscription();

    this._logErrors();
    this._initScript();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._updatePanorama(changes);
  }

  /**
   * Method for dynamic Panorama configuration.
   * Handles input changes and provides it to API.
   * @param changes
   */
  private _updatePanorama(changes: SimpleChanges): void {
    const player = this._player;

    if (!player) return;

    const { point, layer, options } = changes;

    if (point) {
      player.moveTo(
        point.currentValue,
        layer ? { layer: layer.currentValue } : {},
      );
    }

    if (layer && !point) {
      console.error('Panorama: You cannot change the layer without point');
    }

    if (options) {
      console.error(
        removeLeadingSpaces(`
        The options of Panorama cannot be changed after entity init.

        Solutions:
        1. Use ymaps from YaReadyEvent
        2. Recreate Panorama component with new options
      `),
      );
    }
  }

  private _logErrors(): void {
    if (!this.point) {
      console.error('Panorama: point input is required.');
      this.point = [];
    }
  }

  private _initScript(): void {
    const sub = this._scriptService.initScript().subscribe(() => {
      const id = generateRandomId();
      this._createPanorama(id);
    });

    this._sub.add(sub);
  }

  /**
   * Creates panorama with the player.
   * @param id ID which will be set to the panorama container.
   */
  private _createPanorama(id: string): void {
    const containerElem: HTMLElement = this.panoramaContainer.nativeElement;
    containerElem.setAttribute('id', id);
    containerElem.style.cssText = 'width: 100%; height: 100%;';

    /**
     * Wrong typings in DefinitelyTyped.
     */
    (ymaps.panorama as any)
      .locate(this.point, { layer: this.layer })
      .then((panorama: ymaps.IPanorama[]) => {
        const player = new ymaps.panorama.Player(id, panorama[0], this.options);
        this._player = player;

        this.addEventListeners();
      });
  }

  /**
   * Adds listeners on the Panorama events.
   */
  public addEventListeners(): void {
    const player = this._player;

    const listeners: Listener[] = [
      { name: 'destroy', emitter: this.destroy },
      { name: 'directionchange', emitter: this.directionchange },
      { name: 'error', emitter: this.yaerror },
      { name: 'fullscreenenter', emitter: this.fullscreenenter },
      { name: 'fullscreenexit', emitter: this.fullscreenexit },
      { name: 'markercollapse', emitter: this.markercollapse },
      { name: 'markerexpand', emitter: this.markerexpand },
      { name: 'markermouseenter', emitter: this.markermouseenter },
      { name: 'markermouseleave', emitter: this.markermouseleave },
      { name: 'panoramachange', emitter: this.panoramachange },
      { name: 'spanchange', emitter: this.spanchange },
    ];

    const fn = (event: ymaps.Event): YaEvent => ({
      event,
      instance: player,
      ymaps,
    });

    listeners.forEach((listener) => {
      player.events.add(listener.name, (e: ymaps.Event) =>
        listener.runOutsideAngular
          ? this._ngZone.runOutsideAngular(() => listener.emitter.emit(fn(e)))
          : this._ngZone.run(() => listener.emitter.emit(fn(e))),
      );
    });

    this._ngZone.run(() => this.ready.emit({ ymaps, instance: player }));
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
