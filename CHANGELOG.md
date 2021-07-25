# Changelog

## [12.1.6] - 2021-07-25

### Changed

- Remove tslib dependency, update peerDependencies in project
- Event.get() return type

## [12.1.5] - 2021-06-08

### Added

- SuggestView, layer, projection, mapType in typings

### Changed

- Run all `ready` events within `NgZone`

## [12.1.4] - 2021-05-21

### Changed

- Improve typings: add IPlacemarkProperties, some missing fields, improve Control classes, IObjectManagerOptions,

## [12.1.2] - 2021-05-21

### Changed

- Improve typings: add geolocation, objectManager namespaces
- Emit ready event before children's initialization to be sure that map ready is called before children's

## [12.1.1] - 2021-05-18

### Added

- Export `YaEvent` and `YaReadyEvent`

## [12.1.0] - 2021-05-18

### Added

- Geocoder service

### Changed

- Make `lang` in `YaConfig` optional

## [12.0.0] - 2021-05-18

### Added

- Support Angular 12

### Breaking

- Rename `ScriptService` -> `YaApiLoaderService`
- Change `YaPanorama` API

## [11.0.2] - 2021-03-12

### Added

- Add `geocode` function in typings
- Add missing properties in `Clusterer` class

### Changed

- Make `YaReadyEvent` emit after instance is added in a map/clusterer component

## [11.0.1] - 2021-01-25

### Changed

- Make `referencePoints` in `model` input in YaMultirouteDirective optional

## [11.0.0] - 2020-11-20

### Added

- Support Angular 11

### Breaking

