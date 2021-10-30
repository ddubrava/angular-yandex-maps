/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */

/**
 * Type definitions for Yandex.Maps.
 * Due to inactivity the typings were copied and improved from the DefinitelyTyped repository.
 * Definitions by: Delagen <https://github.com/Delagen> / gastwork13 <https://github.com/gastwork13>.
 * @link https://www.npmjs.com/package/@types/yandex-maps
 * @link https://yandex.com/dev/maps/jsapi/doc/2.1/ref/concepts/About.html
 */
declare namespace ymaps {
  interface IClassConstructor<T> {
    superclass: any;

    new (): T;
  }

  type ControlSingleKey =
    | 'fullscreenControl'
    | 'geolocationControl'
    | 'routeEditor'
    | 'rulerControl'
    | 'searchControl'
    | 'trafficControl'
    | 'typeSelector'
    | 'zoomControl'
    | 'routeButtonControl'
    | 'routePanelControl';

  type ControlSetKey =
    | 'smallMapDefaultSet'
    | 'mediumMapDefaultSet'
    | 'largeMapDefaultSet'
    | 'default';

  type ControlKey = ControlSingleKey | ControlSetKey;

  type OverlayKey =
    | 'default#placemark'
    | 'default#pin'
    | 'default#circle'
    | 'default#rectangle'
    | 'default#polyline'
    | 'default#polygon'
    | 'hotspot#placemark'
    | 'hotspot#circle'
    | 'hotspot#rectangle'
    | 'hotspot#polyline'
    | 'hotspot#polygon'
    | 'html#balloon'
    | 'html#hint'
    | 'html#placemark'
    | 'html#rectangle'
    | string
    | IClassConstructor<IOverlay>
    | ((
        geometry: IPixelLineStringGeometry,
        data: IDataManager | object,
        options: object,
      ) => Promise<string | IClassConstructor<IOverlay>>);

  type InteractivityModelKey =
    | 'default#opaque'
    | 'default#geoObject'
    | 'default#layer'
    | 'default#transparent'
    | 'default#silent'
    | string;

  type PresetWithTextKey =
    | 'islands#blueIcon'
    | 'islands#darkGreenIcon'
    | 'islands#redIcon'
    | 'islands#violetIcon'
    | 'islands#darkOrangeIcon'
    | 'islands#blackIcon'
    | 'islands#nightIcon'
    | 'islands#yellowIcon'
    | 'islands#darkBlueIcon'
    | 'islands#greenIcon'
    | 'islands#pinkIcon'
    | 'islands#orangeIcon'
    | 'islands#grayIcon'
    | 'islands#lightBlueIcon'
    | 'islands#brownIcon'
    | 'islands#oliveIcon';

  type PresetWithTextStretchyKey =
    | 'islands#blueStretchyIcon'
    | 'islands#darkGreenStretchyIcon'
    | 'islands#redStretchyIcon'
    | 'islands#violetStretchyIcon'
    | 'islands#darkOrangeStretchyIcon'
    | 'islands#blackStretchyIcon'
    | 'islands#nightStretchyIcon'
    | 'islands#yellowStretchyIcon'
    | 'islands#darkBlueStretchyIcon'
    | 'islands#greenStretchyIcon'
    | 'islands#pinkStretchyIcon'
    | 'islands#orangeStretchyIcon'
    | 'islands#grayStretchyIcon'
    | 'islands#lightBlueStretchyIcon'
    | 'islands#brownStretchyIcon'
    | 'islands#oliveStretchyIcon';

  type PresetDotKey =
    | 'islands#blueDotIcon'
    | 'islands#darkGreenDotIcon'
    | 'islands#redDotIcon'
    | 'islands#violetDotIcon'
    | 'islands#darkOrangeDotIcon'
    | 'islands#blackDotIcon'
    | 'islands#nightDotIcon'
    | 'islands#yellowDotIcon'
    | 'islands#darkBlueDotIcon'
    | 'islands#greenDotIcon'
    | 'islands#pinkDotIcon'
    | 'islands#orangeDotIcon'
    | 'islands#grayDotIcon'
    | 'islands#lightBlueDotIcon'
    | 'islands#brownDotIcon'
    | 'islands#oliveDotIcon';

  type PresetCircleKey =
    | 'islands#blueCircleIcon'
    | 'islands#darkGreenCircleIcon'
    | 'islands#redCircleIcon'
    | 'islands#violetCircleIcon'
    | 'islands#darkOrangeCircleIcon'
    | 'islands#blackCircleIcon'
    | 'islands#nightCircleIcon'
    | 'islands#yellowCircleIcon'
    | 'islands#darkBlueCircleIcon'
    | 'islands#greenCircleIcon'
    | 'islands#pinkCircleIcon'
    | 'islands#orangeCircleIcon'
    | 'islands#grayCircleIcon'
    | 'islands#lightBlueCircleIcon'
    | 'islands#brownCircleIcon'
    | 'islands#oliveCircleIcon';

  type PresetCircleDotKey =
    | 'islands#blueCircleDotIcon'
    | 'islands#darkGreenCircleDotIcon'
    | 'islands#redCircleDotIcon'
    | 'islands#violetCircleDotIcon'
    | 'islands#darkOrangeCircleDotIcon'
    | 'islands#blackCircleDotIcon'
    | 'islands#nightCircleDotIcon'
    | 'islands#yellowCircleDotIcon'
    | 'islands#darkBlueCircleDotIcon'
    | 'islands#greenCircleDotIcon'
    | 'islands#pinkCircleDotIcon'
    | 'islands#orangeCircleDotIcon'
    | 'islands#grayCircleDotIcon'
    | 'islands#lightBlueCircleDotIcon'
    | 'islands#brownCircleDotIcon'
    | 'islands#oliveCircleDotIcon';

  type PresetWithIconKey =
    | 'islands#blueAirportIcon'
    | 'islands#blueAttentionIcon'
    | 'islands#blueAutoIcon'
    | 'islands#blueBarIcon'
    | 'islands#blueBarberIcon'
    | 'islands#blueBeachIcon'
    | 'islands#blueBicycleIcon'
    | 'islands#blueBicycle2Icon'
    | 'islands#blueBookIcon'
    | 'islands#blueCarWashIcon'
    | 'islands#blueChristianIcon'
    | 'islands#blueCinemaIcon'
    | 'islands#blueCircusIcon'
    | 'islands#blueCourtIcon'
    | 'islands#blueDeliveryIcon'
    | 'islands#blueDiscountIcon'
    | 'islands#blueDogIcon'
    | 'islands#blueEducationIcon'
    | 'islands#blueEntertainmentCenterIcon'
    | 'islands#blueFactoryIcon'
    | 'islands#blueFamilyIcon'
    | 'islands#blueFashionIcon'
    | 'islands#blueFoodIcon'
    | 'islands#blueFuelStationIcon'
    | 'islands#blueGardenIcon'
    | 'islands#blueGovernmentIcon'
    | 'islands#blueHeartIcon'
    | 'islands#blueHomeIcon'
    | 'islands#blueHotelIcon'
    | 'islands#blueHydroIcon'
    | 'islands#blueInfoIcon'
    | 'islands#blueLaundryIcon'
    | 'islands#blueLeisureIcon'
    | 'islands#blueMassTransitIcon'
    | 'islands#blueMedicalIcon'
    | 'islands#blueMoneyIcon'
    | 'islands#blueMountainIcon'
    | 'islands#blueNightClubIcon'
    | 'islands#blueObservationIcon'
    | 'islands#blueParkIcon'
    | 'islands#blueParkingIcon'
    | 'islands#bluePersonIcon'
    | 'islands#bluePocketIcon'
    | 'islands#bluePoolIcon'
    | 'islands#bluePostIcon'
    | 'islands#blueRailwayIcon'
    | 'islands#blueRapidTransitIcon'
    | 'islands#blueRepairShopIcon'
    | 'islands#blueRunIcon'
    | 'islands#blueScienceIcon'
    | 'islands#blueShoppingIcon'
    | 'islands#blueSouvenirsIcon'
    | 'islands#blueSportIcon'
    | 'islands#blueStarIcon'
    | 'islands#blueTheaterIcon'
    | 'islands#blueToiletIcon'
    | 'islands#blueUnderpassIcon'
    | 'islands#blueVegetationIcon'
    | 'islands#blueVideoIcon'
    | 'islands#blueWasteIcon'
    | 'islands#blueWaterParkIcon'
    | 'islands#blueWaterwayIcon'
    | 'islands#blueWorshipIcon'
    | 'islands#blueZooIcon';

  type PresetWithIconCircleKey =
    | 'islands#blueHomeCircleIcon'
    | 'islands#blueScienceCircleIcon'
    | 'islands#blueAirportCircleIcon'
    | 'islands#blueAttentionCircleIcon'
    | 'islands#blueAutoCircleIcon'
    | 'islands#blueBarCircleIcon'
    | 'islands#blueBarberCircleIcon'
    | 'islands#blueBeachCircleIcon'
    | 'islands#blueBicycleCircleIcon'
    | 'islands#blueBicycle2CircleIcon'
    | 'islands#blueBookCircleIcon'
    | 'islands#blueCarWashCircleIcon'
    | 'islands#blueChristianCircleIcon'
    | 'islands#blueCinemaCircleIcon'
    | 'islands#blueCircusCircleIcon'
    | 'islands#blueCourtCircleIcon'
    | 'islands#blueDeliveryCircleIcon'
    | 'islands#blueDiscountCircleIcon'
    | 'islands#blueDogCircleIcon'
    | 'islands#blueEducationCircleIcon'
    | 'islands#blueEntertainmentCenterCircleIcon'
    | 'islands#blueFactoryCircleIcon'
    | 'islands#blueFamilyCircleIcon'
    | 'islands#blueFashionCircleIcon'
    | 'islands#blueFoodCircleIcon'
    | 'islands#blueFuelStationCircleIcon'
    | 'islands#blueGardenCircleIcon'
    | 'islands#blueGovernmentCircleIcon'
    | 'islands#blueHeartCircleIcon'
    | 'islands#blueHotelCircleIcon'
    | 'islands#blueHydroCircleIcon'
    | 'islands#blueInfoCircleIcon'
    | 'islands#blueLaundryCircleIcon'
    | 'islands#blueLeisureCircleIcon'
    | 'islands#blueMassTransitCircleIcon'
    | 'islands#blueMedicalCircleIcon'
    | 'islands#blueMoneyCircleIcon'
    | 'islands#blueMountainCircleIcon'
    | 'islands#blueNightClubCircleIcon'
    | 'islands#blueObservationCircleIcon'
    | 'islands#blueParkCircleIcon'
    | 'islands#blueParkingCircleIcon'
    | 'islands#bluePersonCircleIcon'
    | 'islands#bluePocketCircleIcon'
    | 'islands#bluePoolCircleIcon'
    | 'islands#bluePostCircleIcon'
    | 'islands#blueRailwayCircleIcon'
    | 'islands#blueRapidTransitCircleIcon'
    | 'islands#blueRepairShopCircleIcon'
    | 'islands#blueRunCircleIcon'
    | 'islands#blueShoppingCircleIcon'
    | 'islands#blueSouvenirsCircleIcon'
    | 'islands#blueSportCircleIcon'
    | 'islands#blueStarCircleIcon'
    | 'islands#blueTheaterCircleIcon'
    | 'islands#blueToiletCircleIcon'
    | 'islands#blueUnderpassCircleIcon'
    | 'islands#blueVegetationCircleIcon'
    | 'islands#blueVideoCircleIcon'
    | 'islands#blueWasteCircleIcon'
    | 'islands#blueWaterParkCircleIcon'
    | 'islands#blueWaterwayCircleIcon'
    | 'islands#blueWorshipCircleIcon'
    | 'islands#blueZooCircleIcon';

  type PresetPictogramKey = 'islands#geolocationIcon';

  type PresetClusterKey =
    | 'islands#blueClusterIcons'
    | 'islands#invertedBlueClusterIcons'
    | 'islands#redClusterIcons'
    | 'islands#invertedRedClusterIcons'
    | 'islands#darkOrangeClusterIcons'
    | 'islands#invertedDarkOrangeClusterIcons'
    | 'islands#nightClusterIcons'
    | 'islands#invertedNightClusterIcons'
    | 'islands#darkBlueClusterIcons'
    | 'islands#invertedDarkBlueClusterIcons'
    | 'islands#pinkClusterIcons'
    | 'islands#invertedPinkClusterIcons'
    | 'islands#grayClusterIcons'
    | 'islands#invertedGrayClusterIcons'
    | 'islands#brownClusterIcons'
    | 'islands#invertedBrownClusterIcons'
    | 'islands#darkGreenClusterIcons'
    | 'islands#invertedDarkGreenClusterIcons'
    | 'islands#violetClusterIcons'
    | 'islands#invertedVioletClusterIcons'
    | 'islands#blackClusterIcons'
    | 'islands#invertedBlackClusterIcons'
    | 'islands#yellowClusterIcons'
    | 'islands#invertedYellowClusterIcons'
    | 'islands#greenClusterIcons'
    | 'islands#invertedGreenClusterIcons'
    | 'islands#orangeClusterIcons'
    | 'islands#invertedOrangeClusterIcons'
    | 'islands#lightBlueClusterIcons'
    | 'islands#invertedLightBlueClusterIcons'
    | 'islands#oliveClusterIcons'
    | 'islands#invertedOliveClusterIcons';

  type PresetKey =
    | PresetWithTextKey
    | PresetWithTextStretchyKey
    | PresetDotKey
    | PresetCircleKey
    | PresetCircleDotKey
    | PresetWithIconKey
    | PresetWithIconCircleKey
    | PresetPictogramKey
    | PresetClusterKey
    | string;

  type IconLayoutKey = 'default#image' | 'default#imageWithContent' | string;

  type ClusterLayoutKey =
    | 'cluster#balloonTwoColumns'
    | 'cluster#balloonCarousel'
    | 'cluster#balloonAccordion'
    | string;

  type ClusterContentLayoutKey =
    | 'cluster#balloonTwoColumnsItemContent'
    | 'cluster#balloonCarouselItemContent'
    | 'cluster#balloonAccordionItemContent'
    | string;

  type EventMap = GlobalEventHandlersEventMap;

  namespace behavior {
    class DblClickZoom implements IBehavior {
      constructor(options?: IDblClickZoomOptions);

      events: IEventManager;

      options: IOptionManager;

      disable(): void;

      enable(): void;

      isEnabled(): boolean;

      getParent(): IControlParent | null;

      setParent(parent: IControlParent): this;
    }

    interface IDblClickZoomOptions extends IMapMarginOptions {
      centering?: boolean;
      duration?: number;
    }

    class Drag implements IBehavior {
      constructor(options?: IDragOptions);

      events: IEventManager;

      options: IOptionManager;

      disable(): void;

      enable(): void;

      isEnabled(): boolean;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;
    }

    interface IDragOptions {
      actionCursor?: string;
      cursor?: string;
      inertia?: boolean;
      inertiaDuration?: number;
      tremor?: number;
    }

    class LeftMouseButtonMagnifier implements IBehavior {
      constructor(options?: ILeftMouseButtonMagnifierOptions);

      events: IEventManager;

      options: IOptionManager;

      disable(): void;

      enable(): void;

      isEnabled(): boolean;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;
    }

    interface ILeftMouseButtonMagnifierOptions {
      actionCursor?: string;
      cursor?: string;
      duration?: number;
    }

    class MultiTouch implements IBehavior {
      constructor(options?: IMultiTouchOptions);

      events: IEventManager;

      options: IOptionManager;

      disable(): void;

      enable(): void;

      isEnabled(): boolean;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;
    }

    interface IMultiTouchOptions {
      tremor?: number;
    }

    class RightMouseButtonMagnifier implements IBehavior {
      constructor(options?: IRightMouseButtonMagnifierOptions);

      events: IEventManager;

      options: IOptionManager;

      disable(): void;

      enable(): void;

      isEnabled(): boolean;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;
    }

    interface IRightMouseButtonMagnifierOptions {
      actionCursor?: string;
      duration?: number;
    }

    class RouteEditor implements IBehavior {
      events: IEventManager;

      options: IOptionManager;

      disable(): void;

      enable(): void;

      isEnabled(): boolean;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;

      getRoute(): router.Route;

      getState(): string;

      setState(state: string | null): void;
    }

    class Ruler implements IBehavior {
      constructor(options?: IRulerOptions);

      events: IEventManager;

      options: IOptionManager;

      disable(): void;

      enable(): void;

      isEnabled(): boolean;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;

      close(): boolean;

      getState(): string;

      setState(state: string | null): void;
    }

    interface IRulerOptions {
      balloonAutoPan?: boolean;
    }

    class ScrollZoom implements IBehavior {
      constructor(options?: IScrollZoomOptions);

      events: IEventManager;

      options: IOptionManager;

      disable(): void;

      enable(): void;

      isEnabled(): boolean;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;
    }

    interface IScrollZoomOptions {
      maximumDelta?: number;
      speed?: number;
    }

    const storage: util.Storage;
  }

  namespace clusterer {
    class Balloon implements IBalloonManager<Clusterer> {
      constructor(clusterer: Clusterer);

      events: IEventManager;

      autoPan(): Promise<Clusterer>;

      close(force?: boolean): Promise<Clusterer>;

      destroy(): void;

      getData(): object | null;

      getOptions(): IOptionManager | null;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getPosition(): number[] | null;

      isOpen(): boolean;

      open(
        position?: number[],
        data?: object | string | HTMLElement,
        options?: object,
      ): Promise<Clusterer>;

      setData(data: object | string | HTMLElement): Promise<Clusterer>;

      setOptions(options: object): Promise<Clusterer>;

      setPosition(position: number[]): Promise<Clusterer>;
    }

    class Hint implements IHintManager<Clusterer> {
      constructor(clusterer: Clusterer);

      events: IEventManager;

      close(force?: boolean): Promise<Clusterer>;

      destroy(): void;

      getData(): object | null;

      getOptions(): IOptionManager | null;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getPosition(): number[] | null;

      isOpen(): boolean;

      open(
        position?: number[],
        data?: object | string | HTMLElement,
        options?: object,
      ): Promise<Clusterer>;

      setData(data: object | string | HTMLElement): Promise<Clusterer>;

      setOptions(options: object): Promise<Clusterer>;

