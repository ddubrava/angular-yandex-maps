<h1 align="center">Angular8-yandex-maps</h1>
<p align="center">Yandex.Maps Angular components that implements the Yandex.Maps JavaScript API</p>

<p align="center">
  <a href="https://www.npmjs.com/package/angular8-yandex-maps">
    <img src="https://img.shields.io/npm/v/angular8-yandex-maps" alt="NPM version">
  </a>

  <a href="https://www.npmjs.com/package/angular8-yandex-maps">
    <img src="https://img.shields.io/npm/dm/angular8-yandex-maps?color=blue" alt="NPM downloads">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/ddubrava/angular8-yandex-maps">

  <img src="https://img.shields.io/github/workflow/status/ddubrava/angular8-yandex-maps/CI/master" alt="CI">

  <a href="https://codecov.io/gh/ddubrava/angular8-yandex-maps">
    <img src="https://codecov.io/gh/ddubrava/angular8-yandex-maps/branch/master/graph/badge.svg?token=ZU50NBBBH6" alt="Codecov">
  </a>
</p>

<h4 align="center">
  <a href="https://ddubrava.github.io/angular8-yandex-maps/modules/AngularYandexMapsModule.html">📄 Documentation</a> |
  <a href="https://ddubrava.github.io/angular8-yandex-maps/additional-documentation/examples.html">🗺️ Examples</a> |
  <a href="https://ddubrava.github.io/angular8-yandex-maps/additional-documentation/faq.html">❓ FAQ</a>
</h4>

## Installation

```bash
npm install angular8-yandex-maps
```

#### Version compatibility

| Angular version        | Library version |
| ---------------------- | --------------- |
| v9, v10, v11, v12, v13 | v13.x           |
| v8                     | v8.x            |
| v7                     | v7.x            |
| v6                     | v6.x            |

```bash
npm install angular8-yandex-maps@^8.0.0
```

## Usage

### app.module.ts

##### Default map config options

```typescript
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

@NgModule({
  imports: [AngularYandexMapsModule],
})
export class AppModule {}
```

##### Own map config options

```typescript
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';

const mapConfig: YaConfig = {
  apikey: 'API_KEY',
  lang: 'en_US',
};

@NgModule({
  imports: [AngularYandexMapsModule.forRoot(mapConfig)],
})
export class AppModule {}
```

### component.html

```html
<div class="container">
  <ya-map [center]="[55.751952, 37.600739]" [zoom]="12">
    <ya-placemark [geometry]="[55.751952, 37.600739]"></ya-placemark>
  </ya-map>
</div>
```

### component.css

```css
.container {
  width: 1000px;
  height: 500px;
}
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to
check [issues page](https://github.com/ddubrava/angular8-yandex-maps/issues). You can also take a look at
the [contributing guide](https://github.com/ddubrava/angular8-yandex-maps/blob/master/CONTRIBUTING.md).

## ⭐ Show your support

Give a star if this project helped you!

## 📝 License

Copyright © 2021 [Daniil Dubrava](https://github.com/ddubrava).<br />
This project is [MIT](https://github.com/ddubrava/angular8-yandex-maps/blob/master/LICENSE.md) licensed.