- Remove deprecated `onlyInstance` input
- Rename `IConfig` event -> `YaConfig`
- Rename `YA_MAP_CONFIG` injection token -> `YA_CONFIG`
- Rename `Event` event -> `YaEvent`
- Rename `LoadEvent` event -> `YaLoadEvent`
- Split combined events into multiple events (#51)

## [10.4.1] - 2020-11-08

### Fixed

- UMD issue (#44)
- Remove `Event` from return type of initScript()

## [10.4.0] - 2020-10-26

### Added

- Typings, @types/yandex-maps, `npm install --save-dev @types/yandex-maps`
- 'error' event handling in ScriptService

### Changed

- Output 'baloon' was renamed in 'balloon' (breaking changes)
- Mouse, multitouch events are running outside angular now (#35)
- Make apikey optional in IConfig

### Fixed

- Omit wrong query params when loading API

## [10.3.1] - 2020-10-14

### Added

- Wrap the EventEmitters in the ngZone.run() method

## [10.2.0] - 2020-10-12

### Added

- Content children changes of Clusterer

## [10.1.1] - 2020-10-09

### Added

- Improve code documentation

## [10.1.0] - 2020-09-28

### Added

- Export ScriptService for appending script in document

### Changed

- OnlyInstance is deprecated now, use ScriptService instead

### Fixed

- Remove 'center input is required' error if onlyInstance is provided

## [10.0.0] - 2020-08-22

### Added

- Support Angular 10

## [9.0.0] - 2020-08-22

### Added

- Support Angular 9

## [8.0.0] - 2020-08-22

### Added

- Support Angular 8

## [7.0.0] - 2020-08-22

### Added

- Support Angular 7

## [6.0.0] - 2020-08-22

### Added

- Support Angular 6

## [2.1.1] - 2020-08-09

### Changed

- Links to new repo name in README, documentation, changelog

## [2.1.0] - 2020-08-02

### Added

- Clusterer component

### Changed

- Clusterer input from ya-map was removed

## [2.0.1] - 2020-07-30

### Fixed

- Wrong tag selector in README.md & QuickStart.md
- Wrong link to examples

## [2.0.0] - 2020-07-30

### Added

- Dynamic dynamic entity configuration. Now component handles input changes and provides it to API

### Changed

- Components' selectors. 'angular' was removed from selectors, 'yandex' became 'ya'. E.g. <angular-yandex-map> -> <ya-map>
- Documentation. Add docsify

## [1.15.0] - 2020-07-24

### Added

- Support version property in config

## [1.14.5] - 2020-06-30

### Added

- Support for enterprise API

## [1.14.4] - 2020-06-29

### Fixed

- Build erorr

## [1.14.3] - 2020-06-29

### Added

- Config injection token

## [1.14.2] - 2020-06-22

### Fixed

- Not applying width, height properties for Panorama container

## [1.14.1] - 2020-06-22

### Fixed

- Not working API key in config. Rename apiKey to apikey in IConfig interface
- Wrong return type of AngularYandexMapsModule.forRoot(...)

## [1.14.0] - 2020-06-05

### Changed

- IConfig interface, add new properties from API

## [1.13.1] - 2020-05-21

### Changed

- README, update usage section

## [1.13.0] - 2020-05-21

### Added

- Support map localization

### Changed

- Now forRoot() accepts IConfig instead of string

## [1.12.0] - 2020-04-24

### Added

- Support for changing ContentChild after map init (E.g. Issue#11)

## [1.11.4] - 2020-04-02

### Added

- Export types: ILoadEvent & IEvent

## [1.11.3] - 2020-03-31

### Fixed

- The conflict between Bootstrap's container and library

## [1.11.2] - 2020-03-25

### Changed

- README, replace examples list by link to docs

## [1.11.0] - 2020-01-22

### Added

- onlyInstance input. With that option, entities aren't creating. The map only returns ILoadEvent.

## [1.10.3] - 2020-01-10

### Changed

- README. Move documentation to [angular8-yandex-maps-Docs](https://ddubrava.github.io/angular8-yandex-maps-docs/)

## [1.10.2] - 2020-01-02

### Changed

- forRoot() is optional for AngularYandexMapsModule

## [1.10.1] - 2019-11-27

### Fixed

- Lazy loading of YMaps script

## [1.10.0] - 2019-11-22

### Changed

- IEvent - ymaps: any is added

### Added

- ILoadEvent - { instance: any, ymaps: any }

## [1.9.0] - 2019-11-19

### Added

- Map outputs
- Panorama outputs
- Placemark outputs
- MultiRoute outputs
- GeoObject outputs

## [1.8.0] - 2019-11-19

### Changed

- Output 'onInit' renamed to 'load'

## [1.7.3] - 2019-11-17

### Added

- New examples in README

## [1.7.2] - 2019-11-17

### Changed

- Fix anchors in README

## [1.7.1] - 2019-11-17

### Changed

- Fix anchors in README

## [1.7.0] - 2019-11-17

### Added

- Control component, supports all Controls of Yandex.Map API

### Removed

- Search Control component

## [1.6.0] - 2019-11-16

### Added

- Panorama component

## [1.5.0] - 2019-11-15

### Added

- Clusterer for Placemark in Map inputs

### Changed

- Inputs of Map

## [1.4.0] - 2019-11-09

### Changed

- Inputs of Map
- Inputs of Placemark
- Inputs of MultiRoute

## [1.3.0] - 2019-10-30

### Added

- Angular 6+ support

## [1.2.1] - 2019-10-27

### Changed

- Update README

## [1.2.0] - 2019-10-27

### Added

- Search component

### Changed

- Error logging message and logic
- Cleanup app.html

## [1.1.0] - 2019-10-27

### Added

- GeoObject component
- Error logging for Map, Placemark, Multiroute components

### Removed

- YandexMapModule types

## [1.0.1] - 2019-10-26

### Changed

- Change README examples

## [1.0.0] - 2019-09-14

- Release without changes

[12.1.6]: https://github.com/ddubrava/angular8-yandex-maps/compare/v12.1.5...v12.1.6
[12.1.5]: https://github.com/ddubrava/angular8-yandex-maps/compare/v12.1.4...v12.1.5
[12.1.4]: https://github.com/ddubrava/angular8-yandex-maps/compare/v12.1.2...v12.1.4
[12.1.2]: https://github.com/ddubrava/angular8-yandex-maps/compare/v12.1.1...v12.1.2
[12.1.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v12.1.0...v12.1.1
[12.1.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v12.0.0...v12.1.0
[12.0.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v11.0.2...v12.0.0
[11.0.2]: https://github.com/ddubrava/angular8-yandex-maps/compare/v11.0.1...v11.0.2
[11.0.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v11.0.0...v11.0.1
[11.0.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v10.4.1...v11.0.0
[10.4.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v10.4.0...v10.4.1
[10.4.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v10.3.1...v10.4.0
[10.3.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v10.2.0...v10.3.1
[10.2.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v10.1.1...v10.2.0
[10.1.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v10.1.0...v10.1.1
[10.1.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v10.0.0...v10.1.0
[10.0.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v9.0.0...v10.0.0
[9.0.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v8.0.0...v9.0.0
[8.0.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v7.0.0...v8.0.0
[7.0.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v6.0.0...v7.0.0
[6.0.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v2.1.1...v6.0.0
[2.1.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.15.0...v2.0.0
[1.15.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.14.5....v1.15.0
[1.14.5]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.14.4....v1.14.5
[1.14.4]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.14.3...v1.14.4
[1.14.3]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.14.2...v1.14.3
[1.14.2]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.14.1...v1.14.2
[1.14.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.14.0...v1.14.1
[1.14.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.13.1...v1.14.0
[1.13.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.13.0...v1.13.1
[1.13.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.12.0...v1.13.0
[1.12.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.11.4...v1.12.0
[1.11.4]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.11.3...v1.11.4
[1.11.3]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.11.2...v1.11.3
[1.11.2]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.11.0...v1.11.2
[1.11.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.10.3...v1.11.0
[1.10.3]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.10.2...v1.10.3
[1.10.2]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.10.1...v1.10.2
[1.10.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.10.0...v1.10.1
[1.10.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.7.3...v1.8.0
[1.7.3]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.7.2...v1.7.3
[1.7.2]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.7.1...v1.7.2
[1.7.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/ddubrava/angular8-yandex-maps/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/ddubrava/angular8-yandex-maps/compare/v0.1.1...v1.0.0