      setPosition(position: number[]): Promise<Clusterer>;
    }
  }

  namespace collection {
    class Item implements IChildOnMap, ICustomizable, IEventEmitter, IParentOnMap {
      constructor(options?: object);

      events: IEventManager;

      options: IOptionManager;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;

      getMap(): Map;

      onAddToMap(map: Map): void;

      onRemoveFromMap(oldMap: Map): void;
    }
  }

  namespace control {
    class Button implements ICustomizable, ISelectableControl {
      constructor(parameters?: IButtonParameters | string);

      options: IOptionManager;

      events: IEventManager;

      data: data.Manager;

      state: data.Manager;

      deselect(): void;

      disable(): void;

      enable(): void;

      isEnabled(): boolean;

      isSelected(): boolean;

      select(): void;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;
    }

    interface IBaseButtonParametersOptions {
      adjustMapMargin?: boolean;
      float?: 'none' | 'left' | 'right';
      floatIndex?: number;
      layout?: IClassConstructor<ISelectableControlLayout> | string;
      maxWidth?: number[][] | number[] | number;
      position?: {
        bottom?: number | string;
        left?: number | string;
        right?: number | string;
        top?: number | string;
      };
      visible?: boolean;
    }

    interface IButtonParameters {
      data?: {
        content?: string;
        image?: string;
        title?: string;
      };
      options?: IBaseButtonParametersOptions & {
        selectOnClick?: boolean;
        size?: 'auto' | 'small' | 'medium' | 'large';
      };
      state?: {
        enabled?: boolean;
        selected?: boolean;
      };
    }

    class FullscreenControl extends Button {
      constructor(parameters?: IFullscreenControlParameters);

      enterFullscreen(): void;

      exitFullscreen(): void;
    }

    interface IFullscreenControlParameters {
      data?: {
        title?: string;
      };
      options?: IBaseButtonParametersOptions & {
        collapseOnBlur?: boolean;
        expandOnClick?: boolean;
        popupFloat?: 'left' | 'right';
      };
      state?: {
        expanded?: boolean;
      };
    }

    class GeolocationControl extends Button {
      constructor(parameters?: IGeolocationControlParameters);
    }

    interface IGeolocationControlParameters extends IButtonParameters {
      data?: {
        image?: string;
        title?: string;
      };
      options?: IBaseButtonParametersOptions;
    }

    class ListBox implements ICollection, IControl, ICustomizable {
      constructor(parameters?: IListBoxParameters);

      events: IEventManager;

      options: IOptionManager;

      data: data.Manager;

      state: data.Manager;

      add(object: object): this;

      getIterator(): IIterator;

      remove(object: object): this;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;
    }

    interface IListBoxParameters extends IButtonParameters {
      options?: IBaseButtonParametersOptions & {
        noPlacemark?: boolean;
      };
    }

    class ListBoxItem implements ICustomizable, ISelectableControl {
      constructor(parameters?: IListBoxItemParameters);

      options: IOptionManager;

      events: IEventManager;

      data: data.Manager;

      state: data.Manager;

      deselect(): void;

      disable(): void;

      enable(): void;

      isEnabled(): boolean;

      isSelected(): boolean;

      select(): void;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;

      getMap(): Map;
    }

    interface IListBoxItemParameters {
      data?: {
        content?: string;
      };
      options?: {
        layout?: string | IClassConstructor<ISelectableControlLayout>;
        selectableLayout?: string | IClassConstructor<ISelectableControlLayout>;
        selectOnClick?: boolean;
        separatorLayout?: string | IClassConstructor<ISelectableControlLayout>;
        type?: 'selectable' | 'separator';
        visible?: boolean;
      };
      state?: {
        selected?: boolean;
      };
    }

    class Manager {
      constructor(map: Map, controls?: Array<string | IControl>, options?: IManagerOptions);

      events: event.Manager;

      options: option.Manager;

      state: data.Manager;

      add(control: IControl | ControlKey, options?: IManagerControlOptions): this;

      each(callback: (control: IControl) => void, context?: object): this;

      get(index: number | string): IControl | null;

      getChildElement(control: IControl): Promise<HTMLElement>;

      getContainer(): HTMLElement;

      getMap(): Map;

      indexOf(childToFind: IControl | string): number;

      remove(control: IControl | string): this;
    }

    interface IManagerOptions {
      margin?: number;
      pane?: IPane;
      states?: string[];
    }

    interface IManagerControlOptions {
      float?: 'none' | 'left' | 'right';
      floatIndex?: number;
      position?: {
        bottom?: number | string;
        left?: number | string;
        right?: number | string;
        top?: number | string;
      };
    }

    class RouteButton implements IControl, ICustomizable {
      constructor(parameters?: IRouteButtonParameters);

      events: IEventManager;

      options: IOptionManager;

      routePanel: IRoutePanel;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;
    }

    interface IRouteButtonParameters {
      options?: {
        adjustMapMargin?: boolean;
        collapseOnBlur?: boolean;
        float?: 'none' | 'left' | 'right';
        floatIndex?: number;
        popupAnimate?: boolean;
        popupFloat?: 'auto' | 'left' | 'right';
        popupWidth?: string;
        position?: {
          bottom?: number | string;
          left?: number | string;
          right?: number | string;
          top?: number | string;
        };
        size?: 'auto' | 'small' | 'medium' | 'large';
        visible?: boolean;
      };
      state?: {
        expanded?: boolean;
      };
    }

    class RouteEditor extends Button {
      constructor(parameters?: IRouteEditorParameters);

      getRoute(): router.Route;
    }

    interface IRouteEditorParameters {
      data?: {
        image?: string;
        title?: string;
      };
      options?: IBaseButtonParametersOptions;
      state?: object;
    }

    class RoutePanel implements IControl, ICustomizable {
      constructor(parameters?: IRoutePanelParameters);

      events: IEventManager;

      options: IOptionManager;

      routePanel: IRoutePanel;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;
    }

    interface IRoutePanelParameters {
      options?: {
        autofocus?: boolean;
        float?: 'none' | 'left' | 'right';
        floatIndex?: number;
        maxWidth?: string;
        position?: {
          bottom?: number | string;
          left?: number | string;
          right?: number | string;
          top?: number | string;
        };
        showHeader?: boolean;
        title?: string;
        visible?: boolean;
        [key: string]: any;
      };
      state?: {
        fromEnabled?: boolean;
        from?: string;
        to?: string;
        type?: string;
        toEnabled?: boolean;
      };
    }

    class RulerControl extends Button {
      constructor(parameters?: IRulerControlParameters);
    }

    interface IRulerControlParameters {
      data?: object;
      options?: {
        adjustMapMargin?: boolean;
        position?: {
          bottom?: number | string;
          left?: number | string;
          right?: number | string;
          top?: number | string;
        };
        scaleLine?: boolean;
        visible?: boolean;
      };
      state?: object;
    }

    class SearchControl implements IControl, ICustomizable {
      constructor(parameters?: ISearchControlParameters);

      events: IEventManager;

      options: IOptionManager;

      state: data.Manager;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;

      clear(): void;

      getMap(): Map;

      getRequestString(): string;

      getResponseMetaData(): object;

      getResult(index: number): Promise<object>;

      getResultsArray(): object[];

      getResultsCount(): number;

      getSelectedIndex(): number;

      hideResult(): void;

      search(request: string): Promise<void>;

      showResult(index: number): this;
    }

    interface ISearchControlParameters {
      data?: object;
      options?: {
        adjustMapMargin?: boolean;
        boundedBy?: number[][];
        fitMaxWidth?: boolean;
        float?: 'none' | 'left' | 'right';
        floatIndex?: number;
        formLayout?: string | IClassConstructor<ILayout>;
        kind?: 'house' | 'street' | 'metro' | 'district' | 'locality';
        layout?: string | IClassConstructor<ISearchControlLayout>;
        maxWidth?: number[][] | number[] | number;
        noCentering?: boolean;
        noPlacemark?: boolean;
        noPopup?: boolean;
        noSelect?: boolean;
        noSuggestPanel?: boolean;
        placeholderContent?: string;
        popupItemLayout?: string | IClassConstructor<ILayout>;
        popupLayout?: string | IClassConstructor<ILayout>;
        position?: {
          bottom?: number | string;
          left?: number | string;
          right?: number | string;
          top?: number | string;
        };
        provider?: IGeocodeProvider | 'yandex#map' | 'yandex#search';
        searchCoordOrder?: 'latlong' | 'longlat';
        size?: 'auto' | 'small' | 'medium' | 'large';
        strictBounds?: boolean;
        suppressYandexSearch?: boolean;
        useMapBounds?: boolean;
        zoomMargin?: number;
        visible?: boolean;
      };
      state?: object;
    }

    const storage: util.Storage;

    class TrafficControl implements IControl, ICustomizable {
      constructor(parameters?: ITrafficControlParameters);

      data: data.Manager;

      events: IEventManager;

      options: IOptionManager;

      state: data.Manager;

      collapse(): void;

      expand(): void;

      getMap(): Map;

      getParent(): null | IControlParent;

      getProvider(key: TrafficControlProviderKey): ITrafficProvider;

      hideTraffic(): void;

      isExpanded(): boolean;

      isTrafficShown(): boolean;

      setParent(parent: IControlParent): this;

      showTraffic(): void;
    }

    type TrafficControlProviderKey = 'traffic#actual' | 'traffic#archive';

    interface ITrafficProvider extends ICustomizable, IEventEmitter {
      getMap(): Map | null;

      setMap(map: Map): void;
    }

    interface ITrafficControlParameters {
      options: {
        adjustMapMargin?: boolean;
        collapseOnBlur?: boolean;
        float?: 'none' | 'left' | 'right';
        floatIndex: number;
        layout?: string | IClassConstructor<ISelectableControlLayout>;
        maxWidth?: number | number[];
        position?: {
          bottom?: number | string;
          left?: number | string;
          right?: number | string;
          top?: number | string;
        };
        size?: string;
        visible?: boolean;
        state?: {
          providerKey?: TrafficControlProviderKey;
          trafficShown?: boolean;
        };
      };
    }

    class TypeSelector extends ListBox {
      constructor(parameters?: ITypeSelectorParameters);
    }

    interface ITypeSelectorParameters {
      options?: {
        panoramasItemMode: 'on' | 'off' | 'ifMercator';
      };
    }

    class ZoomControl implements IControl, ICustomizable {
      constructor(parameters?: IZoomControlParameters);

      events: IEventManager;

      options: IOptionManager;

      state: data.Manager;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;

      clear(): void;

      getMap(): Map;

      getRequestString(): string;

      getResponseMetaData(): object;

      getResult(index: number): Promise<object>;

      getResultsArray(): object[];

      getResultsCount(): number;

      getSelectedIndex(): number;

      hideResult(): void;

      search(request: string): Promise<void>;

      showResult(index: number): this;
    }

    interface IZoomControlParameters {
      data?: object;
      options?: {
        adjustMapMargin?: boolean;
        layout?: string | IClassConstructor<IZoomControlLayout>;
        float?: 'none' | 'left' | 'right';
        position?: {
          bottom?: number | string;
          left?: number | string;
          right?: number | string;
          top?: number | string;
        };
        size?: string;
        visible?: boolean;
        zoomDuration?: number;
        zoomStep?: number;
        state?: object;
      };
    }

    type IZoomControlLayout = ILayout;
  }

  namespace data {
    class Manager implements IDataManager, IFreezable {
      constructor(data?: object);

      events: IEventManager;

      get(path: string, defaultValue?: object): object;

      getAll(): object;

      set(path: object | string, value?: object | number | string | null | undefined): this;

      setAll(): this;

      unset(path: object | string): this;

      unsetAll(): this;

      freeze(): IFreezable;

      isFrozen(): boolean;

      unfreeze(): IFreezable;

      add(
        types: string[][] | string[] | string,
        callback: (event: object | IEvent) => void,
        context?: object,
        priority?: number,
      ): this;

      getParent(): IEventManager | null;

      group(): IEventGroup;

      remove(
        types: string[][] | string[] | string,
        callback: (event: object | IEvent) => void,
        context?: object,
        priority?: number,
      ): this;

      setParent(parent: IEventManager | null): this;

      fire(type: string, eventObject: object | IEvent): this;
    }
  }

  namespace domEvent {
    interface manager {
      add<K extends keyof EventMap>(
        htmlElement: HTMLElement | Document,
        types: K,
        callback: (event: EventMap[K]) => void,
        context?: object,
        capture?: boolean,
      ): this;

      add(
        htmlElement: HTMLElement | Document,
        types: string[] | string,
        callback: (event: any) => void,
        context?: object,
        capture?: boolean,
      ): this;

      group(htmlElement: HTMLElement | Document, capture?: boolean): event.Group;

      remove(
        htmlElement: HTMLElement | Document,
        types: string[] | string,
        callback: ((event: any) => void) | string,
        context?: object,
        capture?: boolean,
      ): this;
    }
  }

  namespace event {
    class Group implements IEventGroup {
      events: IEventManager;

      add<K extends keyof EventMap>(
        types: K,
        callback: (event: EventMap[K] | IEvent) => void,
        context?: object,
        priority?: number,
      ): this;
      add(
        types: string[][] | string[] | string,
        callback: (event: object | IEvent) => void,
        context?: object,
        priority?: number,
      ): this;

      remove(
        types: string[][] | string[] | string,
        callback: (event: object | IEvent) => void,
        context?: object,
        priority?: number,
      ): this;

      removeAll(): this;

      getLength(): number;
    }

    class Manager<TargetGeometry = {}> implements IEventManager<TargetGeometry> {
      constructor(params?: {
        context?: object | undefined;
        controllers?: IEventWorkflowController[] | undefined;
        parent?: IEventManager | undefined;
      });

      add<K extends keyof EventMap>(
        types: K,
        callback: (event: IEvent<EventMap[K], TargetGeometry>) => void,
        context?: object,
        priority?: number,
      ): this;

      add(
        types: string[][] | string[] | string,
        callback: (event: IEvent<{}, TargetGeometry>) => void,
        context?: object,
        priority?: number,
      ): this;

      getParent(): IEventManager | null;

      group(): IEventGroup;

      remove(
        types: string[][] | string[] | string,
        callback: (event: object | IEvent) => void,
        context?: object,
        priority?: number,
      ): this;

      setParent(parent: IEventManager | null): this;

      fire(type: string, eventObject: object | IEvent): this;

      createEventObject(type: string, event: object, target: object): Event;

      once(
        types: string[][] | string[] | string,
        callback: (event: IEvent) => any,
        context?: object,
        priority?: number,
      ): this;
    }

    class Mapper implements IEventTrigger {
      constructor(
        targetEventManager: IEventManager,
        mappingTable: Record<string, ((event: IEvent) => IEvent | null) | boolean>,
      );

      fire(type: string, eventObject?: object | IEvent): this;
    }
  }

  namespace geometry {
    namespace base {
      class LineString implements IBaseLineStringGeometry {
        events: IEventManager;

        static fromEncodedCoordinates(encodedCoordinates: string): geometry.LineString;

        static toEncodedCoordinates(geometry: geometry.LineString): string;

        getBounds(): number[][] | null;

        getType(): string;

        get(index: number): number[];

        getChildGeometry(index: number): IPointGeometryAccess;

        getClosest(anchorPosition: number[]): object;

        getCoordinates(): number[][];

        getLength(): number;

        insert(index: number, coordinates: number[][]): ILineStringGeometryAccess;

        remove(index: number): number[];

        remove(
          types: string[][] | string[] | string,
          callback: (event: object | IEvent) => void,
          context?: object,
          priority?: number,
        ): this;

        set(index: number, coordinates: number[]): ILineStringGeometryAccess;

        setCoordinates(coordinates: number[][]): ILineStringGeometryAccess;

        splice(index: number, length: number): number[][];

        freeze(): IFreezable;

        isFrozen(): boolean;

        unfreeze(): IFreezable;

        add(
          types: string[][] | string[] | string,
          callback: (event: object | IEvent) => void,
          context?: object,
          priority?: number,
        ): this;

        getParent(): object | null;

        group(): IEventGroup;

        setParent(parent: IEventManager | null): this;

        fire(type: string, eventObject: object | IEvent): this;
      }

      class Point implements IBasePointGeometry {
        events: IEventManager;

        getBounds(): number[][] | null;

        getType(): string;

        getCoordinates(): number[] | null;

        setCoordinates(coordinates: number[] | null): this;
      }

      class Polygon implements IBasePointGeometry {
        constructor(coordinates?: number[][][], fillRule?: 'evenOdd' | 'nonZero');

        events: IEventManager;

        static fromEncodedCoordinates(encodedCoordinates: string): Polygon;

        static toEncodedCoordinates(geometry: Polygon): string;

        contains(position: number[]): boolean;

        freeze(): IFreezable;

        get(index: number): number[][];

        getBounds(): number[][] | null;

        getChildGeometry(index: number): ILinearRingGeometryAccess;

        getClosest(anchorPosition: number[]): object;

        getCoordinates(): number[] | null;

        getFillRule(): 'evenOdd' | 'nonZero';

        getLength(): number;

        getType(): string;

        insert(index: number, path: number[][]): IPolygonGeometryAccess;

        isFrozen(): boolean;

        remove(index: number): ILinearRingGeometryAccess;

        set(index: number, path: number[][]): IPolygonGeometryAccess;

        setCoordinates(coordinates: number[] | null): this;

        setFillRule(fillRule: 'evenOdd' | 'nonZero'): IPolygonGeometryAccess;

        splice(index: number, number: number): ILinearRingGeometryAccess[];

        unfreeze(): IFreezable;
      }
    }

    class LineString implements ILineStringGeometry {
      constructor(
        coordinates?: number[][],
        options?: {
          coordRendering?: 'shortestPath' | 'straightPath';
          geodesic?: boolean;
          pixelRendering?: 'jumpy' | 'static';
          projection?: IProjection;
          simplification?: boolean;
        },
      );

      events: IEventManager;

      options: IOptionManager;

      static fromEncodedCoordinates(encodedCoordinates: string): LineString;

      static toEncodedCoordinates(geometry: LineString): string;

      getMap(): Map | null;

      getPixelGeometry(options?: object): IPixelGeometry;

      setMap(map: Map): void;

      getBounds(): number[][] | null;

      getType(): string;

      get(index: number): number[];

      getChildGeometry(index: number): IPointGeometryAccess;

