# Changelog

All notable changes to this project will be documented in this file.
See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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

# [12.1.0](https://github.com/ddubrava/angular8-yandex-maps/compare/v12.0.0...v12.1.0) (2021-05-18)

### Features

- **YaApiLoader:** Make lang property optional, set ru_RU as
  default ([#91](https://github.com/ddubrava/angular8-yandex-maps/issues/91)) ([d84ce1d](https://github.com/ddubrava/angular8-yandex-maps/commit/d84ce1db7704c6cdbf0d084e12b90063d7646551))

# [12.0.0](https://github.com/ddubrava/angular8-yandex-maps/compare/v11.0.2...v12.0.0) (2021-05-17)

### Bug Fixes

- **script.service.spec:** Remove some
  specs ([398abaf](https://github.com/ddubrava/angular8-yandex-maps/commit/398abaf2f77cd91c2611bc586687cd3b3690ce83))

### Features

- Set ChangeDetectionStrategy to
  OnPush ([#80](https://github.com/ddubrava/angular8-yandex-maps/issues/80)) ([f37e3c4](https://github.com/ddubrava/angular8-yandex-maps/commit/f37e3c429e9cfce76002011da27eac174699b53b))

## [11.0.2](https://github.com/ddubrava/angular8-yandex-maps/compare/v11.0.1...v11.0.2) (2021-03-12)

### Features

- make emit YaReadyEvent after instance is added in map/clusterer
  component ([#73](https://github.com/ddubrava/angular8-yandex-maps/issues/73)) ([fc85fa2](https://github.com/ddubrava/angular8-yandex-maps/commit/fc85fa24df867f0779d4eeb9fa2121e7e64d160a))

## [11.0.1](https://github.com/ddubrava/angular8-yandex-maps/compare/v11.0.0...v11.0.1) (2021-01-25)

### Bug Fixes

- add optional chaining operator in
  ngOnDestroy ([#43](https://github.com/ddubrava/angular8-yandex-maps/issues/43)) ([f0207b3](https://github.com/ddubrava/angular8-yandex-maps/commit/f0207b319440fdc192eb4953274f727b7b32dd60))
- **app.module:** remove apikey value from
  config ([cbf776e](https://github.com/ddubrava/angular8-yandex-maps/commit/cbf776eecd370dfcc9c112a2b20a433142079719))
- **environment:** change apikey value to
  undefined ([c511fb2](https://github.com/ddubrava/angular8-yandex-maps/commit/c511fb201e471f4c21d2cdc0b25b3f3f6722b36d))
- fix 'ymaps' referes to UMD
  global ([#44](https://github.com/ddubrava/angular8-yandex-maps/issues/44)) ([6d58c8e](https://github.com/ddubrava/angular8-yandex-maps/commit/6d58c8ee4daf57cb535f9f43f62fa14b9cdc821e))
- fix not copying .d.ts in dist
  folder ([1aa322d](https://github.com/ddubrava/angular8-yandex-maps/commit/1aa322d06ca3dc491561e3d676f126eb584329fd))
- **script.service:** fix linting
  errors ([498a803](https://github.com/ddubrava/angular8-yandex-maps/commit/498a8031beeec375984a44b1f189a27314faf2ab))
- **script.service:** remove Event return
  type ([639db3c](https://github.com/ddubrava/angular8-yandex-maps/commit/639db3c1df6b2742c7921afa2db82568d6c34f40))
- **script:** omit extra params from query
  params ([943b9fd](https://github.com/ddubrava/angular8-yandex-maps/commit/943b9fda8af4fcedc9c5b4522060cd3ab26939dd))
- **tsconfig.spec:** include index.ts with
  typings ([5ff3b19](https://github.com/ddubrava/angular8-yandex-maps/commit/5ff3b19ebedfd5e16439e71fb84a767827ab220f))
- **workflow:** fix test
  action ([c556e12](https://github.com/ddubrava/angular8-yandex-maps/commit/c556e121b9363400e9cda4016b783745a6de6446))

### Features

- add optional utility
  type ([6844404](https://github.com/ddubrava/angular8-yandex-maps/commit/6844404cfd1d6c1c1bfce92851107eb70cd6983a))
- **app:** add code examples of library
  usage ([039df5a](https://github.com/ddubrava/angular8-yandex-maps/commit/039df5a34b3a71407bee9fb9eff9d0531e8b16ee))
- change YaEvent/YaLoadEvent
  interfaces ([e9cb377](https://github.com/ddubrava/angular8-yandex-maps/commit/e9cb3776f3c41f23ec888218be6d4bfea1da02c7))
- **clusterer:** handle content children
  changes ([2cdf126](https://github.com/ddubrava/angular8-yandex-maps/commit/2cdf126cfcfcb0dc9c1e866ec8cef0dd84154741)),
  closes [#32](https://github.com/ddubrava/angular8-yandex-maps/issues/32)
- **components:** improve docs, add block tags, links to external
  docs ([e7a86a8](https://github.com/ddubrava/angular8-yandex-maps/commit/e7a86a8f9dd01b081413606493ef609d794206d0))
- config tsconfigs + declare
  ymaps ([679230b](https://github.com/ddubrava/angular8-yandex-maps/commit/679230b157ce4a5f21fa33d28df33840fbbd3303))
- create apikey
  optional ([19f9f84](https://github.com/ddubrava/angular8-yandex-maps/commit/19f9f84fefcea4f2838738434bf3a5d32841f877))
- **docs:** update docs for components,
  service ([6902f9f](https://github.com/ddubrava/angular8-yandex-maps/commit/6902f9fb0ca64c4d28fe0ad19236268b31268760))
- **globals.d.ts:** add ymaps in window
  interface ([09f0a4e](https://github.com/ddubrava/angular8-yandex-maps/commit/09f0a4ee6775ce46d655c5309d83d719b1f6ec04))
- improve panorama
  namespace ([427705d](https://github.com/ddubrava/angular8-yandex-maps/commit/427705ddc864de242afd74733ca41635bb33e185))
- install
  @types/yandex-maps ([cb188f1](https://github.com/ddubrava/angular8-yandex-maps/commit/cb188f1dc54d306f4aac6b32d1ae6fd065a78db6))
- **lint:** rm explicit-function-return-type
  rule ([5cbbe8e](https://github.com/ddubrava/angular8-yandex-maps/commit/5cbbe8eb1af20b3d1d985a3ea0ad4346b3e000f4))
- **map:** run mouse, multitouch outside
  angular ([724834c](https://github.com/ddubrava/angular8-yandex-maps/commit/724834ca0ea8f0a78e7f92fc414e4cdc28e49997)),
  closes [#35](https://github.com/ddubrava/angular8-yandex-maps/issues/35)
- **models:** add typings for Event
  interfaces ([9d2c97d](https://github.com/ddubrava/angular8-yandex-maps/commit/9d2c97d4555960690e60b74157b4606b7f8d93ef))
- **models:** improve docs for interfaces, add block
  tags ([eabc459](https://github.com/ddubrava/angular8-yandex-maps/commit/eabc459e2345307bad2393a2f14349ec87d0d8ed))
- **project/package.json:** add
  @types/yandex-maps ([fb21c84](https://github.com/ddubrava/angular8-yandex-maps/commit/fb21c84ed4253d0fc3ce42a9833fb00106980ac6))
- refactor components, add
  typings ([4e93b8f](https://github.com/ddubrava/angular8-yandex-maps/commit/4e93b8f6a262db6a77e4bdfff4abd8c822b5dd88))
- replace @types/yandex-maps by custom ymaps
  namespace ([b2c91c9](https://github.com/ddubrava/angular8-yandex-maps/commit/b2c91c903529b3cd2db3355246181789b76e49f5))
- replace tslint by eslint +
  prettier ([11152b7](https://github.com/ddubrava/angular8-yandex-maps/commit/11152b768df7f54a09fa9c76fb79d89f67c586f9))
- **script.service.spec:** add one more
  spec ([35f4b5a](https://github.com/ddubrava/angular8-yandex-maps/commit/35f4b5a8cd2392296bb9dd5ce3406e1513af7f7d))
- **script.service:** add take(1) in
  merge() ([069fca1](https://github.com/ddubrava/angular8-yandex-maps/commit/069fca1cd8b95190080469bb8274f1ac1b48a070))
- **script.service:** add ymaps
  typing ([5b2c83a](https://github.com/ddubrava/angular8-yandex-maps/commit/5b2c83a00ddbf20e763ec388c3168e7c4e36dccc))
- **script.service:** create some
  specs ([8f63465](https://github.com/ddubrava/angular8-yandex-maps/commit/8f6346599f242731c7f4abbc54c1d4d610869633))
- **script.service:** refactor some code + add some block
  tags ([1f7fa5d](https://github.com/ddubrava/angular8-yandex-maps/commit/1f7fa5d50dd8a62f666171a84f4fb0dc24492292))
- **script:** handle error
  event ([5c1f664](https://github.com/ddubrava/angular8-yandex-maps/commit/5c1f6648d9d2138c621ee1a47ac910c9b15d25b3))
- **travis.yml:** update build
  config ([a582caf](https://github.com/ddubrava/angular8-yandex-maps/commit/a582caf6210e9ce6c046c37f3a0f0c333e612b1e))
- update to Angular 11 & enable strict
  mode ([d0cc7db](https://github.com/ddubrava/angular8-yandex-maps/commit/d0cc7db174cda6f6788c6375211c9a295411828a))
- **utils:** improve docs for
  utilities ([377eaf2](https://github.com/ddubrava/angular8-yandex-maps/commit/377eaf299aa0caaa908cbf0af7870014281b9a70))
- **utils/rand:** replace Math.random by Date
  ms ([a403a14](https://github.com/ddubrava/angular8-yandex-maps/commit/a403a14a23385929d1ebe78db96b3e4b5e81ac9f))
- wrap the EventEmitters in the
  ngZone.run() ([6f88c4e](https://github.com/ddubrava/angular8-yandex-maps/commit/6f88c4e88cb3da5195f157d41e2caba3f859ed8a))

# [10.1.0](https://github.com/ddubrava/angular8-yandex-maps/compare/v10.0.0...v10.1.0) (2020-09-28)

### Bug Fixes

- **map:** remove 'center input is required' error if onlyInstance is
  provided ([20be4c6](https://github.com/ddubrava/angular8-yandex-maps/commit/20be4c66fcdbe810366b0504057f5a2eb5e88104))

### Features

- **public_api:** add script.service
  export ([ecdd16a](https://github.com/ddubrava/angular8-yandex-maps/commit/ecdd16a8c09717a260bb16d19be843ae163b7955))
- update to angular
  6 ([4a15b48](https://github.com/ddubrava/angular8-yandex-maps/commit/4a15b48e4d27c0a2290e1fabdb18e3bc73e125fa))
- update to angular
  7 ([febdc21](https://github.com/ddubrava/angular8-yandex-maps/commit/febdc21754dedb9139b516555f0c471b4eb77d11))
- update to angular
  8 ([3bc9b1f](https://github.com/ddubrava/angular8-yandex-maps/commit/3bc9b1f59ce812491acd02d3c1056c0a957da0a9))
- update to
  angular-10 ([833ac66](https://github.com/ddubrava/angular8-yandex-maps/commit/833ac66ce93229f53aaa5adb74339ac7fb40d176))
- update to
  angular-9 ([e5d90eb](https://github.com/ddubrava/angular8-yandex-maps/commit/e5d90ebadda03e63fc81fe475f15e84ddeeaee9b))

# [2.1.0](https://github.com/ddubrava/angular8-yandex-maps/compare/v2.0.1...v2.1.0) (2020-08-02)

### Bug Fixes

- add missing map, panorama
  containers ([0f9810c](https://github.com/ddubrava/angular8-yandex-maps/commit/0f9810c511d53780accba6aa6612576a2031819f))
- **app.module:** fix build, remove extra
  imports ([fcf88d3](https://github.com/ddubrava/angular8-yandex-maps/commit/fcf88d33fadb2b98b0d9763b23dcec8823cbb85f))
- **control:** add skip for firstChange
  changes ([b15c546](https://github.com/ddubrava/angular8-yandex-maps/commit/b15c54698cbda428b5c9eb3812a0b3676bb685e9))
- **docs:** fix wrong tag selector in README &
  quickstart.md ([b000e9b](https://github.com/ddubrava/angular8-yandex-maps/commit/b000e9b970b42f889f0d7f9daba6eb8307af8409))
- fix travis
  config ([a8c3c8f](https://github.com/ddubrava/angular8-yandex-maps/commit/a8c3c8ff58372314f1149dbc9d22f4a48a239928))
- fix wrong API param, rename apiKey ->
  apikey ([c865144](https://github.com/ddubrava/angular8-yandex-maps/commit/c86514458c20f9b99090c0c9816d89644a86cf74))
- fix wrong tag selector in README & quickstart.md. Fix wrong link to
  examples ([ec65eae](https://github.com/ddubrava/angular8-yandex-maps/commit/ec65eaefa3e2174138d655619cb270b3c97ec002))
- **map:** add missing properties from
  Map.state ([0a4cf98](https://github.com/ddubrava/angular8-yandex-maps/commit/0a4cf98b81e1b0ad22f07ffcb376a1ed5efb495a))
- **mapContainer:** replace .container class by inline styles
  #ISSUE-8 ([d2b46df](https://github.com/ddubrava/angular8-yandex-maps/commit/d2b46df4edbc9c15a4d9ff68418cc318136eb7a1))
  , closes [#ISSUE-8](https://github.com/ddubrava/angular8-yandex-maps/issues/ISSUE-8)
- **map:** fix map
  clusterer ([4f89e62](https://github.com/ddubrava/angular8-yandex-maps/commit/4f89e6241def5212f485099e7aade7a9ee661be4))
- **models:** fix linting
  errors ([f5edf9e](https://github.com/ddubrava/angular8-yandex-maps/commit/f5edf9e9bba09c1758aff0f81f0c185c0f32582f))
- **panorama:** fix not woriking styles, replace class by inline
  styles ([549f46f](https://github.com/ddubrava/angular8-yandex-maps/commit/549f46fabd3da395fcf20fa0c895e9b1383b1033))

### Features

- add
  docsify ([b08a2c7](https://github.com/ddubrava/angular8-yandex-maps/commit/b08a2c76a534bdeff28b64cde84cd3552347e277))
- add version property in config
  #ISSUE-26 ([645611d](https://github.com/ddubrava/angular8-yandex-maps/commit/645611d3eda3119a21a381a5bd58c628d66a5965))
  , closes [#ISSUE-26](https://github.com/ddubrava/angular8-yandex-maps/issues/ISSUE-26)
- add ya-clusterer
  component ([d3ffed7](https://github.com/ddubrava/angular8-yandex-maps/commit/d3ffed718e58cda8e8f85170a3d93dc851bc49fd))
- **control:** add error message for dynamic input
  changes ([98742eb](https://github.com/ddubrava/angular8-yandex-maps/commit/98742eb41e053e5431cbebfd57e2046f35c0677b))
- **docs:** add clusterer in docs & improve some
  sections ([657deb9](https://github.com/ddubrava/angular8-yandex-maps/commit/657deb9b77c81f7544e100d6de7f98a9798ee5d2))
- **geoObject:** add remove geoObject on destroy & add entity
  id ([00257c7](https://github.com/ddubrava/angular8-yandex-maps/commit/00257c7e234757f57c1e045fc592fc8ce399c7e8))
- **GeoObject:** implement ngOnChanges for dynamic GeoObject
  configuration ([6fc8759](https://github.com/ddubrava/angular8-yandex-maps/commit/6fc87591d2bc3aaf7c4bc9050fdf51ae38bbc277))
- **map:** implement ngOnChanges for dynamic map
  configuration ([0a3351b](https://github.com/ddubrava/angular8-yandex-maps/commit/0a3351b8d517915bf698a1e50167cf251ba85b34))
- **map:** implement subscribe on each ContentChild for dynamic API
  update ([d45cbeb](https://github.com/ddubrava/angular8-yandex-maps/commit/d45cbeb0c801023ba5335c1687fe9f63a80fdf63))
- **models.ts:** update IConfig interface & change logic of creating script
  src ([6ae9d22](https://github.com/ddubrava/angular8-yandex-maps/commit/6ae9d2209c9149a031fd6b3daab638920752f355))
- **multiroute:** add remove multiroute on destroy & add entity
  id ([925deea](https://github.com/ddubrava/angular8-yandex-maps/commit/925deea9da8f102e7cf77600bbcfe3de108bae33))
- **multiroute:** implement ngOnChanges for dynamic multiroute
  configuration ([ef3d6bb](https://github.com/ddubrava/angular8-yandex-maps/commit/ef3d6bbe5815858741411d44d3f7b42ad5b58a0a))
- **panorama:** implement ngOnChanges for dynamic panorama
  configuration ([8a71420](https://github.com/ddubrava/angular8-yandex-maps/commit/8a714208acb2b0c36b0d6954370db21b32b12253))
- **placemark:** add remove placemark on destroy & add entity
  id ([23fcfd1](https://github.com/ddubrava/angular8-yandex-maps/commit/23fcfd10bf905dea9457cc89fae18e937345eeba))
- **placemark:** implement ngOnChanges for dynamic placemark
  configuration ([dc390dd](https://github.com/ddubrava/angular8-yandex-maps/commit/dc390dd34a3c2813c521fc729fda0e5f4a49678b))
- **public_api:** export all
  types ([2684da9](https://github.com/ddubrava/angular8-yandex-maps/commit/2684da902f7761a76def35097ce5a43a168d5470))
- support enterprise API url
  #ISSUE-24 ([d7c36dc](https://github.com/ddubrava/angular8-yandex-maps/commit/d7c36dce28938cb6000ffad14dbf9331232c8846))
  , closes [#ISSUE-24](https://github.com/ddubrava/angular8-yandex-maps/issues/ISSUE-24)
- support map lang & create IConfig for
  module.forRoot() ([24aff6e](https://github.com/ddubrava/angular8-yandex-maps/commit/24aff6eafd8db915a5379546ba7bb5ef01e92f4c))
- **utils:** add removeLeadingSpaces
  utility ([7159a66](https://github.com/ddubrava/angular8-yandex-maps/commit/7159a6638226ad3e0c961d2cd94ef9cc85a70ff7))

# [1.11.0](https://github.com/ddubrava/angular8-yandex-maps/compare/v1.10.3...v1.11.0) (2020-01-22)

### Bug Fixes

- fix lint
  errors ([25cf45a](https://github.com/ddubrava/angular8-yandex-maps/commit/25cf45a76fdd38a8dd8b6075d3bdffefaee488b3))
- **map.service:** fix strictMetadataEmit error in
  AOT ([76ea70c](https://github.com/ddubrava/angular8-yandex-maps/commit/76ea70cb1c9b1c0c7112382f77850c3d5f6ea1a9))

### Features

- add onlyInstance input for
  map ([f5d3f3c](https://github.com/ddubrava/angular8-yandex-maps/commit/f5d3f3c357a15ecd5846778b449d5e7be93d8d4c))
- add
  travis.yml ([1b64731](https://github.com/ddubrava/angular8-yandex-maps/commit/1b64731fa88f1ab47b44578b91777b801d5a312f))
- add ymaps in IEvent & add ILoadEvent for load
  output ([14d3253](https://github.com/ddubrava/angular8-yandex-maps/commit/14d32537b1e1811b25f3d56e1225a2abd28dfbc1))
- **geoobject:** add geoobject
  events ([25b2feb](https://github.com/ddubrava/angular8-yandex-maps/commit/25b2feb9d1120464c2d2799e8c1b9bbb6a7f430c))
- **map:** add map events in
  output ([439dd71](https://github.com/ddubrava/angular8-yandex-maps/commit/439dd713a08cb3262be09374aabaa6bd15f8367d))
- **multiroute:** add
  events ([adf77af](https://github.com/ddubrava/angular8-yandex-maps/commit/adf77af697cce61a29ad7d188df05d7c35aa6a15))
- **panorama:** add
  events ([6ed08aa](https://github.com/ddubrava/angular8-yandex-maps/commit/6ed08aa6774a91870a2e125a51ef03a84482a18f))
- **placemark:** add
  events ([976fa4c](https://github.com/ddubrava/angular8-yandex-maps/commit/976fa4c7d2b369b5d6257b75895b97753b1e7396))

## [1.7.3](https://github.com/ddubrava/angular8-yandex-maps/compare/v1.7.2...v1.7.3) (2019-11-18)

### Bug Fixes

- **map.component:** fix wrong map
  ids ([4d49057](https://github.com/ddubrava/angular8-yandex-maps/commit/4d49057c028d651982555bfa28870b272fc0f435))

### Features

- add onInit output for all
  entities ([7332a6c](https://github.com/ddubrava/angular8-yandex-maps/commit/7332a6c07c8080b1042e33ecae0e8da657fbc686))
- create
  control.component ([9326245](https://github.com/ddubrava/angular8-yandex-maps/commit/93262459b86f72fc34749def5fd66aa698867a68))
- create panorama
  component ([7b197f8](https://github.com/ddubrava/angular8-yandex-maps/commit/7b197f84e0fef22a74ea56f46aa1b788d074de1b))

## [1.5.1](https://github.com/ddubrava/angular8-yandex-maps/compare/v1.5.0...v1.5.1) (2019-11-14)

### Bug Fixes

- fix build error, add export
  IPlacemark ([5f1668b](https://github.com/ddubrava/angular8-yandex-maps/commit/5f1668beae1976b2f7d05ffaa2c9a786207c03b2))

# [1.5.0](https://github.com/ddubrava/angular8-yandex-maps/compare/v1.4.0...v1.5.0) (2019-11-14)

### Features

- add
  clusterer ([5899961](https://github.com/ddubrava/angular8-yandex-maps/commit/5899961b7bbf83bf64724d11e211e4f7afd9ee73))

# [1.4.0](https://github.com/ddubrava/angular8-yandex-maps/compare/v1.3.0...v1.4.0) (2019-11-09)

### Features

- add multiroute component &
  logic ([8d7387e](https://github.com/ddubrava/angular8-yandex-maps/commit/8d7387ecd6f1d9982fd959fde97fe0a3dadab8dc))
- add new placemark
  properties ([9fd2409](https://github.com/ddubrava/angular8-yandex-maps/commit/9fd2409d4906f529cda7ea7cfded6d8bd44d752c))
- add support for Angular
  6+ ([1a27b7c](https://github.com/ddubrava/angular8-yandex-maps/commit/1a27b7cbbf32b6edbc99f1a260ee0b8bfde94880))
- add
  YandexSearchControl ([29a1dd2](https://github.com/ddubrava/angular8-yandex-maps/commit/29a1dd22c5f8f1336e113082fc4dd6ec2d6c7e70))
- implement GeoObject
  api ([078465f](https://github.com/ddubrava/angular8-yandex-maps/commit/078465fb1ae3d335c93feb287e08f877066db8d4))

## [0.2.3](https://github.com/ddubrava/angular8-yandex-maps/compare/v0.2.2...v0.2.3) (2019-09-01)

### Features

- add logic for using
  API_KEY ([c72339b](https://github.com/ddubrava/angular8-yandex-maps/commit/c72339b86a020df5a99fd24329493c36f7fab846))
- add multiple maps
  support ([4d91acd](https://github.com/ddubrava/angular8-yandex-maps/commit/4d91acdc09dd542d04a45282305b99e33a440041))
- add new input -
  MapOptions ([daeec91](https://github.com/ddubrava/angular8-yandex-maps/commit/daeec91c8fa69c04422342fdc4ce980d135aa05f))
- add new
  YandexMapInterfaces ([273c8af](https://github.com/ddubrava/angular8-yandex-maps/commit/273c8af4212ba79a7483ff7564081772df341097))
- add placemark & update service
  logic ([bb7fe50](https://github.com/ddubrava/angular8-yandex-maps/commit/bb7fe50023ac371e94d09296af497ec1f817f951))
- generate & config
  library ([b7d755c](https://github.com/ddubrava/angular8-yandex-maps/commit/b7d755cacba2014abc6d9411a305dfc55cf9be39))
- implement
  yandexMapService ([2a3b60c](https://github.com/ddubrava/angular8-yandex-maps/commit/2a3b60c8f4e9b554f4d192abef6ea8dd721256f2))
- inject yandexMapService in map
  component ([bd1104e](https://github.com/ddubrava/angular8-yandex-maps/commit/bd1104ef98e938263b63dc07eec5e672e2f2a0dd))
