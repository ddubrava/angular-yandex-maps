<h1 align="center">Angular8-yandex-maps</h1>
<p align="center">Yandex.Maps Angular components that implement the Yandex.Maps JavaScript API</p>

<p align="center">
  <a href="https://www.npmjs.com/package/angular8-yandex-maps">
    <img src="https://img.shields.io/npm/v/angular8-yandex-maps" alt="NPM version">
  </a>

  <a href="https://www.npmjs.com/package/angular8-yandex-maps">
    <img src="https://img.shields.io/npm/dm/angular8-yandex-maps?color=blue" alt="NPM downloads">
  </a>

  <a href="https://codecov.io/gh/ddubrava/angular8-yandex-maps">
    <img src="https://codecov.io/gh/ddubrava/angular8-yandex-maps/branch/main/graph/badge.svg?token=ZU50NBBBH6" alt="Codecov">
  </a>
</p>

<h4 align="center">
  <a href="https://ddubrava.github.io/angular8-yandex-maps">📄 Documentation</a> |
  <a href="https://ddubrava.github.io/angular8-yandex-maps/#/examples">🗺️ Examples</a> |
  <a href="https://ddubrava.github.io/angular8-yandex-maps/#/faq">❓ FAQ</a>
</h4>

## Installation

```bash
npm install angular8-yandex-maps
```

#### Version compatibility

| Angular version        | Library version |
| ---------------------- | --------------- |
| v16, v17               | v17.x           |
| v15                    | v15.x           |
| v14                    | v14.x           |
| v9, v10, v11, v12, v13 | v13.x           |
| v8                     | v8.x            |
| v7                     | v7.x            |
| v6                     | v6.x            |

```bash
npm install angular8-yandex-maps@^8.0.0
```

## Usage

#### component.html

```html
<div class="container">
  <ya-map [center]="[55.751952, 37.600739]" [zoom]="12">
    <ya-placemark [geometry]="[55.751952, 37.600739]"></ya-placemark>
  </ya-map>
</div>
```

#### component.css

```css
.container {
  width: 1000px;
  height: 500px;
}
```

### SCAM

#### app.module.ts

###### Default map config options

```typescript
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

@NgModule({
  imports: [AngularYandexMapsModule],
})
export class AppModule {}
```

###### Own map config options

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

### Standalone

###### Default map config options

```typescript
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [AngularYandexMapsModule],
})
export class Component {}
```

###### Own map config options

#### app.config.ts

```typescript
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { YaConfig, AngularYandexMapsModule } from 'angular8-yandex-maps';

const mapConfig: YaConfig = {
  apikey: 'API_KEY',
  lang: 'en_US',
};

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(AngularYandexMapsModule.forRoot(mapConfig))],
};
```