      getClosest(anchorPosition: number[]): object;

      getCoordinates(): number[][];

      getLength(): number;

      insert(index: number, coordinates: number[][]): ILineStringGeometryAccess;

      remove(index: number): number[];

      remove(
        types: string[][] | string[] | string,
        callback: (event: object | IEvent) => void,
        context?: object,
        priority?: number,
      ): this;

      set(index: number, coordinates: number[]): ILineStringGeometryAccess;

      setCoordinates(coordinates: number[][]): ILineStringGeometryAccess;

      splice(index: number, length: number): number[][];

      freeze(): IFreezable;

      isFrozen(): boolean;

      unfreeze(): IFreezable;

      add(
        types: string[][] | string[] | string,
        callback: (event: object | IEvent) => void,
        context?: object,
        priority?: number,
      ): this;

      getParent(): object | null;

      group(): IEventGroup;

      setParent(parent: IEventManager | null): this;

      fire(type: string, eventObject: object | IEvent): this;
    }

    class Point implements IPointGeometry {
      constructor(coordinates?: number[] | null);

      options: IOptionManager;

      events: IEventManager;

      getMap(): Map | null;

      getPixelGeometry(options?: object): IPixelGeometry;

      setMap(map: Map): void;

      getBounds(): number[][] | null;

      getType(): string;

      getCoordinates(): number[] | null;

      setCoordinates(coordinates: number[] | null): this;
    }

    class Polygon implements IPolygonGeometry {
      constructor(coordinates?: number[][][], fillRule?: 'evenOdd' | 'nonZero', options?: object);

      events: IEventManager;

      options: IOptionManager;

      static fromEncodedCoordinates(encodedCoordinates: string): Polygon;

      static toEncodedCoordinates(geometry: Polygon): string;

      add(
        types: string[][] | string[] | string,
        callback: (event: object | IEvent) => void,
        context?: object,
        priority?: number,
      ): this;

      contains(position: number[]): boolean;

      fire(type: string, eventObject: object | IEvent): this;

      freeze(): IFreezable;

      get(index: number): number[][];

      getBounds(): number[][] | null;

      getChildGeometry(index: number): ILinearRingGeometryAccess;

      getClosest(anchorPosition: number[]): object;

      getCoordinates(): number[][][];

      getFillRule(): 'evenOdd' | 'nonZero';

      getLength(): number;

      getMap(): Map | null;

      getParent(): object | null;

      getPixelGeometry(options?: object): IPixelGeometry;

      getType(): string;

      group(): IEventGroup;

      insert(index: number, path: number[][]): IPolygonGeometryAccess;

      isFrozen(): boolean;

      remove(index: number): ILinearRingGeometryAccess;

      set(index: number, path: number[][]): IPolygonGeometryAccess;

      setCoordinates(coordinates: number[][][]): IPolygonGeometryAccess;

      setFillRule(fillRule: 'evenOdd' | 'nonZero'): IPolygonGeometryAccess;

      setMap(map: Map): void;

      setParent(parent: object | null): this;

      splice(index: number, number: number): ILinearRingGeometryAccess[];

      unfreeze(): IFreezable;
    }

    namespace pixel {
      class Circle implements IPixelCircleGeometry {
        constructor(coordinates: number[] | null, radius: number, metaData?: object);

        events: IEventManager;

        equals(geometry: IPixelGeometry): boolean;

        getBounds(): number[][] | null;

        getCoordinates(): number[];

        getMetaData(): object;

        getRadius(): number;

        getType(): string;

        scale(factor: number): IPixelGeometry;

        shift(offset: number[]): IPixelGeometry;
      }

      class LineString implements IPixelLineStringGeometry {
        constructor(coordinates: number[][], metaData?: object);

        events: IEventManager;

        equals(geometry: IPixelGeometry): boolean;

        getBounds(): number[][] | null;

        getClosest(anchorPosition: number[]): object;

        getCoordinates(): number[][];

        getLength(): number;

        getMetaData(): object;

        getType(): string;

        scale(factor: number): IPixelGeometry;

        shift(offset: number[]): IPixelGeometry;
      }

      class MultiLineString implements IPixelMultiLineGeometry {
        constructor(coordinates: number[][][], metaData?: object);

        events: IEventManager;

        equals(geometry: IPixelGeometry): boolean;

        getBounds(): number[][] | null;

        getClosest(anchorPosition: number[]): object;

        getCoordinates(): number[][][];

        getLength(): number;

        getMetaData(): object;

        getType(): string;

        scale(factor: number): IPixelGeometry;

        shift(offset: number[]): IPixelGeometry;
      }

      class MultiPolygon implements IPixelMultiPolygonGeometry {
        constructor(
          coordinates: number[][][][],
          fillRule: 'evenOdd' | 'nonZero',
          metaData?: object,
        );

        events: IEventManager;

        contains(position: number[]): boolean;

        equals(geometry: IPixelGeometry): boolean;

        getBounds(): number[][] | null;

        getClosest(anchorPosition: number[]): object;

        getCoordinates(): number[][][][];

        getFillRule(): 'evenOdd' | 'nonZero';

        getLength(): number;

        getMetaData(): object;

        getType(): string;

        scale(factor: number): IPixelGeometry;

        shift(offset: number[]): IPixelGeometry;
      }

      class Point implements IPixelPointGeometry {
        constructor(position: number[] | null, metaData?: object);

        events: IEventManager;

        equals(geometry: IPixelGeometry): boolean;

        getBounds(): number[][] | null;

        getCoordinates(): number[];

        getMetaData(): object;

        getType(): string;

        scale(factor: number): IPixelGeometry;

        shift(offset: number[]): IPixelGeometry;
      }

      class Polygon implements IPixelPolygonGeometry {
        constructor(coordinates: number[][][], fillRule: 'evenOdd' | 'nonZero', metaData?: object);

        events: IEventManager;

        contains(position: number[]): boolean;

        equals(geometry: IPixelGeometry): boolean;

        getBounds(): number[][] | null;

        getClosest(anchorPosition: number[]): object;

        getCoordinates(): number[][][];

        getFillRule(): 'evenOdd' | 'nonZero';

        getLength(): number;

        getMetaData(): object;

        getType(): string;

        scale(factor: number): IPixelGeometry;

        shift(offset: number[]): IPixelGeometry;
      }

      class Rectangle implements IPixelRectangleGeometry {
        constructor(coordinates: number[][] | null, metaData?: object);

        events: IEventManager;

        equals(geometry: IPixelGeometry): boolean;

        getBounds(): number[][] | null;

        getClosest(anchorPosition: number[]): object;

        getCoordinates(): number[][];

        getMetaData(): object;

        getType(): string;

        scale(factor: number): IPixelGeometry;

        shift(offset: number[]): IPixelGeometry;
      }
    }
  }

  namespace geometryEditor {
    class Circle implements IGeometryEditor {
      constructor(geometry: ICircleGeometry, options?: object);

      events: IEventManager;

      geometry: IGeometry;

      options: IOptionManager;

      state: IDataManager;

      startDrawing(): vow.Promise;

      startEditing(): void;

      stopDrawing(): vow.Promise;

      stopEditing(): void;
    }

    class LineString implements IGeometryEditor {
      constructor(geometry: ILineStringGeometry, options?: object);

      events: IEventManager;

      geometry: IGeometry;

      options: IOptionManager;

      state: IDataManager;

      getModel(): vow.Promise;

      getModelSync(): model.RootLineString | null;

      getView(): vow.Promise;

      getViewSync(): view.Path | null;

      startDrawing(): vow.Promise;

      startEditing(): vow.Promise;

      startFraming(): vow.Promise;

      stopDrawing(): void;

      stopEditing(): void;

      stopFraming(): void;
    }

    namespace model {
      class ChildLinearRing extends ChildLineString {}

      class ChildLineString implements IGeometryEditorChildModel {
        editor: IGeometryEditor;

        events: IEventManager;

        geometry: IBaseGeometry;

        destroy(): void;

        getAllVerticesNumber(): number;

        getEdgeModels(): Edge[];

        getIndex(): number;

        getParent(): IGeometryEditorModel;

        getPixels(): number[];

        getVertexModels(): ChildVertex[];

        setIndex(index: number): void;

        setPixels(pixels: number[]): void;

        spliceVertices(start: number, deleteCount: number): number[][];
      }

      class ChildVertex implements IGeometryEditorChildModel {
        editor: IGeometryEditor;

        events: IEventManager;

        geometry: IBaseGeometry;

        destroy(): void;

        getAllVerticesNumber(): number;

        getIndex(): number;

        getNextVertex(): ChildVertex | null;

        getParent(): IGeometryEditorModel;

        getPixels(): number[];

        getPrevVertex(): ChildVertex | null;

        setGlobalPixels(pixels: number[]): void;

        setIndex(index: number): void;

        setNextVertex(nextVertex: ChildVertex): void;

        setPixels(pixels: number[]): void;

        setPrevVertex(prevVertex: ChildVertex): void;
      }

      class Edge implements IGeometryEditorRootModel {
        events: IEventManager;

        destroy(): void;

        getNextVertex(): ChildVertex | null;

        getPixels(): number[];

        getPrevVertex(): ChildVertex | null;

        setNextVertex(nextVertex: ChildVertex): void;

        setPrevVertex(prevVertex: ChildVertex): void;
      }

      class EdgeGeometry implements IGeometry {
        events: IEventManager;

        options: IOptionManager;

        getBounds(): number[][] | null;

        getMap(): Map | null;

        getPixelGeometry(options?: object): IPixelGeometry;

        getType(): string;

        setMap(map: Map): void;
      }

      class RootLineString implements IGeometryEditorRootModel {
        events: IEventManager;

        destroy(): void;

        getAllVerticesNumber(): number;

        getPixels(): number[];

        getVertexModels(): ChildVertex[];

        spliceVertices(start: number, deleteCount: number): number[][];
      }

      class RootPolygon implements IGeometryEditorRootModel {
        events: IEventManager;

        destroy(): void;

        getAllVerticesNumber(): number;

        getPathModels(): ChildLinearRing[];

        getPixels(): number[];

        splicePaths(start: number, deleteCount: number): number[][];
      }
    }

    class Point implements IGeometryEditor {
      constructor(
        geometry: IPointGeometry,
        options?: {
          dblClickHandler?: (ref: any) => void;
          drawingCursor?: string;
          drawOver?: boolean;
        },
      );

      events: IEventManager;

      geometry: IGeometry;

      options: IOptionManager;

      state: IDataManager;

      startDrawing(): vow.Promise;

      startEditing(): void;

      stopDrawing(): vow.Promise;

      stopEditing(): void;
    }

    class Polygon implements IGeometryEditor {
      constructor(geometry: IPolygonGeometry, options: object);

      events: IEventManager;

      geometry: IGeometry;

      options: IOptionManager;

      state: IDataManager;

      getModel(): vow.Promise;

      getModelSync(): model.RootPolygon | null;

      getView(): vow.Promise;

      getViewSync(): view.MultiPath | null;

      startDrawing(): vow.Promise;

      startEditing(): vow.Promise;

      startFraming(): vow.Promise;

      stopDrawing(): void;

      stopEditing(): void;

      stopFraming(): void;
    }

    namespace view {
      class Edge {
        getPlacemark(): GeoObject;
      }

      class MultiPath {
        getEdgePlacemarks(): GeoObjectCollection;

        getPathViews(): Path[];

        getVertexPlacemarks(): GeoObjectCollection;
      }

      class Path {
        getEdgePlacemarks(): GeoObjectCollection;

        getEdgeViews(): Edge[];

        getVertexPlacemarks(): GeoObjectCollection;

        getVertexViews(): Vertex[];
      }

      class Vertex {
        getPlacemark(): GeoObject;
      }
    }
  }

  namespace geoObject {
    class Balloon implements IBalloonManager<GeoObject> {
      constructor(geoObject: GeoObject);

      events: IEventManager;

      autoPan(): Promise<GeoObject>;

      close(force?: boolean): Promise<GeoObject>;

      destroy(): void;

      getData(): object | null;

      getOptions(): IOptionManager | null;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getPosition(): number[] | null;

      isOpen(): boolean;

      open(
        position?: number[],
        data?: object | string | HTMLElement,
        options?: object,
      ): Promise<GeoObject>;

      setData(data: object | string | HTMLElement): Promise<GeoObject>;

      setOptions(options: object): Promise<GeoObject>;

      setPosition(position: number[]): Promise<GeoObject>;
    }

    class Hint implements IHintManager<GeoObject> {
      constructor(geoObject: GeoObject);

      events: IEventManager;

      close(force?: boolean): Promise<GeoObject>;

      destroy(): void;

      getData(): object | null;

      getOptions(): IOptionManager | null;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getPosition(): number[] | null;

      isOpen(): boolean;

      open(
        position?: number[],
        data?: object | string | HTMLElement,
        options?: object,
      ): Promise<GeoObject>;

      setData(data: object | string | HTMLElement): Promise<GeoObject>;

      setOptions(options: object): Promise<GeoObject>;

      setPosition(position: number[]): Promise<GeoObject>;
    }

    class Sequence implements IGeoObject, IGeoObjectSequence {
      constructor(geoObject: GeoObject);

      geometry: IGeometry | null;

      properties: IDataManager;

      state: IDataManager;

      events: IEventManager;

      options: IOptionManager;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;

      getMap(): Map;

      each(callback: (geoObject: IGeoObject) => void, context?: object): void;

      get(index: number): IGeoObject;

      getBounds(): number[][] | null;

      getIterator(): IIterator;

      getLength(): number;

      getPixelBounds(): number[][] | null;

      indexOf(geoObject: IGeoObject): number;
    }
  }

  namespace layout {
    namespace templateBased {
      class Base implements ILayout {
        constructor(data: object);

        events: IEventManager;

        destroy(): void;

        getData(): object;

        getParentElement(): HTMLElement;

        getShape(): IShape | null;

        isEmpty(): boolean;

        setData(data: object): void;

        setParentElement(parent: HTMLElement | null): this;

        build(): void;

        clear(): void;

        onSublayoutSizeChange(sublayoutInfo: object, nodeSizeByContent: object): void;

        rebuild(): void;
      }
    }

    interface IImageOptions {
      imageClipRect?: number[][] | undefined;
      imageHref?: string | undefined;
      imageOffset?: number[] | undefined;
      imageSize?: number[] | undefined;
      shape?: IShape | object | null | undefined;
    }

    interface IImageOptionsWithIconPrefix {
      iconImageClipRect?: number[][] | undefined;
      iconImageHref?: string | undefined;
      iconImageOffset?: number[] | undefined;
      iconImageSize?: number[] | undefined;
      iconShape?: IShape | object | null | undefined;
    }

    class Image implements ILayout {
      constructor(data: { options?: IImageOptions });

      events: IEventManager;

      destroy(): void;

      getData(): object;

      getParentElement(): HTMLElement;

      getShape(): IShape | null;

      isEmpty(): boolean;

      setData(data: object): void;

      setParentElement(parent: HTMLElement | null): void;
    }

    class ImageWithContent extends Image {}

    interface IImageWithContentOptionsWithIconPrefix extends IImageOptionsWithIconPrefix {
      iconContentLayout?: IClassConstructor<ILayout> | string | undefined;
      iconContentOffset?: number[] | undefined;
      iconContentSize?: number[] | undefined;
    }

    class PieChart extends templateBased.Base {}

    interface IPieChartOptionsWithIconPrefix {
      iconPieChartCaptionMaxWidth?: number | undefined;
      iconPieChartCoreFillStyle?: string | undefined;
      iconPieChartCoreRadius?: number | (() => number) | undefined;
      iconPieChartStrokeStyle?: string | undefined;
      iconPieChartStrokeWidth?: number | undefined;
    }

    const storage: util.Storage;
  }

  namespace map {
    namespace action {
      class Manager implements IEventEmitter {
        constructor(map: Map);

        events: IEventManager;

        breakTick(): void;

        execute(action: IMapAction): void;

        getCurrentState(): object;

        getMap(): Map;

        setCorrection(userFunction: () => void): void;

        stop(): void;
      }
    }

    namespace behavior {
      class Manager implements ICustomizable, IEventEmitter, IParentOnMap {
        constructor(map: Map, behaviors?: string[][] | string[], options?: object);

        options: IOptionManager;

        events: IEventManager;

        getMap(): Map;

        disable(behaviors: string[][] | string[] | string): this;

        enable(behaviors: string[][] | string[] | string): this;

        get(behaviorName: string): IBehavior;

        isEnabled(behaviorName: string): boolean;
      }
    }

    namespace layer {
      class Manager implements ILayer, IMapObjectCollection {
        constructor(
          map: Map,
          options?: {
            trafficImageZIndex?: number;
            trafficInfoZIndex?: number;
            trafficJamZIndex?: number;
          },
        );

        events: IEventManager;

        options: IOptionManager;

        getParent(): null | IControlParent;

        setParent(parent: IControlParent): this;

        add(object: object): this;

        each(callback: (layer: ILayer) => void, context?: object): void;

        getIterator(): IIterator;

        remove(object: object): this;

        getMap(): Map;

        getAll(): Array<Collection<Layer>>;
      }
    }

    namespace margin {
      class Accessor {
        constructor(screenArea: object);

        getArea(): object;

        remove(): this;

        setArea(screenArea: object): this;
      }

      class Manager {
        constructor(map: Map);

        addArea(screenArea: object): Accessor;

        destroy(): this;

        getMargin(): number[];

        getOffset(): number[];

        setDefaultMargin(margin: number[][] | number[] | number): void;
      }
    }

    namespace pane {
      class Manager {
        constructor(map: Map);

        append(key: string, pane: IPane): void;

        destroy(): void;

        get(key: string): IPane | null;

        getLower(): string;

        getUpper(): string;

        insertBefore(key: string, pane: IPane, referenceKey: string): void;

        remove(pane: IPane): void;
      }
    }

    class Balloon implements IBalloonManager<Balloon> /* , IBalloonSharingManager */ {
      constructor(map: Map);

      events: IEventManager;

      autoPan(): Promise<Balloon>;

      close(force?: boolean): Promise<Balloon>;

      destroy(): void;

      getData(): object | null;

      getOptions(): IOptionManager | null;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getPosition(): number[] | null;

      isOpen(): boolean;

      open(
        position?: number[],
        data?: object | string | HTMLElement,
        options?: object,
      ): Promise<Balloon>;

