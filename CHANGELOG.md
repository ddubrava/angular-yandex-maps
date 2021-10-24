# Changelog

All notable changes to this project will be documented in this file.
See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [12.2.0](https://github.com/ddubrava/angular8-yandex-maps/compare/v12.1.7...v12.2.0) (2021-10-24)

### Features

- **typings:** add a lot of new typings and fix
  existing ([#130](https://github.com/ddubrava/angular8-yandex-maps/issues/130)) ([bd71c07](https://github.com/ddubrava/angular8-yandex-maps/commit/bd71c074533887263f69adfb2f6d1e75a12bb519))

## [12.1.7](https://github.com/ddubrava/angular8-yandex-maps/compare/v12.1.6...v12.1.7) (2021-07-29)

### Bug Fixes

- **docs:** Fix broken documentation
  examples ([#114](https://github.com/ddubrava/angular8-yandex-maps/issues/114)) ([032319e](https://github.com/ddubrava/angular8-yandex-maps/commit/032319e70f8237bb029d0839de0edfb90ea29b6d))
- Rename dbclick in dblclick since it's right event name in Yandex.Maps
  API ([#115](https://github.com/ddubrava/angular8-yandex-maps/issues/115)) ([426a330](https://github.com/ddubrava/angular8-yandex-maps/commit/426a3303a77fe8ede47d713005ac9672c6de1fe0))

## [12.1.6](https://github.com/ddubrava/angular8-yandex-maps/compare/v12.1.5...v12.1.6) (2021-07-25)

### Bug Fixes

- **typings:** Fix Event.get() return
  type ([#112](https://github.com/ddubrava/angular8-yandex-maps/issues/112)) ([193c945](https://github.com/ddubrava/angular8-yandex-maps/commit/193c94538ed4b67ed18d58dc70acbc15778ae89d))

## [12.1.5](https://github.com/ddubrava/angular8-yandex-maps/compare/v12.1.4...v12.1.5) (2021-06-18)

### Bug Fixes

- Emit ready event within
  NgZone ([#107](https://github.com/ddubrava/angular8-yandex-maps/issues/107)) ([054bb4b](https://github.com/ddubrava/angular8-yandex-maps/commit/054bb4bc735d3b7314a57f9ffd37e435bc8f157d))

## [12.1.4](https://github.com/ddubrava/angular8-yandex-maps/compare/v12.1.2...v12.1.4) (2021-05-21)

### Features

- **typings:** Add some missing
  fields ([c9cda93](https://github.com/ddubrava/angular8-yandex-maps/commit/c9cda935131a6e6a3d8b8faf426d12dbfbbd18c4))

## [12.1.2](https://github.com/ddubrava/angular8-yandex-maps/compare/v12.1.1...v12.1.2) (2021-05-21)

### Bug Fixes

- **YaMapComponent:** Emit ready event before map$.next to be sure that map ready is called before
  children's ([#96](https://github.com/ddubrava/angular8-yandex-maps/issues/96)) ([09262cb](https://github.com/ddubrava/angular8-yandex-maps/commit/09262cb0552d21cac6d18d7c2e013314949557ba))

### Features

- Improve
  typings ([834e0e0](https://github.com/ddubrava/angular8-yandex-maps/commit/834e0e095c2e91aecdcd82f9435debe3a9ac20fd))
- **typings:** Add geolocation namespace in
  ymaps ([1e516a6](https://github.com/ddubrava/angular8-yandex-maps/commit/1e516a6e742cc668305984964dba35c15fd1e9ce))

## [12.1.1](https://github.com/ddubrava/angular8-yandex-maps/compare/v12.1.0...v12.1.1) (2021-05-18)

### Bug Fixes

- Export YaReadyEvent and
  YaEvent ([#93](https://github.com/ddubrava/angular8-yandex-maps/issues/93)) ([7b9bd9d](https://github.com/ddubrava/angular8-yandex-maps/commit/7b9bd9d96d24dd5de82e077b1ece0ab9ce5c5192))

## [12.1.0](https://github.com/ddubrava/angular8-yandex-maps/compare/v12.0.0...v12.1.0) (2021-05-18)

### Features

- **YaApiLoader:** Make lang property optional, set ru_RU as
  default ([#91](https://github.com/ddubrava/angular8-yandex-maps/issues/91)) ([d84ce1d](https://github.com/ddubrava/angular8-yandex-maps/commit/d84ce1db7704c6cdbf0d084e12b90063d7646551))

## [12.0.0](https://github.com/ddubrava/angular8-yandex-maps/compare/v11.0.2...v12.0.0) (2021-05-17)

### Bug Fixes

- **script.service.spec:** Remove some
  specs ([398abaf](https://github.com/ddubrava/angular8-yandex-maps/commit/398abaf2f77cd91c2611bc586687cd3b3690ce83))

### Features

- Set ChangeDetectionStrategy to
  OnPush ([#80](https://github.com/ddubrava/angular8-yandex-maps/issues/80)) ([f37e3c4](https://github.com/ddubrava/angular8-yandex-maps/commit/f37e3c429e9cfce76002011da27eac174699b53b))

## 11.0.2 - 2021-03-12

### Added

- Add `geocode` function in typings
- Add missing properties in `Clusterer` class

### Changed

- Make `YaReadyEvent` emit after instance is added in a map/clusterer component

## 11.0.1 - 2021-01-25

### Changed

- Make `referencePoints` in `model` input in YaMultirouteDirective optional

## 11.0.0 - 2020-11-20

### Added

- Support Angular 11

### Breaking

- Remove deprecated `onlyInstance` input
- Rename `IConfig` event -> `YaConfig`
- Rename `YA_MAP_CONFIG` injection token -> `YA_CONFIG`
- Rename `Event` event -> `YaEvent`
- Rename `LoadEvent` event -> `YaLoadEvent`
- Split combined events into multiple events (#51)

## 10.4.1 - 2020-11-08

### Fixed

- UMD issue (#44)
- Remove `Event` from return type of initScript()

## 10.4.0 - 2020-10-26

### Added

- Typings, @types/yandex-maps, `npm install --save-dev @types/yandex-maps`
- 'error' event handling in ScriptService

### Changed

- Output 'baloon' was renamed in 'balloon' (breaking changes)
- Mouse, multitouch events are running outside angular now (#35)
- Make apikey optional in IConfig

### Fixed

- Omit wrong query params when loading API

## 10.3.1 - 2020-10-14

### Added

- Wrap the EventEmitters in the ngZone.run() method

## 10.2.0 - 2020-10-12

### Added

- Content children changes of Clusterer

## 10.1.1 - 2020-10-09

### Added

- Improve code documentation

## 10.1.0 - 2020-09-28

### Added

- Export ScriptService for appending script in document

### Changed

- OnlyInstance is deprecated now, use ScriptService instead

### Fixed

- Remove 'center input is required' error if onlyInstance is provided

## 10.0.0 - 2020-08-22

### Added

- Support Angular 10

## 9.0.0 - 2020-08-22

### Added

- Support Angular 9

## 8.0.0 - 2020-08-22

### Added

- Support Angular 8

## 7.0.0 - 2020-08-22

### Added

- Support Angular 7

## 6.0.0 - 2020-08-22

### Added

- Support Angular 6

## 2.1.1 - 2020-08-09

### Changed

- Links to new repo name in README, documentation, changelog

## 2.1.0 - 2020-08-02

### Added

- Clusterer component

### Changed

- Clusterer input from ya-map was removed

## 2.0.1 - 2020-07-30

### Fixed

- Wrong tag selector in README.md & QuickStart.md
- Wrong link to examples

## 2.0.0 - 2020-07-30

### Added

- Dynamic dynamic entity configuration. Now component handles input changes and provides it to API

### Changed

- Components' selectors. 'angular' was removed from selectors, 'yandex' became 'ya'. E.g. <angular-yandex-map> -> <ya-map>
- Documentation. Add docsify

## 1.15.0 - 2020-07-24

### Added

- Support version property in config

## 1.14.5 - 2020-06-30

### Added

- Support for enterprise API

## 1.14.4 - 2020-06-29

### Fixed

- Build erorr

## 1.14.3 - 2020-06-29

### Added

- Config injection token

## 1.14.2 - 2020-06-22

### Fixed

- Not applying width, height properties for Panorama container

## 1.14.1 - 2020-06-22

### Fixed

- Not working API key in config. Rename apiKey to apikey in IConfig interface
- Wrong return type of AngularYandexMapsModule.forRoot(...)

## 1.14.0 - 2020-06-05

### Changed

- IConfig interface, add new properties from API

## 1.13.1 - 2020-05-21

### Changed

- README, update usage section

## 1.13.0 - 2020-05-21

### Added

- Support map localization

### Changed

- Now forRoot() accepts IConfig instead of string

## 1.12.0 - 2020-04-24

### Added

- Support for changing ContentChild after map init (E.g. Issue#11)

## 1.11.4 - 2020-04-02

### Added

- Export types: ILoadEvent & IEvent

## 1.11.3 - 2020-03-31

### Fixed

- The conflict between Bootstrap's container and library

## 1.11.2 - 2020-03-25

### Changed

- README, replace examples list by link to docs

## 1.11.0 - 2020-01-22

### Added

- onlyInstance input. With that option, entities aren't creating. The map only returns ILoadEvent.

## 1.10.3 - 2020-01-10

### Changed

- README. Move documentation to [angular8-yandex-maps-docs](https://ddubrava.github.io/angular8-yandex-maps-docs/)

## 1.10.2 - 2020-01-02

### Changed

- forRoot() is optional for AngularYandexMapsModule

## 1.10.1 - 2019-11-27

### Fixed

- Lazy loading of YMaps script

## 1.10.0 - 2019-11-22

### Changed

- IEvent - ymaps: any is added

### Added

- ILoadEvent - { instance: any, ymaps: any }

## 1.9.0 - 2019-11-19

### Added

- Map outputs
- Panorama outputs
- Placemark outputs
- MultiRoute outputs
- GeoObject outputs

## 1.8.0 - 2019-11-19

### Changed

- Output 'onInit' renamed to 'load'

## 1.7.3 - 2019-11-17

### Added

- New examples in README

## 1.7.2 - 2019-11-17

### Changed

- Fix anchors in README

## 1.7.1 - 2019-11-17

### Changed

- Fix anchors in README

## 1.7.0 - 2019-11-17

### Added

- Control component, supports all Controls of Yandex.Map API

### Removed

- Search Control component

## 1.6.0 - 2019-11-16

### Added

- Panorama component

## 1.5.0 - 2019-11-15

### Added

- Clusterer for Placemark in Map inputs

### Changed

- Inputs of Map

## 1.4.0 - 2019-11-09

### Changed

- Inputs of Map
- Inputs of Placemark
- Inputs of MultiRoute

## 1.3.0 - 2019-10-30

### Added

- Angular 6+ support

## 1.2.1 - 2019-10-27

### Changed

- Update README

## 1.2.0 - 2019-10-27

### Added

- Search component

### Changed

- Error logging message and logic
- Cleanup app.html

## 1.1.0 - 2019-10-27

### Added

- GeoObject component
- Error logging for Map, Placemark, Multiroute components

### Removed

- YandexMapModule types

## 1.0.1 - 2019-10-26

### Changed

- Change README examples

## 1.0.0 - 2019-09-14

- Release without changes