      setData(data: object | string | HTMLElement): Promise<Balloon>;

      setOptions(options: object): Promise<Balloon>;

      setPosition(position: number[]): Promise<Balloon>;
    }

    class Container implements IDomEventEmitter {
      constructor(parentElement: string | HTMLElement);

      events: IEventManager;

      enterFullscreen(): void;

      exitFullscreen(): void;

      fitToViewport(preservePixelPosition?: boolean): void;

      getElement(): HTMLElement;

      getOffset(): number[];

      getParentElement(): HTMLElement;

      getSize(): number[];

      isFullscreen(): boolean;
    }

    class Converter {
      constructor(map: Map);

      globalToPage(globalPixelPoint: number[]): number[];

      pageToGlobal(pagePixelPoint: number[]): number[];
    }

    class Copyrights {
      constructor(map: Map);

      add(
        customCopyrights: string | HTMLElement | Array<string | HTMLElement>,
      ): ICopyrightsAccessor;

      addProvider(provider: ICopyrightsProvider): this;

      get(point?: number[], zoom?: number): Promise<Array<string | HTMLElement>>;

      getPromoLink(): string;

      removeProvider(provider: ICopyrightsProvider): this;
    }

    class GeoObjects implements IGeoObjectCollection {
      constructor(map: Map, options?: object);

      options: IOptionManager;

      events: IEventManager;

      add(child: IGeoObject | ObjectManager | Clusterer, index?: number): this;

      each(callback: (object: IGeoObject) => void, context?: object): void;

      get(index: number): IGeoObject;

      getBounds(): number[][] | null;

      getIterator(): IIterator;

      getLength(): number;

      getPixelBounds(): number[][] | null;

      indexOf(object: IGeoObject): number;

      remove(child: IGeoObject | ObjectManager): this;

      removeAll(): this;

      set(index: number, child: IGeoObject): this;

      splice(index: number, length: number): this;

      getMap(): Map;
    }

    class Hint implements IHintManager<Hint> /* , IHintSharingManager */ {
      constructor(map: Map);

      events: IEventManager;

      close(force?: boolean): Promise<Hint>;

      destroy(): void;

      getData(): object | null;

      getOptions(): IOptionManager | null;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getPosition(): number[] | null;

      isOpen(): boolean;

      open(
        position?: number[],
        data?: object | string | HTMLElement,
        options?: object,
      ): Promise<Hint>;

      setData(data: object | string | HTMLElement): Promise<Hint>;

      setOptions(options: object): Promise<Hint>;

      setPosition(position: number[]): Promise<Hint>;
    }

    class ZoomRange implements IEventEmitter {
      constructor(map: Map, constraints: number[]);

      events: IEventManager;

      get(coords?: number[]): Promise<number[]>;

      getCurrent(): number[];
    }
  }

  namespace multiRouter {
    namespace driving {
      class Path implements IGeoObject {
        geometry: IGeometry | null;

        properties: data.Manager;

        state: IDataManager;

        model: PathModel;

        events: IEventManager;

        options: IOptionManager;

        getOverlay(): Promise<IOverlay | null>;

        getOverlaySync(): IOverlay | null;

        getParent(): object | null;

        setParent(parent: object): this;

        getMap(): Map;

        getSegments(): GeoObjectCollection;
      }

      class PathModel implements IEventEmitter {
        events: IEventManager;

        properties: data.Manager;

        route: RouteModel;

        destroy(): void;

        getSegments(): SegmentModel[];

        getType(): string;

        update(pathJson: object): void;
      }

      class Route implements IGeoObject {
        geometry: IGeometry | null;

        properties: IDataManager;

        state: IDataManager;

        events: IEventManager;

        options: IOptionManager;

        balloon: geoObject.Balloon;

        getOverlay(): Promise<IOverlay | null>;

        getOverlaySync(): IOverlay | null;

        getParent(): object | null;

        setParent(parent: object): this;

        getMap(): Map;

        getPaths(): GeoObjectCollection;
      }

      class RouteModel implements IEventEmitter {
        events: IEventManager;

        multiRoute: MultiRouteModel;

        properties: data.Manager;

        destroy(): void;

        getPaths(): PathModel[];

        update(routeJson: object): void;

        getType(): string;
      }

      class Segment implements IGeoObject {
        geometry: IGeometry | null;

        properties: data.Manager;

        state: IDataManager;

        events: IEventManager;

        options: IOptionManager;

        getOverlay(): Promise<IOverlay | null>;

        getOverlaySync(): IOverlay | null;

        getParent(): object | null;

        setParent(parent: object): this;

        getMap(): Map;
      }

      class SegmentModel implements IEventEmitter {
        events: IEventManager;

        geometry: geometry.base.LineString;

        path: PathModel;

        destroy(): void;

        getType(): string;

        getViaPoints(): ViaPointModel[];

        update(segmentJson: object): void;
      }
    }

    namespace masstransit {
      class Path implements IGeoObject {
        geometry: IGeometry | null;

        properties: data.Manager;

        state: IDataManager;

        events: IEventManager;

        options: IOptionManager;

        model: PathModel;

        getOverlay(): Promise<IOverlay | null>;

        getOverlaySync(): IOverlay | null;

        getParent(): object | null;

        setParent(parent: object): this;

        getMap(): Map;

        getSegmentMarkers(): GeoObjectCollection;

        getSegments(): GeoObjectCollection;
      }

      class PathModel implements IEventEmitter {
        events: IEventManager;

        properties: data.Manager;

        route: RouteModel;

        destroy(): void;

        getSegments(): Array<TransferSegmentModel | TransportSegmentModel | WalkSegmentModel>;

        getType(): string;

        update(pathJson: object): void;
      }

      class Route implements IGeoObject {
        geometry: IGeometry | null;

        properties: data.Manager;

        model: RouteModel;

        state: IDataManager;

        events: IEventManager;

        options: IOptionManager;

        balloon: geoObject.Balloon;

        getOverlay(): Promise<IOverlay | null>;

        getOverlaySync(): IOverlay | null;

        getParent(): object | null;

        setParent(parent: object): this;

        getMap(): Map;

        getPaths(): GeoObjectCollection;
      }

      class RouteModel implements IEventEmitter {
        events: IEventManager;

        multiRoute: MultiRouteModel;

        properties: data.Manager;

        destroy(): void;

        getPaths(): PathModel[];

        getType(): string;

        update(routeJson: object): void;
      }

      class StopModel implements IEventEmitter {
        events: IEventManager;

        geometry: geometry.base.Point;

        properties: data.Manager;

        segment: TransportSegmentModel;

        update(stopJson: object): void;
      }

      class TransferSegment implements IGeoObject {
        geometry: IGeometry | null;

        properties: data.Manager;

        state: IDataManager;

        events: IEventManager;

        options: IOptionManager;

        model: TransferSegmentModel;

        getOverlay(): Promise<IOverlay | null>;

        getOverlaySync(): IOverlay | null;

        getParent(): object | null;

        setParent(parent: object): this;

        getMap(): Map;
      }

      class TransferSegmentModel implements IEventEmitter {
        events: IEventManager;

        geometry: geometry.base.LineString;

        path: PathModel;

        properties: data.Manager;

        destroy(segmentJson: object): void;

        getType(): string;
      }

      class TransportSegment implements IGeoObject {
        geometry: IGeometry | null;

        properties: data.Manager;

        state: IDataManager;

        events: IEventManager;

        options: IOptionManager;

        model: TransportSegmentModel;

        getOverlay(): Promise<IOverlay | null>;

        getOverlaySync(): IOverlay | null;

        getParent(): object | null;

        setParent(parent: object): this;

        getMap(): Map;
      }

      class TransportSegmentModel implements IEventEmitter {
        events: IEventManager;

        geometry: geometry.base.LineString;

        path: PathModel;

        properties: data.Manager;

        destroy(): void;

        getStops(): StopModel[];

        getType(): string;

        update(segmentJson: object): void;
      }

      class WalkSegment implements IGeoObject {
        geometry: IGeometry | null;

        properties: data.Manager;

        state: IDataManager;

        events: IEventManager;

        options: IOptionManager;

        model: WalkSegmentModel;

        getOverlay(): Promise<IOverlay | null>;

        getOverlaySync(): IOverlay | null;

        getParent(): object | null;

        setParent(parent: object): this;

        getMap(): Map;
      }

      class WalkSegmentModel implements IEventEmitter {
        events: IEventManager;

        geometry: geometry.base.LineString;

        path: PathModel;

        properties: data.Manager;

        destroy(): void;

        getType(): string;
      }
    }

    class EditorAddon implements ICustomizable, IEventEmitter {
      options: IOptionManager;

      events: IEventManager;

      state: data.Manager;

      isActive(): boolean;

      start(state: object): void;

      stop(): void;
    }

    class MultiRoute implements IGeoObject {
      constructor(model: MultiRouteModel | IMultiRouteModelJson, options?: IMultiRouteOptions);

      editor: EditorAddon;

      events: IEventManager;

      geometry: IGeometry | null;

      model: MultiRouteModel;

      options: IOptionManager;

      properties: IDataManager;

      state: IDataManager;

      getActiveRoute(): multiRouter.driving.Route | multiRouter.masstransit.Route | null;

      getBounds(): number[][] | null;

      getMap(): Map;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getParent(): object | null;

      getPixelBounds(): number[][] | null;

      getRoutes(): GeoObjectCollection;

      getViaPoints(): GeoObjectCollection;

      getWayPoints(): GeoObjectCollection;

      setActiveRoute(route: driving.Route | masstransit.Route | null): void;

      setParent(parent: object): this;
    }

    interface IMultiRouteOptions {
      activeRouteAutoSelection?: boolean;
      boundsAutoApply?: boolean;
      dragUpdateInterval?: string | number;
      preventDragUpdate?: boolean;
      useMapMargin?: boolean;
      zoomMargin?: number[][] | number[] | number;

      [index: string]: any;
    }

    class MultiRouteModel implements IEventEmitter {
      constructor(referencePoints: IMultiRouteReferencePoint[], params?: IMultiRouteParams);

      events: IEventManager;

      properties: data.Manager;

      destroy(): void;

      getAllPoints(): Array<WayPointModel | ViaPointModel>;

      getJson(): object;

      getParams(): IMultiRouteParams;

      getPoints(): Array<WayPointModel | ViaPointModel>;

      getReferencePointIndexes(): object;

      getReferencePoints(): IMultiRouteReferencePoint[];

      getRoutes(): driving.RouteModel[] | masstransit.RouteModel[];

      getViaPoints(): ViaPointModel[];

      getWayPoints(): WayPointModel[];

      setParams(params: IMultiRouteParams, extend?: boolean, clearRequests?: boolean): void;

      setReferencePoints(
        referencePoints: IMultiRouteReferencePoint[],
        viaIndexes?: number[],
        clearRequests?: boolean,
      ): void;
    }

    class ViaPoint implements IGeoObject {
      geometry: IGeometry | null;

      properties: data.Manager;

      state: IDataManager;

      events: IEventManager;

      options: IOptionManager;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getParent(): object | null;

      setParent(parent: object): this;

      getMap(): Map;
    }

    class ViaPointModel implements IEventEmitter {
      events: IEventManager;

      geometry: geometry.base.Point;

      multiRoute: MultiRouteModel;

      properties: data.Manager;

      destroy(): void;

      getReferencePoint(): object;

      getReferencePointIndex(): number;

      setReferencePoint(referencePoint: object): void;

      update(viaPointJson: object): void;
    }

    class WayPoint implements IGeoObject {
      geometry: IGeometry | null;

      properties: data.Manager;

      state: IDataManager;

      events: IEventManager;

      options: IOptionManager;

      model: WayPointModel;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getParent(): object | null;

      setParent(parent: object): this;

      getMap(): Map;
    }

    class WayPointModel implements IEventEmitter {
      events: IEventManager;

      geometry: geometry.base.Point;

      multiRoute: MultiRouteModel;

      properties: data.Manager;

      destroy(): void;

      getReferencePoint(): object;

      getReferencePointIndex(): number;

      setReferencePoint(referencePoint: object): void;

      update(wayPointJson: object): void;
    }
  }

  namespace option {
    class Manager implements IOptionManager {
      constructor(options?: object, parent?: IOptionManager, name?: string);

      events: IEventManager;

      get(key: string, defaultValue?: object): object;

      getAll(): object;

      getName(): string;

      getNative(key: string): object;

      resolve(key: string, name?: string): object;

      set(key: object | string, value?: object | number | string | null | undefined): this;

      unset(keys: string[][] | string[] | string): this;

      unsetAll(): this;

      setName(name: string): void;

      getParent(): null | IOptionManager;

      setParent(parent: IOptionManager): this;

      freeze(): IFreezable;

      isFrozen(): boolean;

      unfreeze(): IFreezable;

      add(
        types: string[][] | string[] | string,
        callback: (event: object | IEvent) => void,
        context?: object,
        priority?: number,
      ): this;

      group(): IEventGroup;

      remove(
        types: string[][] | string[] | string,
        callback: (event: object | IEvent) => void,
        context?: object,
        priority?: number,
      ): this;

      fire(type: string, eventObject: object | IEvent): this;
    }

    const presetStorage: util.Storage;
  }

  namespace pane {
    class EventsPane implements IEventPane {
      constructor(
        map: Map,
        params: {
          className?: string;
          css?: CSSStyleDeclaration;
          patch?: {
            selectable?: boolean;
          };
          transparent?: boolean;
          checkContextMenu?: boolean;
          zIndex?: number;
        },
      );

      events: IEventManager;

      destroy(): void;

      getElement(): HTMLElement;

      getMap(): Map;

      getOverflow(): 'visible' | 'hidden';

      getZIndex(): number;
    }

    class MovablePane implements IContainerPane {
      constructor(
        map: Map,
        params: {
          css?: CSSStyleDeclaration;
          margin?: number;
          overflow?: 'hidden' | 'visible';
          zIndex?: number;
        },
      );

      events: IEventManager;

      destroy(): void;

      fromClientPixels(clientPixelPoint: number[]): number[];

      getElement(): HTMLElement;

      getMap(): Map;

      getOverflow(): 'visible' | 'hidden';

      getZIndex(): number;

      getZoom(): number;

      toClientPixels(globalPixelPoint: number[]): number[];
    }

    class StaticPane implements IContainerPane {
      constructor(
        map: Map,
        params: {
          css?: CSSStyleDeclaration;
          margin?: number;
          overflow?: 'visible' | 'hidden';
          zIndex?: number;
        },
      );

      events: IEventManager;

      destroy(): void;

      fromClientPixels(clientPixelPoint: number[]): number[];

      getElement(): HTMLElement;

      getMap(): Map;

      getOverflow(): 'visible' | 'hidden';

      getZIndex(): number;

      getZoom(): number;

      toClientPixels(globalPixelPoint: number[]): number[];
    }
  }

  namespace panorama {
    type Layer = 'yandex#panorama' | 'yandex#airPanorama';

    class Base implements IPanorama {
      static createPanorama(params: {
        angularBBox: number[];
        coordSystem?: ICoordSystem;
        name?: string;
        position: number[];
        tilesLevels: IPanoramaTileLevel[];
        tileSize: number[];
      }): IPanorama;

      static getMarkerPositionFromDirection(
        panorama: IPanorama,
        direction: number[],
        distance: number,
      ): number[];

      getAngularBBox(): number[];

      getConnectionArrows(): IPanoramaConnectionArrow[];

      getConnectionMarkers(): IPanoramaConnectionMarker[];

      getConnections(): IPanoramaConnectionMarker[];

      getCoordSystem(): ICoordSystem;

      getDefaultDirection(): number[];

      getDefaultSpan(): number[];

      getGraph(): IPanoramaGraph | null;

      getMarkers(): IPanoramaMarker[];

      getName(): string;

      getPosition(): number[];

      getThoroughfares(): IPanoramaConnectionArrow[];

      getTileLevels(): IPanoramaTileLevel[];

      getTileSize(): number[];

      validate(): void;
    }

    function createPlayer(
      element: HTMLElement | string,
      point: number[],
      options?: {
        direction?: number[] | string;
        layer?: Layer;
        span?: number[] | string;
      },
    ): Promise<Player>;

    function isSupported(): boolean;

    function locate(point: number[], options?: { layer?: Layer }): Promise<IPanorama[]>;

    class Manager implements IEventEmitter {
      events: IEventManager;

      closePlayer(): void;

      disableLookup(): void;

      enableLookup(): void;

      getPlayer(): Player;

      isLookupEnabled(): boolean;

      openPlayer(panorama: IPanorama[] | number): Promise<void>;
    }

    interface IPlayerOptions {
      autoFitToViewport?: 'none' | 'ifNull' | 'always';
      controls?: string[];
      direction?: number[] | string;
      hotkeysEnabled?: boolean;
      scrollZoomBehavior?: boolean;
      span?: number[] | string;
      suppressMapOpenBlock?: boolean;
    }

    class Player implements IEventEmitter {
      constructor(element: HTMLElement | string, panorama: IPanorama, options?: IPlayerOptions);

      events: IEventManager;

      destroy(): void;

      fitToViewport(): void;

      getDirection(): number[];

      getPanorama(): IPanorama;

      getSpan(): number[];

      lookAt(point: number[]): this;

      moveTo(
        point: number[],
        options?: {
          direction?: number[] | string;
          layer?: Layer;
          span?: number[] | string;
        },
      ): Promise<void>;

      setDirection(direction: number[] | string): this;

      setPanorama(panorama: IPanorama): this;

      setSpan(span: number[] | string): this;
    }
  }

  namespace router {
    class Editor implements ICustomizable, IEventEmitter {
      options: IOptionManager;

      events: IEventManager;

      start(options?: {
        addViaPoints?: boolean;
        addWayPoints?: boolean;
        editViaPoints?: boolean;
        editWayPoints?: boolean;
        removeViaPoints?: boolean;
        removeWayPoints?: boolean;
      }): void;

      stop(): void;
    }

    abstract class Route implements IGeoObject {
      geometry: IGeometry | null;

      properties: IDataManager;

      state: IDataManager;

      events: IEventManager;

      options: IOptionManager;

      editor: Editor;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getParent(): null | IControlParent;

      setParent(parent: IControlParent): this;

      getMap(): Map;

      getHumanJamsTime(): string;

      getHumanLength(): string;

      getHumanTime(): string;

      getJamsTime(): number;

      getLength(): number;

      getPaths(): GeoObjectCollection;

      getTime(): number;

      getViaPoints(): GeoObjectCollection;

      getWayPoints(): GeoObjectCollection;
    }
  }

  namespace shape {
    class Circle implements IShape {
      constructor(
        pixelGeometry: IPixelCircleGeometry,
        params?: {
          fill?: boolean;
          outline?: boolean;
          strokeWidth?: number;
        },
      );

      contains(position: number[]): boolean;

      equals(shape: IShape): boolean;

      getBounds(): number[][] | null;

      getGeometry(): IPixelGeometry;

      getType(): string;

      scale(factor: number): IShape;

      shift(offset: number[]): IShape;
    }

    class LineString implements IShape {
      constructor(
        pixelGeometry: IPixelLineStringGeometry,
        params?: {
          strokeWidth?: number;
        },
      );

      contains(position: number[]): boolean;

      equals(shape: IShape): boolean;

      getBounds(): number[][] | null;

      getGeometry(): IPixelGeometry;

      getType(): string;

      scale(factor: number): IShape;

      shift(offset: number[]): IShape;
    }

    class MultiPolygon implements IShape {
      constructor(
        pixelGeometry: IPixelMultiPolygonGeometry,
        params?: {
          fill?: boolean;
          outline?: boolean;
          strokeWidth?: number;
        },
      );

      contains(position: number[]): boolean;

      equals(shape: IShape): boolean;

      getBounds(): number[][] | null;

      getGeometry(): IPixelGeometry;

      getType(): string;

      scale(factor: number): IShape;

      shift(offset: number[]): IShape;
    }

    class Polygon implements IShape {
      constructor(
        pixelGeometry: IPixelPolygonGeometry,
        params?: {
          fill?: boolean;
          outline?: boolean;
          strokeWidth?: number;
        },
      );

      contains(position: number[]): boolean;

      equals(shape: IShape): boolean;

      getBounds(): number[][] | null;

      getGeometry(): IPixelGeometry;

      getType(): string;

      scale(factor: number): IShape;

      shift(offset: number[]): IShape;
    }

    class Rectangle implements IShape {
      constructor(
        geometry: IPixelRectangleGeometry,
        params?: {
          fill?: boolean;
          outline?: boolean;
          strokeWidth?: number;
        },
      );

      contains(position: number[]): boolean;

      equals(shape: IShape): boolean;

      getBounds(): number[][] | null;

      getGeometry(): IPixelGeometry;

      getType(): string;

      scale(factor: number): IShape;

      shift(offset: number[]): IShape;
    }
  }

  interface meta {
    coordinatesOrder: 'latlong' | 'longlat';
    countryCode: string;
    languageCode: string;
    mode: 'release' | 'debug';
    ns: typeof ymaps;
    version: string;
  }

  class Balloon extends Popup<Balloon> implements IBaloon<Balloon>, IBalloonManager<Balloon> {
    constructor(map: Map, options?: IBalloonOptions);

    getData(): object;

    close(force?: boolean): Promise<Balloon>;

    getParent(): Balloon | null;

    setParent(parent: Balloon): this;

    autoPan(): Promise<Balloon>;

    freeze(): IFreezable;

    isFrozen(): boolean;

    unfreeze(): IFreezable;

    add(
      types: string[][] | string[] | string,
      callback: (event: object | IEvent) => void,
      context?: object,
      priority?: number,
    ): this;

    group(): IEventGroup;

    remove(
      types: string[][] | string[] | string,
      callback: (event: object | IEvent) => void,
      context?: object,
      priority?: number,
    ): this;

    fire(type: string, eventObject: object | IEvent): this;

    destroy(): void;

    getOptions(): IOptionManager | null;

    setOptions(options: object): Promise<Balloon>;
  }

  interface IBalloonOptions {
    autoPan?: boolean;
    autoPanCheckZoomRange?: boolean;
    autoPanDuration?: number;
    autoPanMargin?: number | number[] | undefined;
    autoPanUseMapMargin?: boolean;
    closeButton?: boolean;
    closeTimeout?: number | undefined;
    contentLayout?: IClassConstructor<ILayout> | string;
    interactivityModel?: InteractivityModelKey | undefined;
    layout?: IClassConstructor<ILayout> | string;
    maxHeight?: number;
    maxWidth?: number;
    minHeight?: number;
    minWidth?: number;
    offset?: number[];
    openTimeout?: number | undefined;
    pane?: string;
    panelContentLayout?: IClassConstructor<ILayout> | string;
    panelMaxHeightRatio?: number;
    panelMaxMapArea?: number;
    shadow?: boolean;
    shadowLayout?: IClassConstructor<ILayout> | string;
    shadowOffset?: number[];
    zIndex?: string | undefined;
  }

  interface IBalloonOptionsWithBalloonPrefix {
    balloonContent?: string | undefined;
    balloonAutoPan?: boolean | undefined;
    balloonAutoPanCheckZoomRange?: boolean | undefined;
    balloonAutoPanDuration?: number | undefined;
    balloonAutoPanMargin?: number | number[] | undefined;
    balloonAutoPanUseMapMargin?: boolean | undefined;
    balloonCloseButton?: boolean | undefined;
    balloonCloseTimeout?: number | undefined;
    balloonContentLayout?: IClassConstructor<ILayout> | string | undefined;
    balloonInteractivityModel?: InteractivityModelKey | undefined;
    balloonLayout?: IClassConstructor<ILayout> | string | undefined;
    balloonMaxHeight?: number | undefined;
    balloonMaxWidth?: number | undefined;
    balloonMinHeight?: number | undefined;
    balloonMinWidth?: number | undefined;
    balloonOffset?: number[] | undefined;
    balloonOpenTimeout?: number | undefined;
    balloonPane?: string | undefined;
    balloonPanelContentLayout?: IClassConstructor<ILayout> | string | undefined;
    balloonPanelMaxHeightRatio?: number | undefined;
    balloonPanelMaxMapArea?: number | undefined;
    balloonShadow?: boolean | undefined;
    balloonShadowLayout?: IClassConstructor<ILayout> | string | undefined;
    balloonShadowOffset?: number[] | undefined;
    balloonZIndex?: string | undefined;
  }

  class Circle implements GeoObject<ICircleGeometry> {
    constructor(
      geometry: ICircleGeometry[][][][] | number[][] | object,
      properties?: object | IDataManager,
      options?: ICircleOptions,
    );

    balloon: geoObject.Balloon;

    editor: IGeometryEditor;

    hint: geoObject.Hint;

    events: event.Manager;

    options: option.Manager;

    properties: data.Manager;

    state: data.Manager;

    geometry: ICircleGeometry | null;

    indices: ArrayBuffer;

    vertices: ArrayBuffer;

    getOverlay(): Promise<IOverlay | null>;

    getOverlaySync(): IOverlay | null;

    getParent(): null | IControlParent;

    setParent(parent: IControlParent): this;

    getMap(): Map;
  }

  interface ICircleOptions {
    circleOverlay?:
      | string
      | ((geometry: IPixelCircleGeometry, data: object, options: object) => Promise<IOverlay>);
    cursor?: string;
    draggable?: boolean;
    fill?: boolean;
    fillColor?: string;
    fillImageHref?: string;
    fillMethod?: 'stretch' | 'tile';
    fillOpacity?: number;
    hasBalloon?: boolean;
    hasHint?: boolean;
    hideIconOnBalloonOpen?: boolean;
    interactiveZIndex?: boolean;
    interactivityModel?: InteractivityModelKey;
    opacity?: number;
    openBalloonOnClick?: boolean;
    openEmptyBalloon?: boolean;
    openEmptyHint?: boolean;
    openHintOnHover?: boolean;
    outline?: boolean;
    pane?: string;
    strokeColor?: string[][] | string[] | string;
    strokeOpacity?: number[][] | number[] | number;
    strokeStyle?: string[][][] | object[][] | string[] | object[] | string | object;
    strokeWidth?: number[][] | number[] | number;
    syncOverlayInit?: boolean;
    useMapMarginInDragging?: boolean;
    visible?: boolean;
    zIndex?: number;
    zIndexActive?: number;
    zIndexDrag?: number;
    zIndexHover?: number;
  }

  class Clusterer implements IChildOnMap, ICustomizable, IEventEmitter, IParentOnMap {
    constructor(options?: IClustererOptions);

    events: IEventManager;

    options: option.Manager;

    balloon: clusterer.Balloon;

    hint: clusterer.Hint;

    add(objects: IGeoObject | IGeoObject[]): this;

    createCluster(center: number[], geoObjects: IGeoObject[]): IGeoObject;

    getBounds(): number[][] | null;

    getClusters(): IGeoObject[];

    getGeoObjects(): IGeoObject[];

    getMap(): Map;

    getObjectState(geoObject: IGeoObject): { isShown: boolean; cluster: any; isClustered: boolean };

    getParent(): IParentOnMap | null;

    remove(objects: IGeoObject | IGeoObject[]): this;

    removeAll(): this;

    setParent(parent: IControlParent): this;
  }

  interface IClustererOptionsInject {
    gridSize?: number;
    groupByCoordinates?: boolean;
    hasBalloon?: boolean;
    hasHint?: boolean;
    margin?: number[] | number | undefined;
    maxZoom?: number[] | number;
    minClusterSize?: number;
    preset?: PresetKey;
    showInAlphabeticalOrder?: boolean;
    useMapMargin?: boolean;
    viewportMargin?: number[] | number | undefined;
    zoomMargin?: number[] | number | undefined;
  }

  interface IClustererOptions
    extends IClustererOptionsInject,
      IClusterPlacemarkOptionsWithClusterPrefix {
    hasBalloon?: boolean | undefined;
    hasHint?: boolean | undefined;

    [key: string]: any;
  }

  class ClusterPlacemark implements IGeoObject, collection.Item {
    constructor(
      geometry: number[] | object | IPointGeometry,
      properties: IClusterPlacemarkProperties,
      options?: IClusterPlacemarkOptions,
    );

    geometry: IGeometry | null;

    properties: IDataManager;

    events: IEventManager;

    options: IOptionManager;

    state: data.Manager;

    getOverlay(): Promise<IOverlay | null>;

    getOverlaySync(): IOverlay | null;

    getParent(): null | IControlParent;

    setParent(parent: IControlParent): this;

    getMap(): Map;

    onAddToMap(map: Map): void;

    onRemoveFromMap(oldMap: Map): void;

    getBounds(): number[][] | null;

    getGeoObjects(): IGeoObject[];
  }

  interface IClusterPlacemarkProperties extends IDataManager {
    geoObjects: IGeoObject[];
  }

  interface IClusterPlacemarkOptions {
    balloonContentLayout?: IClassConstructor<ILayout> | ClusterLayoutKey | undefined;
    balloonContentLayoutHeight?: number;
    balloonContentLayoutWidth?: number;
    balloonItemContentLayout?: ILayout | ClusterContentLayoutKey | undefined;
    balloonPanelContentLayout?: IClassConstructor<ILayout> | ClusterLayoutKey | undefined;
    cursor?: string;
    disableClickZoom?: boolean;
    hideIconOnBalloonOpen?: boolean;
    iconColor?: string;
    iconContentLayout?: string | IClassConstructor<ILayout>;
    iconLayout?: string | IClassConstructor<ILayout>;
    icons?: {
      href: string;
      size: number[];
      offset: number[];
      shape?: IShape | IGeometryJson;
    }[];
    iconShape?: IGeometryJson;
    interactivityModel?: InteractivityModelKey;
    numbers?: number[];
    openBalloonOnClick?: boolean;
    openEmptyHint?: boolean;
    openHintOnHover?: boolean;
    zIndexHover?: number;
  }

  interface IClusterPlacemarkOptionsWithClusterPrefix {
    clusterBalloonContentLayout?: IClassConstructor<ILayout> | ClusterLayoutKey | undefined;
    clusterBalloonContentLayoutHeight?: number | undefined;
    clusterBalloonContentLayoutWidth?: number | undefined;
    clusterBalloonItemContentLayout?: ILayout | ClusterContentLayoutKey | undefined;
    clusterBalloonPanelContentLayout?: IClassConstructor<ILayout> | ClusterLayoutKey | undefined;
    clusterCursor?: string | undefined;
    clusterDisableClickZoom?: boolean | undefined;
    clusterHideIconOnBalloonOpen?: boolean | undefined;
    clusterIconColor?: string | undefined;
    clusterIconContentLayout?: IClassConstructor<ILayout> | string | undefined;
    clusterIconLayout?: IClassConstructor<ILayout> | string | undefined;
    clusterIcons?: {
      href: string;
      size: number[];
      offset: number[];
      shape?: IShape | IGeometryJson | undefined;
    }[];
    clusterIconShape?: IGeometryJson | undefined;
    clusterInteractivityModel?: InteractivityModelKey | undefined;
    clusterNumbers?: number[] | undefined;
    clusterOpenBalloonOnClick?: boolean | undefined;
    clusterOpenEmptyHint?: boolean | undefined;
    clusterOpenHintOnHover?: boolean | undefined;
    clusterZIndexHover?: number | undefined;
  }

  class Collection<T = {}> implements ICollection, collection.Item {
    constructor(options?: object);

    events: IEventManager;

    options: IOptionManager;

    add(object: object): this;

    getIterator(): IIterator;

    remove(object: object): this;

    getParent(): null | IControlParent;

    setParent(parent: IControlParent): this;

    getMap(): Map;

    onAddToMap(map: Map): void;

    onRemoveFromMap(oldMap: Map): void;

    filter(filterFunction: (object: object) => boolean): object[];

    get(index: number): object;

    getAll(): T[];

    getLength(): number;

    indexOf(childToFind: object): number;

    removeAll(): this;
  }

  class Event<OriginalEvent = {}, TargetGeometry = {}>
    implements IEvent<OriginalEvent, TargetGeometry>
  {
    constructor(originalEvent: object, sourceEvent: IEvent);

    originalEvent: {
      domEvent: {
        originalEvent: OriginalEvent;
      };
      target: {
        geometry?: TargetGeometry;
      };
    };

    allowMapEvent(): void;

    callMethod(name: string): void;

    get<T extends OriginalEvent, K extends keyof T = keyof T>(name: K): T[K];

    get(name: string): any;

    getSourceEvent(): IEvent<OriginalEvent, TargetGeometry> | null;

    isDefaultPrevented(): boolean;

    isImmediatePropagationStopped(): boolean;

    isMapEventAllowed(): boolean;

    isPropagationStopped(): boolean;

    preventDefault(): boolean;

    stopImmediatePropagation(): boolean;

    stopPropagation(): boolean;
  }

  class DomEvent<OriginalEvent = {}, TargetGeometry = {}>
    implements IDomEvent<OriginalEvent, TargetGeometry>
  {
    constructor(originalEvent: DomEvent, type?: object);

    originalEvent: {
      domEvent: {
        originalEvent: OriginalEvent;
      };
      target: {
        geometry?: TargetGeometry | undefined;
      };
    };

    allowMapEvent(): void;

    callMethod(name: string): void;

    get<T extends OriginalEvent, K extends keyof T = keyof T>(name: K): T[K];
    get(name: string): any;

    getSourceEvent(): IDomEvent<OriginalEvent, TargetGeometry>;

    isDefaultPrevented(): boolean;

    isImmediatePropagationStopped(): boolean;

    isMapEventAllowed(): boolean;

    isPropagationStopped(): boolean;

    preventDefault(): boolean;

    stopImmediatePropagation(): boolean;

    stopPropagation(): boolean;
  }

  class GeoObject<T = IGeometry, TargetGeometry = {}> implements IGeoObject<T> {
    constructor(feature?: IGeoObjectFeature, options?: IGeoObjectOptions);

    geometry: T | null;

    balloon: geoObject.Balloon;

    editor: IGeometryEditor;

    hint: geoObject.Hint;

    events: event.Manager<TargetGeometry>;

    options: option.Manager;

    properties: data.Manager;

    state: data.Manager;

    getOverlay(): Promise<IOverlay | null>;

    getOverlaySync(): IOverlay | null;

    getParent(): null | IControlParent;

    setParent(parent: IControlParent): this;

    getMap(): Map;
  }

  interface IGeoObjectFeature {
    geometry?: IGeometry | IGeometryJson;
    properties?: IDataManager | object;
  }

  interface IGeoObjectOptions
    extends IBalloonOptionsWithBalloonPrefix,
      IHintOptionsWithHintPrefix,
      ICircleOptions {
    iconCaptionMaxWidth?: number;
    iconColor?: string;
    iconContentLayout?: string | IClassConstructor<ILayout>;
    iconContentOffset?: number[];
    iconContentPadding?: number[];
    iconContentSize?: number[];
    iconImageClipRect?: number[][];
    iconImageHref?: string;
    iconImageOffset?: number[];
    iconImageShape?: IShape | null;
    iconImageSize?: number[];
    iconLayout?: string | IClassConstructor<ILayout>;
    iconMaxHeight?: number;
    iconMaxWidth?: number;
    iconOffset?: number[];
    iconShadow?: boolean;
    iconShadowImageClipRect?: number[][];
    iconShadowImageHref?: string;
    iconShadowImageOffset?: number[];
    iconShadowImageSize?: number[];
    iconShadowLayout?: string | IClassConstructor<ILayout>;
    iconShadowOffset?: number[];
    lineStringOverlay?: OverlayKey;
    pointOverlay?: OverlayKey;
    polygonOverlay?: OverlayKey;
    preset?: PresetKey | undefined;
    rectangleOverlay?: OverlayKey;
    setMapCursorInDragging?: boolean;

    [key: string]: any;
  }

  class GeoObjectCollection implements IGeoObject, IGeoObjectCollection {
    constructor(
      feature?: {
        children?: IGeoObject[];
        geometry?: IGeometry | object;
        properties?: IDataManager | object;
      },
      options?: object,
    );

    geometry: IGeometry | null;

    properties: IDataManager;

    state: IDataManager;

    events: IEventManager;

    options: IOptionManager;

    getOverlay(): Promise<IOverlay | null>;

    getOverlaySync(): IOverlay | null;

    getParent(): null | IControlParent;

    setParent(parent: IControlParent): this;

    getMap(): Map;

    add(child: IGeoObject, index?: number): this;

    each(callback: (object: IGeoObject) => void, context?: object): void;

    get(index: number): IGeoObject;

    getBounds(): number[][] | null;

    getIterator(): IIterator;

    getLength(): number;

    getPixelBounds(): number[][] | null;

    indexOf(object: IGeoObject): number;

    remove(child: IGeoObject): this;

    removeAll(): this;

    set(index: number, child: IGeoObject): this;

    splice(index: number, length: number): this;

    toArray(): IGeoObject[];
  }

  interface ILayerOptions {
    brightness?: number;
    notFoundTile?: string | null;
    pane?: IPane | string;
    projection?: any;
    tileSize?: number[][];
    tileTransparent?: boolean;
    zIndex?: number;
  }

  class Layer implements ILayer, IParentOnMap, IPositioningContext {
    constructor(
      tileUrlTemplate: string | ((tileNumber: number[], tileZoom: number) => string),
      options?: ILayerOptions,
    );

    events: IEventManager;

    options: IOptionManager;

    clientPixelsToNumber(clientPixelPoint: number, tileZoom: number): number[];

    fromClientPixels(clientPixelPoint: number[]): number[];

    getBrightness?(): number;

    getCopyrights?(coords: number[], zoom: number): Promise<Array<string | HTMLElement>>;

    getMap(): Map;

    getPane(): IPane;

    getParent(): null | IControlParent;

    getTileSize(zoom: number): number[];

    getTileStatus(): { readyTileNumber: number; totalTileNumber: number };

    getTileUrl(tileNumber: number[], tileZoom: number): string | null;

    getTileUrlTemplate(): string | any;

    getZoom(): number;

    getZoomRange?(point: number[]): Promise<number[]>;

    numberToClientBounds(tileNumber: number[], tileZoom: number): number[][];

    restrict(num: number[], tileZoom: number): number[] | null;

    setParent(parent: IControlParent): this;

    setTileUrlTemplate(tileUrlTemplate: string | any): void;

    toClientPixels(globalPixelPoint: number[]): number[];

    update(updateBounds: any): void;

    getAlias(): string;

    getElement(): HTMLElement;
  }

  type IHint = IPopup<IHint>;

  interface IHintOptions {
    closeTimeout?: number;
    contentLayout?: IClassConstructor<ILayout> | string;
    fitPane?: boolean;
    holdByMouse?: boolean;
    interactivityModel?: InteractivityModelKey;
    layout?: IClassConstructor<ILayout> | string;
    offset?: number[];
    openTimeout?: number;
    pane?: string;
    zIndex?: number;
  }

  interface IHintOptionsWithHintPrefix {
    hintCloseTimeout?: number;
    hintContentLayout?: IClassConstructor<ILayout> | string;
    hintFitPane?: boolean;
    hintHoldByMouse?: boolean;
    hintInteractivityModel?: InteractivityModelKey;
    hintLayout?: IClassConstructor<ILayout> | string;
    hintOffset?: number[];
    hintOpenTimeout?: number;
    hintPane?: string;
    hintZIndex?: number;
  }

  class Hint extends Popup<Hint> implements IHint {
    constructor(map: Map, options?: IHintOptions);
  }

  class Map implements IDomEventEmitter {
    constructor(parentElement: HTMLElement | string, state: IMapState, options?: IMapOptions);

    action: map.action.Manager;

    balloon: map.Balloon;

    behaviors: map.behavior.Manager;

    container: map.Container;

    controls: control.Manager;

    converter: map.Converter;

    copyrights: map.Copyrights;

    cursors: util.cursor.Manager;

    events: event.Manager;

    geoObjects: map.GeoObjects;

    hint: map.Hint;

    layers: map.layer.Manager;

    margin: map.margin.Manager;

    options: option.Manager;

    panes: map.pane.Manager;

    zoomRange: map.ZoomRange;

    destroy(): void;

    getBounds(options?: IMapMarginOptions): number[][];

    getCenter(options?: IMapMarginOptions): number[];

    getGlobalPixelCenter(options?: IMapMarginOptions): number[];

    getPanoramaManager(): Promise<panorama.Manager>;

    getType(): string | MapType;

    getZoom(): number;

    panTo(center: number[] | object[], options?: IMapPanOptions): this;

    setBounds(bounds: number[][], options?: IMapBoundsOptions): this;

    setCenter(center: number[], zoom?: number, options?: IMapPositionOptions): this;

    setGlobalPixelCenter(
      globalPixelCenter: number[],
      zoom?: number,
      options?: IMapPositionOptions,
    ): this;

    setType(type: string | MapType, options?: IMapCheckZoomRangeOptions): this;

    setZoom(zoom: number, options?: IMapZoomOptions): this;
  }

  class MapEvent<OriginalEvent = {}, TargetGeometry = {}> extends Event<
    OriginalEvent,
    TargetGeometry
  > {
    get(name: string): any;
    get(name: 'coords' | 'globalPixels' | 'pagePixels' | 'clientPixels'): [number, number];
    get(name: 'domEvent'): DomEvent<OriginalEvent, TargetGeometry> | undefined;
  }

  interface IMapMarginOptions {
    useMapMargin?: boolean;
  }

  interface IMapCheckZoomRangeOptions {
    checkZoomRange?: boolean;
  }

  interface IMapZoomOptions extends IMapMarginOptions, IMapCheckZoomRangeOptions {
    duration?: number;
  }

  interface IMapPositionOptions extends IMapZoomOptions {
    timingFunction?: string;
  }

  interface IMapBoundsOptions extends IMapPositionOptions {
    preciseZoom?: boolean;
    zoomMargin?: number[][] | number[];
  }

  interface IMapPanOptions extends IMapPositionOptions {
    delay?: number;
    flying?: boolean;
    safe?: boolean;
  }

  class MapType {
    constructor(name: string, layers: Array<IClassConstructor<Layer> | string>);
  }

  interface IMapState {
    behaviors?: string[];
    bounds?: number[][];
    center?: number[];
    controls?: ControlKey[];
    margin?: number | number[];
    type?: 'yandex#map' | 'yandex#satellite' | 'yandex#hybrid' | MapType;
    zoom?: number;
  }

  interface IMapOptions {
    autoFitToViewport?: 'none' | 'ifNull' | 'always';
    avoidFractionalZoom?: boolean;
    exitFullscreenByEsc?: boolean;
    fullscreenZIndex?: number;
    mapAutoFocus?: boolean;
    maxAnimationZoomDifference?: number;
    maxZoom?: number;
    minZoom?: number;
    nativeFullscreen?: boolean;
    projection?: IProjection;
    restrictMapArea?: boolean | number[][] | undefined;
    suppressMapOpenBlock?: boolean;
    suppressObsoleteBrowserNotifier?: boolean;
    yandexMapAutoSwitch?: boolean;
    yandexMapDisablePoiInteractivity?: boolean;

    copyrightLogoVisible?: boolean;
    copyrightProvidersVisible?: boolean;
    copyrightUaVisible?: boolean;
  }

  class Placemark extends GeoObject<IPointGeometry, geometry.Point> {
    constructor(
      geometry: number[] | object | IPointGeometry,
      properties?: IPlacemarkProperties | IDataManager,
      options?: IPlacemarkOptions,
    );
  }

  interface IPlacemarkProperties {
    iconContent?: string;
    iconCaption?: string;
    hintContent?: string;
    balloonContent?: string;
    balloonContentHeader?: string;
    balloonContentBody?: string;
    balloonContentFooter?: string;
    [key: string]: any;
  }

  interface IPlacemarkOptions
    extends layout.IImageOptionsWithIconPrefix,
      layout.IImageWithContentOptionsWithIconPrefix,
      layout.IPieChartOptionsWithIconPrefix,
      IBalloonOptionsWithBalloonPrefix,
      IHintOptionsWithHintPrefix {
    cursor?: string;
    draggable?: boolean;
    hasBalloon?: boolean;
    hasHint?: boolean;
    hideIconOnBalloonOpen?: boolean;
    iconColor?: string | undefined;
    iconLayout?: IClassConstructor<ILayout> | IconLayoutKey | undefined;
    iconOffset?: number[];
    iconShape?: IGeometryJson | null;
    interactiveZIndex?: boolean;
    interactivityModel?: InteractivityModelKey | undefined;
    openBalloonOnClick?: boolean;
    openEmptyBalloon?: boolean;
    openEmptyHint?: boolean;
    openHintOnHover?: boolean;
    pane?: string;
    pointOverlay?: string;
    preset?: PresetKey | undefined;
    syncOverlayInit?: boolean;
    useMapMarginInDragging?: boolean;
    visible?: boolean;
    zIndex?: number;
    zIndexActive?: number;
    zIndexDrag?: number;
    zIndexHover?: number;

    [key: string]: any;
  }

  class Polygon extends GeoObject<IPolygonGeometry> {
    constructor(
      geometry: number[][][] | object | IPolygonGeometry,
      properties?: object | IDataManager,
      options?: IPolygonOptions,
    );
  }

  interface IPolygonOptions {
    cursor?: string;
    draggable?: boolean;
    fill?: boolean;
    fillColor?: string;
    fillImageHref?: string;
    fillMethod?: 'stretch' | 'tile';
    fillOpacity?: number;
    hasBalloon?: boolean;
    hasHint?: boolean;
    interactiveZIndex?: boolean;
    interactivityModel?: InteractivityModelKey | undefined;
    opacity?: number;
    openBalloonOnClick?: boolean;
    openEmptyBalloon?: boolean;
    openEmptyHint?: boolean;
    openHintOnHover?: boolean;
    outline?: boolean;
    pane?: string;
    polygonOverlay?: string;
    strokeColor?: string | string[];
    strokeOpacity?: number | number[];
    strokeStyle?: string | string[] | object | object[];
    strokeWidth?: number | number[];
    syncOverlayInit?: boolean;
    useMapMarginInDragging?: boolean;
    visible?: boolean;
    zIndex?: number;
    zIndexActive?: number;
    zIndexDrag?: number;
    zIndexHover?: number;
  }

  class Polyline extends GeoObject<ILineStringGeometry> {
    constructor(
      geometry: number[][] | object | ILineStringGeometry,
      properties?: object | IDataManager,
      options?: IPolylineOptions,
    );
  }

  interface IPolylineOptions {
    cursor?: string;
    draggable?: boolean;
    hasBalloon?: boolean;
    hasHint?: boolean;
    interactiveZIndex?: boolean;
    interactivityModel?: InteractivityModelKey | undefined;
    lineStringOverlay?: () => object | string;
    opacity?: number;
    openBalloonOnClick?: boolean;
    openEmptyBalloon?: boolean;
    openEmptyHint?: boolean;
    openHintOnHover?: boolean;
    pane?: string;
    strokeColor?: string | string[];
    strokeOpacity?: number | number[];
    strokeStyle?: string | string[] | object | object[];
    strokeWidth?: number | number[];
    syncOverlayInit?: boolean;
    useMapMarginInDragging?: boolean;
    visible?: boolean;
    zIndex?: number;
    zIndexActive?: number;
    zIndexDrag?: number;
    zIndexHover?: number;
  }

  class Popup<T> implements IPopup<T> {
    constructor(map: Map, options?: IPopupOptions);

    options: IOptionManager;

    events: IEventManager;

    close(force?: boolean): Promise<T>;

    getData(): object;

    getOverlay(): Promise<IOverlay>;

    getOverlaySync(): IOverlay;

    getPosition(): number[];

    isOpen(): boolean;

    open(position: number[], data: object | string | HTMLElement): Promise<T>;

    setData(data: object | string | HTMLElement): Promise<T>;

    setPosition(position: number[]): Promise<T>;
  }

  interface IPopupOptions {
    closeTimeout?: number;
    interactivityModel?: InteractivityModelKey;
    openTimeout?: number;
    pane?: IPane | string;
    projection?: IProjection;
    zIndex?: number;
  }

  function ready(
    successCallback?: () => any | IReadyObject,
    errorCallback?: () => any,
    context?: object,
  ): Promise<void>;

  interface IReadyObject {
    require?: string[];
    context?: object;

    successCallback?(): void;

    errorCallback?(): void;
  }

  namespace regions {
    function load(
      region: string,
      options?: {
        disputedBorders?: string;
        lang?: string;
        quality?: number;
      },
    ): vow.Promise;
  }

  namespace templateLayoutFactory {
    function createClass<O extends {} = {}, S extends {} = {}>(
      template: string,
      overrides?: O,
      staticMethods?: S,
    ): IClassConstructor<layout.templateBased.Base & O & S>;
  }

  type ResolveCallbackFunction = (
    provide: (module: any, error?: any) => void,
    ...depends: any[]
  ) => void;

  interface IRatioMap {
    [key: string]: string;
  }

  namespace util {
    class AsyncStorage extends Storage {
      define(
        key: string,
        depends: string[],
        resolveCallback: ResolveCallbackFunction,
        context?: object,
      ): this;

      define(key: string, resolveCallback: ResolveCallbackFunction, context?: object): this;

      isDefined(key: string): boolean;

      require(
        keys: string | string[],
        successCallback?: (...args: any[]) => void,
        errorCallback?: (error: any) => void,
        context?: object,
      ): vow.Promise;
    }

    function augment(ChildClass: any, ParentClass: any, override: object): any;

    function bind(callback: any, context: object): any;

    const bounds: {
      areIntersecting(
        bounds1: number[][],
        bounds2: number[][],
        projection?: typeof ymaps.projection.wgs84Mercator,
      ): boolean;

      containsBounds(
        outer: number[][],
        inner: number[][],
        projection?: typeof ymaps.projection.wgs84Mercator,
      ): boolean;

      containsPoint(
        bounds: number[][],
        point: number[],
        projection?: typeof ymaps.projection.wgs84Mercator,
      ): boolean;

      fromBounds(
        sourceBounds: number[][],
        projection?: typeof ymaps.projection.wgs84Mercator,
      ): number[][];

      fromGlobalPixelBounds(
        pixelBounds: number[][],
        zoom: number,
        projection?: typeof ymaps.projection.wgs84Mercator,
      ): number[][];

      fromPoints(
        points: number[][],
        projection?: typeof ymaps.projection.wgs84Mercator,
      ): number[][];

      getCenter(bounds: number[][], projection?: typeof ymaps.projection.wgs84Mercator): number[];

      getCenterAndZoom(
        bounds: number[][],
        containerSize: number[],
        projection?: typeof ymaps.projection.wgs84Mercator,
        params?: {
          inscribe?: boolean;
          margin?: number | number[];
          preciseZoom?: boolean;
        },
      ): object;

      getIntersections(
        bounds1: number[][],
        bounds2: number[][],
        projection?: typeof ymaps.projection.wgs84Mercator,
      ): number[][][];

      getSize(bounds: number[][], projection?: typeof ymaps.projection.wgs84Mercator): number[];

      toGlobalPixelBounds(
        geoBounds: number[][],
        zoom: number[],
        projection?: typeof ymaps.projection.wgs84Mercator,
      ): number[][];
    };

    namespace cursor {
      class Accessor {
        constructor(key: string);

        getKey(): string;

        remove(): void;

        setKey(key: string): void;
      }

      class Manager {
        constructor(element: HTMLElement);

        events: event.Manager;

        push(key: string): Accessor;
      }
    }

    function defineClass(constructor: any, parentClass?: any, override?: object): any;

    function defineClass(constructor: any, override?: object): any;

    class Dragger implements IEventEmitter {
      constructor(params?: {
        autoStartElement?: HTMLElement | IDomEventEmitter;
        byRightButton?: boolean;
        tremor?: number;
      });

      events: IEventManager;

      destroy(): void;

      isDragging(): boolean;

      start(event: IDomEvent): void;

      stop(): void;
    }

    function extend(target: object, ...source: object[]): object;

    const hd: {
      getPixelRatio(): number;

      selectRatio(hash: IRatioMap): number;

      selectValue(hash: object | IRatioMap): object;
    };

    namespace math {
      function areEqual(first: number[], second: number[], diff?: number): boolean;

      function cycleRestrict(value: number, min: number, max: number): number;

      function restrict(value: number, min: number, max: number): number;
    }

    const pixelBounds: {
      areIntersecting(bounds1: number[][], bounds2: number[][]): boolean;

      containsBounds(outer: number[][], inner: number[][]): boolean;

      containsPoint(bounds: number[][], point: number[][]): boolean;

      fromBounds(sourceBounds: number[][]): number[][];

      fromPoints(points: number[][]): number[][];

      getCenter(bounds: number[][]): number[];

      getIntersection(bounds1: number[][], bounds2: number[][]): number[][] | null;

      getSize(bounds: number[][]): number[];
    };

    function requireCenterAndZoom(
      mapType: string | MapType | map.ZoomRange,
      bounds: number[][],
      containerSize: number[],
      params?: {
        inscribe?: boolean;
        margin?: number | number[];
        preciseZoom?: boolean;
      },
    ): vow.Promise;

    class Storage {
      add(key: string, object: object): this;

      get(key: string | object): object | string;

      remove(key: string): object;
    }
  }

  namespace vow {
    class Deferred {
      promise(): Promise;

      reject(reason: object): void;

      resolve(value: object): void;
    }

    class Promise {
      constructor(resolver?: () => void);

      done(
        onFulfilled?: (...args: any[]) => void,
        onRejected?: (err?: Error | any) => void,
        onProgress?: (...args: any[]) => void,
        ctx?: object,
      ): void;

      spread(
        onFulfilled?: (...args: any[]) => void,
        onRejected?: (err?: Error | any) => void,
        ctx?: object,
      ): Promise;

      then(
        onFulfilled?: (...args: any[]) => void,
        onRejected?: (err?: Error | any) => void,
        onProgress?: (...args: any[]) => void,
        ctx?: object,
      ): Promise;

      valueOf(): object;
    }

    function resolve(value: any): any;
  }

  /* Interfaces */

  interface IBaloon<T> extends IPopup<T>, ICustomizable, IChild<T>, IFreezable {
    autoPan(): Promise<T>;
  }

  interface IBalloonManager<T> extends IPopupManager<T> {
    autoPan(): Promise<T>;
  }

  interface IBaseGeometry extends IEventEmitter {
    getBounds(): number[][] | null;

    getType(): string;
  }

  interface IBaseLineStringGeometry extends IBaseGeometry, ILineStringGeometryAccess {}

  interface IBasePointGeometry extends IBaseGeometry, IPointGeometryAccess {}

  interface IBasePolygonGeometry extends IBaseGeometry, IPolygonGeometryAccess {}

  interface IBehavior extends IChildOnMap, ICustomizable {
    disable(): void;

    enable(): void;

    isEnabled(): boolean;
  }

  interface IChild<T> extends IEventEmitter {
    getParent(): object | null;

    setParent(parent: object | null): this;
  }

  type IChildOnMap = IChild<IControlParent>;

  interface ICircleGeometry extends ICircleGeometryAccess, IGeometry {}

  interface ICircleGeometryAccess extends IFreezable {
    contains(position: number[]): boolean;

    getClosest(anchorPosition: number[]): object;

    getCoordinates(): number[] | null;

    getRadius(): number;

    setCoordinates(coordinates: number[] | null): this;

    setRadius(radius: number): this;
  }

  interface ICollection extends IEventEmitter {
    add(object: object): this;

    getIterator(): IIterator;

    remove(object: object): this;
  }

  interface IContainerPane extends IPane, IPositioningContext {}

  type IControl = IChildOnMap;

  interface IControlParent extends IParentOnMap {
    getChildElement(child: IControl): Promise<HTMLElement>;
  }

  interface ICoordSystem {
    getDistance(point1: number[], point2: number[]): number;

    solveDirectProblem(startPoint: number[], direction: number[], distance: number): object;

    solveInverseProblem(
      startPoint: number[],
      endPoint: number[],
      reverseDirection?: boolean,
    ): object;
  }

  type ICopyrightsAccessor = ICopyrightsProvider;

  interface ICopyrightsProvider extends IEventEmitter {
    getCopyrights(coords: number[], zoom: number): Promise<Array<string | HTMLElement>>;

    remove(): void;

    setCopyrights(copyrights: string | HTMLElement | Array<string | HTMLElement>): void;
  }

  interface ICustomizable extends IEventEmitter {
    options: IOptionManager;
  }

  interface IDataManager extends IEventEmitter {
    set(key: object | string, value?: object | number | string | null | undefined): this;

    get(path: string, defaultValue?: object): object;
  }

  type IDomEventEmitter = IEventEmitter;

  interface IEvent<OriginalEvent = {}, TargetGeometry = {}> {
    originalEvent: {
      domEvent: {
        originalEvent: OriginalEvent;
      };
      target: {
        geometry?: TargetGeometry | undefined;
      };
    };

    allowMapEvent(): void;

    callMethod(name: string): void;

    get<T extends OriginalEvent, K extends keyof T = keyof T>(name: K): T[K];

    get(name: 'type'): string;

    get(name: 'objectId'): string | undefined;

    get(name: 'newZoom' | 'oldZoom'): number | undefined;

    get(name: string): any;

    getSourceEvent(): IEvent<OriginalEvent, TargetGeometry> | null;

    isDefaultPrevented(): boolean;

    isImmediatePropagationStopped(): boolean;

    isMapEventAllowed(): boolean;

    isPropagationStopped(): boolean;

    preventDefault(): boolean;

    stopImmediatePropagation(): boolean;

    stopPropagation(): boolean;
  }

  interface IDomEvent<OriginalEvent = {}, TargetGeometry = {}>
    extends IEvent<OriginalEvent, TargetGeometry> {
    getSourceEvent(): IDomEvent<OriginalEvent, TargetGeometry>;
  }

  interface IEventController {
    onStartListening?(events: IEventManager, type: string): void;

    onStopListening?(events: IEventManager, type: string): void;
  }

  interface IEventEmitter {
    events: IEventManager;
  }

  interface IEventGroup {
    add<K extends keyof EventMap>(
      types: K,
      callback: (event: EventMap[K] | IEvent) => void,
      context?: object,
      priority?: number,
    ): this;

    add(
      types: string[][] | string[] | string,
      callback: (event: object | IEvent) => void,
      context?: object,
      priority?: number,
    ): this;

    remove(
      types: string[][] | string[] | string,
      callback: (event: object | IEvent) => void,
      context?: object,
      priority?: number,
    ): this;

    removeAll(): this;
  }

  interface IEventManager<TargetGeometry = {}> extends IEventTrigger {
    add<K extends keyof EventMap>(
      types: K,
      callback: (event: IEvent<EventMap[K], TargetGeometry>) => void,
      context?: object,
      priority?: number,
    ): this;

    add(
      types: string[][] | string[] | string,
      callback: (event: IEvent) => void,
      context?: object,
      priority?: number,
    ): this;

    getParent(): object | null;

    group(): IEventGroup;

    remove(
      types: string[][] | string[] | string,
      callback: (event: object | IEvent) => void,
      context?: object,
      priority?: number,
    ): this;

    setParent(parent: object | null): this;
  }

  interface IEventPane extends IDomEventEmitter, IPane {}

  interface IEventTrigger {
    fire(type: string, eventObject?: object | IEvent): this;
  }

  interface IEventWorkflowController extends IEventController {
    onAfterEventFiring?(events: IEventManager, type: string, event?: IEvent): void;

    onBeforeEventFiring?(events: IEventManager, type: string, event?: IEvent): void;
  }

  type IExpandableControlLayout = ILayout;

  interface IFreezable {
    events: IEventManager;

    freeze(): IFreezable;

    isFrozen(): boolean;

    unfreeze(): IFreezable;
  }

  interface IGeocodeProvider {
    geocode(
      request: string,
      options?: {
        boundedBy?: number[][];
        results?: number;
        skip?: number;
        strictBounds?: boolean;
      },
    ): Promise<object>;

    suggest(
      request: string,
      options?: {
        boundedBy?: number[][];
        results?: number;
        strictBounds?: boolean;
      },
    ): Promise<object>;
  }

  function geocode(request: string | number[], options?: IGeocodeOptions): Promise<object>;

  interface IGeocodeOptions {
    boundedBy?: number[][];
    json?: boolean;
    kind?: string;
    provider?: IGeocodeProvider | string;
    results?: number;
    searchCoordOrder?: string;
    skip?: number;
    strictBounds?: boolean;
  }

  interface IGeometry extends IBaseGeometry, ICustomizable {
    getMap(): Map | null;

    getPixelGeometry(options?: object): IPixelGeometry;

    setMap(map: Map): void;
  }

  interface IGeometryEditor extends ICustomizable, IEventEmitter {
    geometry: IGeometry;
    state: IDataManager;

    startEditing(): void;

    stopEditing(): void;
  }

  interface IGeometryEditorChildModel extends IGeometryEditorModel {
    editor: IGeometryEditor;
    geometry: IBaseGeometry;

    getParent(): IGeometryEditorModel;

    setPixels(pixels: number[]): void;
  }

  interface IGeometryEditorModel extends IEventEmitter {
    destroy(): void;

    getPixels(): number[];
  }

  type IGeometryEditorRootModel = IGeometryEditorModel;

  interface IGeometryJson {
    type: string;
    coordinates: number[] | number[][] | number[][][];
    fillRule?: 'evenOdd' | 'nonZero';
    radius?: number;
    [key: string]: any;
  }

  interface IGeoObject<T = IGeometry>
    extends IChildOnMap,
      ICustomizable,
      IDomEventEmitter,
      IParentOnMap {
    geometry: T | null;

    properties: IDataManager;

    state: IDataManager;

    balloon?: geoObject.Balloon;

    getOverlay(): Promise<IOverlay | null>;

    getOverlaySync(): IOverlay | null;
  }

  interface IGeoObjectCollection extends ICustomizable, IEventEmitter, IParentOnMap {
    add(child: IGeoObject, index?: number): this;

    each(callback: (object: IGeoObject) => void, context?: object): void;

    get(index: number): IGeoObject;

    getBounds(): number[][] | null;

    getIterator(): IIterator;

    getLength(): number;

    getPixelBounds(): number[][] | null;

    indexOf(object: IGeoObject): number;

    remove(child: IGeoObject): this;

    removeAll(): this;

    set(index: number, child: IGeoObject): this;

    splice(index: number, length: number): this;
  }

  interface IGeoObjectSequence extends ICustomizable, IEventEmitter, IParentOnMap {
    each(callback: (geoObject: IGeoObject) => void, context?: object): void;

    get(index: number): IGeoObject;

    getBounds(): number[][] | null;

    getIterator(): IIterator;

    getLength(): number;

    getPixelBounds(): number[][] | null;

    indexOf(geoObject: IGeoObject): number;
  }

  interface IPromiseProvider {
    then(onResolve: () => void, onReject: (err?: Error | any) => void): this;
  }

  type IGeoQuerySource =
    | IGeoObject
    | IGeoObject[]
    | ICollection
    | ICollection[]
    | IPromiseProvider
    | vow.Promise
    | GeoQueryResult
    | string
    | object
    | object[];

  class GeoQueryResult implements IPromiseProvider {
    constructor(source: IGeoQuerySource);

    then(onResolve: () => void, onReject?: (err?: Error | any) => void, context?: object): this;

    add(source: IGeoQuerySource): this;

    addEvents(events: string | string[], callback: () => void, context?: object): this;

    addTo(collection: ICollection): this;

    addToMap(map: Map): this;

    applyBoundsToMap(
      map: Map,
      options?: {
        checkZoomRange?: boolean;
        duration?: number;
        preciseZoom?: boolean;
        timingFUnction?: string;
        useMapMargin?: boolean;
        zoomMargin?: number | number[];
      },
    ): this;

    clusterize(options?: IClustererOptions): Clusterer;

    each(callback: (e: any) => void, context?: object): this;

    get(index: number): IGeoObject;

    getBounds(): number[][] | null;

    getCenter(map?: Map): number[];

    getCentralObject(map: Map): IGeoObject | null;

    getClosestTo(object: IGeoObject | IGeometry | Map | number[] | object | any): IGeoObject | null;

    getExtreme(key: 'top' | 'right' | 'bottom' | 'left'): number;

    getExtremeObject(key: 'top' | 'right' | 'bottom' | 'left'): IGeoObject;

    getGlobalPixelBounds(map: Map): Number[][] | null;

    getGlobalPixelCenter(map: Map): number[];

    getIterator(): IIterator;

    getLength(): number;

    getMaxZoom(map?: Map, options?: { useMapMargin?: boolean }): number;

    getParent(): this | null;

    indexOf(item: IGeoObject | any): number;

    intersect(result: this): this;

    isReady(): boolean;

    map(callback: (e: any) => void, context?: object): this;

    remove(
      objects: IGeoObject | IGeoObject[] | ICollection | ICollection[] | this | vow.Promise | any,
    ): this;

    removeEvents(events: string | string[], callback: () => void, context?: object): void;

    removeFrom(collection: ICollection): this;

    removeFromMap(map: Map): this;

    reverse(): this;

    search(condition: string | ((o: object) => boolean)): this;

    searchContaining(
      object: IGeoObject | IGeometry | Map | number[] | number[][] | object | any,
    ): this;

    searchInside(object: IGeoObject | IGeometry | Map | any): this;

    searchIntersect(
      object: IGeoObject | IGeometry | Map | any,
      options?: { considerOccurance?: boolean },
    ): this;

    setOptions(key: string | object, value?: any): this;

    setProperties(path: string, value?: any): this;

    slice(begin: number, end?: number): this;

    sort(comparator: string | ((a: any, b: any) => number)): any;

    sortByDistance(
      object: IGeoObject | IGeometry | Map | number[] | number[][] | object | any,
    ): this;

    unsetOptions(keys: string | string[]): this;

    unsetProperties(path: string): this;
  }

  function geoQuery(source: IGeoQuerySource): GeoQueryResult;

  type IHintManager<T> = IPopupManager<T>;

  interface IIterator {
    getNext(): object | null;
  }

  interface ILayer extends IChildOnMap, ICustomizable, IEventEmitter {
    getBrightness?(): number;

    getCopyrights?(coords: number[], zoom: number): Promise<Array<string | HTMLElement>>;

    getZoomRange?(point: number[]): Promise<number[]>;
  }

  interface ILayout extends IDomEventEmitter {
    destroy(): void;

    getData(): object;

    getParentElement(): HTMLElement;

    getShape(): IShape | null;

    isEmpty(): boolean;

    setData(data: object): void;

    setParentElement(parent: HTMLElement | null): void;
  }

  interface ILinearRingGeometryAccess extends IFreezable {
    contain(position: number): boolean;

    freeze(): IFreezable;

    get(index: number): number[];

    getChildGeometry(index: number): IPointGeometryAccess;

    getClosest(anchorPosition: number[]): object;

    getCoordinates(): number[][];

    getFillRule(): string;

    getLength(): number;

    insert(index: number, coordinates: number[]): ILinearRingGeometryAccess;

    isFrozen(): boolean;

    remove(index: number): number[];

    set(index: number, coordinates: number[]): ILinearRingGeometryAccess;

    setCoordinates(coordinates: number[][]): ILinearRingGeometryAccess;

    setFillRule(fillRule: string): ILinearRingGeometryAccess;

    splice(index: number, number: number): number[][];

    unfreeze(): IFreezable;
  }

  interface ILineStringGeometry extends IGeometry, ILineStringGeometryAccess {}

  interface ILineStringGeometryAccess extends IFreezable {
    get(index: number): number[];

    getChildGeometry(index: number): IPointGeometryAccess;

    getClosest(anchorPosition: number[]): object;

    getCoordinates(): number[][];

    getLength(): number;

    insert(index: number, coordinates: number[][]): ILineStringGeometryAccess;

    remove(index: number): number[];

    set(index: number, coordinates: number[]): ILineStringGeometryAccess;

    setCoordinates(coordinates: number[][]): ILineStringGeometryAccess;

    splice(index: number, length: number): number[][];
  }

  interface IMapAction extends IEventEmitter {
    begin(mapActionManager: map.action.Manager): void;

    end(): void;
  }

  interface IMapObjectCollection extends ICollection, ICustomizable, IParentOnMap {}

  interface IMultiRouteModelJson {
    params?: IMultiRouteParams;
    referencePoints: IMultiRouteReferencePoint[];
  }

  interface IMultiRouteParams {
    avoidTrafficJams?: boolean;
    boundedBy?: number[][] | null;
    requestSendInterval?: string | number;
    results?: number;
    reverseGeocoding?: boolean;
    routingMode?: 'auto' | 'masstransit' | 'pedestrian';
    searchCoordOrder?: string;
    strictBounds?: boolean;
    viaIndexes?: number[];
  }

  type IMultiRouteReferencePoint = string | number[] | geometry.Point;

  interface IOptionManager extends IChild<IOptionManager>, IEventEmitter, IFreezable {
    get(key: string, defaultValue?: object): any;

    getAll(): object;

    getName(): string;

    getNative(key: string): object;

    resolve(key: string, name?: string): object;

    set(key: object | string, value?: object | number | string | null | undefined): this;

    setName(name: string): void;
  }

  interface IOverlay extends ICustomizable, IDomEventEmitter {
    getData(): object;

    getGeometry(): IPixelGeometry;

    getMap(): Map | null;

    getShape(): IShape | null;

    isEmpty(): boolean;

    setData(data: object): void;

    setGeometry(geometry: IPixelGeometry): void;

    setMap(map: Map | null): void;
  }

  interface IPane extends IEventEmitter {
    destroy(): void;

    getElement(): HTMLElement;

    getMap(): Map;

    getOverflow(): 'visible' | 'hidden';

    getZIndex(): number;
  }

  interface IPanorama {
    getAngularBBox(): number[];

    getConnectionArrows(): IPanoramaConnectionArrow[];

    getConnectionMarkers(): IPanoramaConnectionMarker[];

    getCoordSystem(): ICoordSystem;

    getDefaultDirection(): number[];

    getDefaultSpan(): number[];

    getGraph(): IPanoramaGraph | null;

    getMarkers(): IPanoramaMarker[];

    getName(): string;

    getPosition(): number[];

    getTileLevels(): IPanoramaTileLevel[];

    getTileSize(): number[];
  }

  interface IPanoramaConnection {
    getConnectedPanorama(): Promise<IPanorama>;
  }

  interface IPanoramaConnectionArrow extends IPanoramaConnection {
    properties: data.Manager;

    getDirection(): number[];

    getPanorama(): IPanorama;
  }

  interface IPanoramaConnectionMarker extends IPanoramaConnection, IPanoramaMarker {}

  interface IPanoramaGraph {
    getEdges(): IPanoramaGraphEdge[];

    getNodes(): IPanoramaGraphEdge[];

    getPanorama(): IPanorama;
  }

  interface IPanoramaGraphEdge {
    getEndNodes(): IPanoramaGraphNode[];
  }

  interface IPanoramaGraphNode {
    getConnectedPanorama(): Promise<IPanorama>;
  }

  interface IPanoramaMarker {
    properties: data.Manager;

    getIconSet(): Promise<IPanoramaMarkerIconSet>;

    getPanorama(): IPanorama;

    getPosition(): number[];
  }

  interface IPanoramaMarkerIcon {
    image: HTMLCanvasElement | HTMLImageElement;
    offset: number[];
  }

  interface IPanoramaMarkerIconSet {
    default: IPanoramaMarkerIcon | null;
    expanded: IPanoramaMarkerIcon | null;
    expandedHovered: IPanoramaMarkerIcon | null;
    hovered: IPanoramaMarkerIcon | null;
  }

  interface IPanoramaTileLevel {
    getImageSize(): number[];

    getTileUrl(x: number, y: number): string;
  }

  interface IParentOnMap {
    getMap(): Map;
  }

  interface IPixelCircleGeometry extends IPixelGeometry {
    getCoordinates(): number[];

    getRadius(): number;
  }

  interface IPixelLineStringGeometry extends IPixelGeometry {
    getClosest(anchorPosition: number[]): object;

    getCoordinates(): number[][];

    getLength(): number;
  }

  interface IPixelPointGeometry extends IPixelGeometry {
    getCoordinates(): number[];
  }

  interface IPixelMultiLineGeometry extends IPixelGeometry {
    getClosest(anchorPosition: number[]): object;

    getCoordinates(): number[][][];

    getLength(): number;
  }

  interface IPixelMultiPolygonGeometry extends IPixelGeometry {
    contains(position: number[]): boolean;

    getClosest(anchorPosition: number[]): object;

    getCoordinates(): number[][][][];

    getFillRule(): 'evenOdd' | 'nonZero';

    getLength(): number;
  }

  interface IPixelPolygonGeometry extends IPixelGeometry {
    contains(position: number[]): boolean;

    getClosest(anchorPosition: number[]): object;

    getCoordinates(): number[][][];

    getFillRule(): 'evenOdd' | 'nonZero';

    getLength(): number;
  }

  interface IPixelRectangleGeometry extends IPixelGeometry {
    getClosest(anchorPosition: number[]): object;

    getCoordinates(): number[][];
  }

  interface IPixelGeometry extends IBaseGeometry {
    equals(geometry: IPixelGeometry): boolean;

    getMetaData(): object;

    scale(factor: number): IPixelGeometry;

    shift(offset: number[]): IPixelGeometry;
  }

  interface IPointGeometry extends IGeometry, IPointGeometryAccess {}

  interface IPointGeometryAccess {
    getCoordinates(): number[] | null;

    setCoordinates(coordinates: number[] | null): this;
  }

  interface IPolygonGeometry extends IGeometry, IPolygonGeometryAccess {}

  interface IPolygonGeometryAccess extends IFreezable {
    contains(position: number[]): boolean;

    get(index: number): number[][];

    getChildGeometry(index: number): ILinearRingGeometryAccess;

    getClosest(anchorPosition: number[]): object;

    getCoordinates(): number[][][];

    getFillRule(): string;

    getLength(): number;

    insert(index: number, path: number[][]): IPolygonGeometryAccess;

    remove(index: number): ILinearRingGeometryAccess;

    set(index: number, path: number[][]): IPolygonGeometryAccess;

    setCoordinates(coordinates: number[][][]): IPolygonGeometryAccess;

    setFillRule(fillRule: string): IPolygonGeometryAccess;

    splice(index: number, number: number): ILinearRingGeometryAccess[];
  }

  interface IPopup<T> extends ICustomizable, IEventEmitter {
    close(force?: boolean): Promise<T>;

    getData(): object;

    getOverlay(): Promise<IOverlay>;

    getOverlaySync(): IOverlay;

    getPosition(): number[];

    isOpen(): boolean;

    open(position: number[], data: object | string | HTMLElement): Promise<T>;

    setData(data: object | string | HTMLElement): Promise<T>;

    setPosition(position: number[]): Promise<T>;
  }

  interface IPopupManager<T> extends IEventEmitter {
    close(force?: boolean): Promise<T>;

    destroy(): void;

    getData(): object | null;

    getOptions(): IOptionManager | null;

    getOverlay(): Promise<IOverlay | null>;

    getOverlaySync(): IOverlay | null;

    getPosition(): number[] | null;

    isOpen(): boolean;

    open(position?: number[], data?: object | string | HTMLElement, options?: object): Promise<T>;

    setData(data: object | string | HTMLElement): Promise<T>;

    setOptions(options: object): Promise<T>;

    setPosition(position: number[]): Promise<T>;
  }

  interface IPositioningContext {
    fromClientPixels(clientPixelPoint: number[]): number[];

    getZoom(): number;

    toClientPixels(globalPixelPoint: number[]): number[];
  }

  interface IProjection {
    fromGlobalPixels(globalPixelPoint: number[], zoom: number): number[];

    getCoordSystem(): ICoordSystem;

    isCycled(): boolean[];

    toGlobalPixels(coordPoint: number[], zoom: number): number[];
  }

  interface IRoutePanel {
    options: IOptionManager;

    state: IDataManager;

    enable(): void;

    geolocate(name: string): Promise<{ geoObjects: GeoObjectCollection }>;

    getRoute(): multiRouter.MultiRoute;

    getRouteAsync(): Promise<multiRouter.MultiRoute>;

    isEnable(): boolean;

    switchPoints(): void;
  }

  type ISearchControlLayout = IExpandableControlLayout;

  interface ISelectableControl extends IControl {
    deselect(): void;

    disable(): void;

    enable(): void;

    isEnabled(): boolean;

    isSelected(): boolean;

    select(): void;
  }

  type ISelectableControlLayout = ILayout;

  interface IShape {
    contains(position: number[]): boolean;

    equals(shape: IShape): boolean;

    getBounds(): number[][] | null;

    getGeometry(): IPixelGeometry;

    getType(): string;

    scale(factor: number): IShape;

    shift(offset: number[]): IShape;
  }

  class Monitor {
    constructor(dataManager: IDataManager | IOptionManager);

    add(
      name: string[] | string,
      changeCallback: (event: object | IEvent) => void,
      context?: any,
      params?: any,
    ): Monitor;

    forceChange(): Monitor;

    get(name: string): any;

    remove(name: string): Monitor;

    removeAll(): Monitor;
  }

  class ObjectManager implements ICustomizable, IEventEmitter, IGeoObject, IParentOnMap {
    constructor(options: IObjectManagerOptions);

    clusters: objectManager.ClusterCollection;

    events: IEventManager;

    geometry: IGeometry | null;

    objects: objectManager.ObjectCollection;

    options: IOptionManager;

    properties: IDataManager;

    state: IDataManager;

    add(objects: object | object[] | string): this;

    getBounds(): number[][] | null;

    getFilter(): string | ((object: object | string) => boolean) | null;

    getMap(): Map;

    getObjectState(id: any): {
      found: boolean;
      isShown: boolean;
      cluster?: object;
      isClustered: boolean;
      isFilteredOut: boolean;
    };

    getOverlay(): Promise<IOverlay | null>;

    getOverlaySync(): IOverlay | null;

    getParent(): IParentOnMap | null;

    getPixelBounds(): number[][] | null;

    remove(objects: object | object[] | string): this;

    removeAll(): this;

    setFilter(filterFunction: (object: object | string) => boolean): void;

    setParent(parent: IParentOnMap | null): this;
  }

  interface IObjectManagerOptions
    extends IClustererOptionsInject,
      IClusterPlacemarkOptionsWithClusterPrefix {
    clusterize?: boolean | undefined;
    syncOverlayInit?: boolean | undefined;
    viewportMargin?: number[] | number | undefined;
  }

  namespace objectManager {
    class Balloon implements Omit<IBalloonManager<map.Balloon>, 'isOpen' | 'open'> {
      constructor(collection: object);

      events: IEventManager;

      autoPan(): Promise<ymaps.Balloon>;

      close(force?: boolean): Promise<ymaps.Balloon>;

      destroy(): void;

      getData(): object | null;

      getOptions(): IOptionManager | null;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getPosition(): number[] | null;

      isOpen(id: any): boolean;

      open(objectId: any, anchorPixelPosition?: boolean): Promise<ymaps.Balloon>;

      setData(objectData: object | string | HTMLElement): Promise<ymaps.Balloon>;

      setOptions(options: object): Promise<ymaps.Balloon>;

      setPosition(position: number[]): Promise<ymaps.Balloon>;
    }

    class ClusterCollection implements ICustomizable, IEventEmitter {
      balloon: objectManager.Balloon;

      events: IEventManager;

      hint: objectManager.Hint;

      options: option.Manager;

      overlays: objectManager.OverlayCollection;

      state: data.Manager;

      each(callback: (cluster: object) => void, context?: object): void;

      getAll(): object[];

      getById(id: string): object | null;

      getIterator(): IIterator;

      getLength(): number;

      getObjectManager(): ObjectManager;

      setClusterOptions(objectId: string, options: object): this;
    }

    class Hint implements Omit<IHintManager<map.Hint>, 'isOpen' | 'open'> {
      constructor(collection: object);

      events: IEventManager;

      close(force?: boolean): Promise<map.Hint>;

      destroy(): void;

      getData(): object | null;

      getOptions(): IOptionManager | null;

      getOverlay(): Promise<IOverlay | null>;

      getOverlaySync(): IOverlay | null;

      getPosition(): number[] | null;

      isOpen(id: any): boolean;

      open(objectId: any, position?: number[]): Promise<map.Hint>;

      setData(data: object | string | HTMLElement): Promise<map.Hint>;

      setOptions(options: object): Promise<map.Hint>;

      setPosition(position: number[]): Promise<map.Hint>;
    }

    class ObjectCollection implements ICollection, ICustomizable {
      balloon: objectManager.Balloon;

      events: IEventManager;

      hint: objectManager.Hint;

      options: option.Manager;

      overlays: objectManager.OverlayCollection;

      add(object: object): this;

      each(callback: (object: object) => void, context?: object): void;

      getAll(): object[];

      getById(id: number): object | null;

      getIterator(): IIterator;

      getLength(): number;

      getObjectManager(): ObjectManager;

      remove(data: object | object[] | string): this;

      removeAll(): objectManager.ObjectCollection;

      setObjectOptions(objectId: any, options: object): ObjectCollection;
    }

    class OverlayCollection implements ICustomizable, IEventEmitter {
      events: IEventManager;

      options: IOptionManager;

      each(callback: (overlay: IOverlay) => void, context?: object): void;

      getAll(): object[];

      getById(id: number): IOverlay | null;

      getId(overlay: IOverlay): number | null;

      getIterator(): IIterator;

      getLength(): number;
    }
  }

  namespace modules {
    function define(
      module: string,
      depends?: string[],
      resolveCallback?: ResolveCallbackFunction,
      context?: object,
    ): typeof modules;

    function define(
      module: string,
      resolveCallback?: ResolveCallbackFunction,
      context?: object,
    ): typeof modules;

    function isDefined(module: string): boolean;

    function require(
      modules: string | string[],
      successCallback?: (...args: any[]) => void,
      errorCallback?: (error: any) => void,
      context?: object,
    ): vow.Promise;
  }

  interface IHotspotObjectSource extends ICustomizable, IEventEmitter {
    cancelLastRequest(): void;

    requestObjects(
      layer: hotspot.Layer,
      tileNumber: number[],
      zoom: number,
      callback: () => void,
    ): void;
  }

  interface IHotspotLayerOptions
    extends IBalloonOptionsWithBalloonPrefix,
      IHintOptionsWithHintPrefix {
    cursor?: string;
    dontChangeCursor?: boolean;
    hasBalloon?: boolean;
    hasHint?: boolean;
    interactivityModel?: InteractivityModelKey;
    openBalloonOnClick?: boolean;
    openEmptyBalloon?: boolean;
    openEmptyHint?: boolean;
    openHintOnHover?: boolean;
    pane?: IEventPane;
    showEmptyBalloon?: boolean;
    zIndex?: number;
  }

  interface IHotspotLayerObject extends ICustomizable, IDomEventEmitter {
    getGeometry(): object;

    getHotspot(): IHotspot;

    getId(): number;

    getProperties(): object;

    setGeometry(geometry: object): void;

    setId(id: number): void;

    setProperties(properties: object): void;
  }

  namespace hotspot {
    namespace layer {
      namespace addon {
        const balloon: {
          get(layer: hotspot.Layer): IPopupManager<Balloon>;
        };

        const hint: {
          get(layer: hotspot.Layer): IPopupManager<Hint>;
        };
      }

      class Balloon implements IBalloonManager<Balloon> {
        constructor(hotspotLayer: object);

        events: IEventManager;

        autoPan(): Promise<Balloon>;

        close(force?: boolean): Promise<Balloon>;

        destroy(): void;

        getData(): object | null;

        getOptions(): IOptionManager | null;

        getOverlay(): Promise<IOverlay | null>;

        getOverlaySync(): IOverlay | null;

        getPosition(): number[] | null;

        isOpen(): boolean;

        open(position?: number[], data?: object, options?: object): Promise<Balloon>;

        setData(data: object | string | HTMLElement): Promise<Balloon>;

        setOptions(options: object): Promise<Balloon>;

        setPosition(position: number[]): Promise<Balloon>;
      }

      class Hint implements IHintManager<Hint> {
        constructor(hotspotLayer: object);

        events: IEventManager;

        close(force?: boolean): Promise<Hint>;

        destroy(): void;

        getData(): object | null;

        getOptions(): IOptionManager | null;

        getOverlay(): Promise<IOverlay | null>;

        getOverlaySync(): IOverlay | null;

        getPosition(): number[] | null;

        isOpen(): boolean;

        open(position?: number[], data?: object, options?: object): Promise<Hint>;

        setData(data: object | string | HTMLElement): Promise<Hint>;

        setOptions(options: object): Promise<Hint>;

        setPosition(position: number[]): Promise<Hint>;
      }

      class Object implements IHotspotLayerObject {
        constructor(shape: IShape, feature: object, options: object);

        events: IEventManager;

        options: IOptionManager;

        getGeometry(): object;

        getHotspot(): IHotspot;

        getId(): number;

        getProperties(): object;

        setGeometry(geometry: object): void;

        setId(id: number): void;

        setProperties(properties: object): void;
      }
    }

    class Layer implements IChildOnMap, ICustomizable {
      constructor(objectSource: IHotspotObjectSource, options: IHotspotLayerOptions);

      balloon: hotspot.layer.Balloon;

      events: IEventManager;

      hint: hotspot.layer.Balloon;

      options: IOptionManager;

      getMap(): Map;

      getObjectInPosition(coords: number[]): vow.Promise;

      getObjectsInPosition(coords: number[]): vow.Promise;

      getObjectSource(): ObjectSource;

      getParent(): IParentOnMap | null;

      setParent(parent: IParentOnMap | null): this;

      update(): void;
    }

    class ObjectSource implements IHotspotObjectSource {
      constructor(
        tileUrlTemplate: string | ((tileNumber: number[], tileZoom: number) => string),
        keyTemplate?: string | ((tileNumber: number[], tileZoom: number) => string),
        options?: {
          bounds?: number[][];
          maxZoom?: number;
          minZoom?: number;
          noCache?: boolean;
        },
      );

      events: IEventManager;

      options: IOptionManager;

      cancelLastRequest(): void;

      getKey(tileNumber: number[], zoom: number): string;

      getKeyTemplate(): string;

      getTileUrl(tileNumber: number[], zoom: number): string;

      getTileUrlTemplate(): string;

      parseResponse(
        layer: hotspot.Layer,
        res: object,
        callback: () => void,
        tileNumber: number[],
        zoom: number,
      ): void;

      requestObjects(
        layer: hotspot.Layer,
        tileNumber: number[],
        zoom: number,
        callback: () => void,
      ): void;

      restrict(layer: hotspot.Layer, tileNumber: number[], zoom: number): boolean;

      setKeyTemplate(template: string): void;

      setTileUrlTemplate(template: string): void;
    }
  }

  class Hotspot implements IHotspot {
    constructor(shape: IShape, zIndex?: number);

    events: IEventManager;
  }

  interface IHotspot extends IDomEventEmitter {
    events: IEventManager;
  }

  namespace geolocation {
    interface IGeolocationOptions {
      autoReverseGeocode?: boolean;
      mapStateAutoApply?: boolean;
      provider?: string;
      timeout?: number;
      useMapMargin?: boolean;
    }

    function get(options?: IGeolocationOptions): Promise<{ geoObjects: GeoObjectCollection }>;
  }

  interface ISuggestProvider {
    suggest(
      request: string,
      options?: {
        boundedBy?: number[][];
        results?: number;
      },
    ): Promise<object>;
  }

  interface ISuggestViewOptions {
    boundedBy?: number[][];
    container?: HTMLElement;
    layout?: string | any;
    offset?: number[];
    provider?: string | ISuggestProvider;
    results?: number;
    width?: number;
    zIndex?: number;
  }

  class SuggestView implements ICustomizable, IEventEmitter {
    constructor(element: HTMLElement | string, options?: ISuggestViewOptions);

    events: IEventManager;

    options: IOptionManager;

    state: data.Manager;

    destroy(): void;
  }

  interface ITile extends IEventEmitter {
    events: IEventManager;

    destroy(): void;

    isReady(): boolean;
  }

  interface ICanvasTile extends ITile {
    events: IEventManager;

    destroy(): void;

    isReady(): boolean;

    renderAt(context: any, canvasSize: number[], bounds: number[][], animate?: boolean): void;
  }

  interface IDomTile extends ITile {
    events: IEventManager;

    destroy(): void;

    isReady(): boolean;

    renderAt(context: HTMLElement, clientBounds: number[][], animate?: boolean): void;
  }

  namespace layer {
    const storage: util.Storage;

    namespace tile {
      interface ITileOptions {
        notFoundTile?: string | null;
        tileAnimationDuration?: number;
      }

      interface ITileRenderOptions {
        tileNumber?: number[];
        tileZoom?: number;
      }

      class CanvasTile implements ICanvasTile {
        constructor(url: string, options?: ITileOptions, renderOptions?: ITileRenderOptions);

        events: IEventManager;

        destroy(): void;

        isReady(): boolean;

        renderAt(context: any, canvasSize: number[], bounds: number[][], animate?: boolean): void;
      }

      class DomTile implements IDomTile {
        constructor(url: string, options?: ITileOptions, renderOptions?: ITileRenderOptions);

        events: IEventManager;

        destroy(): void;

        isReady(): boolean;

        renderAt(context: HTMLElement, clientBounds: number[][], animate?: boolean): void;
      }
    }

    namespace tileContainer {
      interface CanvasContainerOptions {
        notFoundTile?: string | null;
        tileClass?: ICanvasTile;
        tileTransparent?: boolean;
      }

      class CanvasContainer implements IChildOnMap {
        constructor(layer: ILayer, options?: CanvasContainerOptions);

        events: IEventManager;

        getMap(): Map;

        getParent(): object | null;

        getTile(tileNumber: number[], tileZoom: number, priority: number): ICanvasTile;

        setParent(parent: object | null): this;
      }

      interface DomContainerOptions {
        notFoundTile?: string | null;
        tileClass?: IDomTile;
        tileTransparent?: boolean;
      }

      class DomContainer implements IChildOnMap {
        constructor(layer: ILayer, options?: DomContainerOptions);

        events: IEventManager;

        getMap(): Map;

        getParent(): object | null;

        getTile(tileNumber: number[], tileZoom: number, priority: number): ICanvasTile;

        setParent(parent: object | null): this;
      }
    }
  }

  namespace mapType {
    const storage: util.Storage;
  }

  namespace projection {
    class Cartesian implements IProjection {
      constructor(bounds: number[][], cycled?: boolean[], scale?: number | number[]);

      fromGlobalPixels(globalPixelPoint: number[], zoom: number): number[];

      getCoordSystem(): ICoordSystem;

      isCycled(): boolean[];

      toGlobalPixels(coordPoint: number[], zoom: number): number[];
    }

    const sphericalMercator: IProjection;

    const wgs84Mercator: IProjection;
  }
}
