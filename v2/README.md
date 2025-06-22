<h1 align="center">angular8-yandex-maps</h1>
<p align="center">Yandex.Maps Angular components that implement the Yandex.Maps JavaScript API 2.0</p>

<p align="center">
  <a href="https://www.npmjs.com/package/angular8-yandex-maps">
    <img src="https://img.shields.io/npm/v/angular8-yandex-maps" alt="NPM version">
  </a>

  <a href="https://www.npmjs.com/package/angular8-yandex-maps">
    <img src="https://img.shields.io/npm/dm/angular8-yandex-maps?color=blue" alt="NPM downloads">
  </a>

  <a href="https://codecov.io/gh/ddubrava/angular-yandex-maps" >
    <img src="https://codecov.io/gh/ddubrava/angular-yandex-maps/graph/badge.svg?token=ZU50NBBBH6&flag=angular-yandex-maps-v2" alt="Codecov"/>
  </a>
</p>

<h4 align="center">
  <a href="https://ddubrava.github.io/angular-yandex-maps/#/v2/">📄 Documentation</a> |
  <a href="https://ddubrava.github.io/angular-yandex-maps/#/v2/examples">🗺️ Examples</a> |
  <a href="https://ddubrava.github.io/angular-yandex-maps/#/v2/faq">❓ FAQ</a>
</h4>

## Installation

```bash
npm install angular8-yandex-maps
```

#### Version compatibility

| Angular version        | Library version |
| ---------------------- | --------------- |
| v20                    | v20.x           |
| v16, v17, v18, v19     | v19.x           |
| v15                    | v15.x           |
| v14                    | v14.x           |
| v9, v10, v11, v12, v13 | v13.x           |
| v8                     | v8.x            |
| v7                     | v7.x            |
| v6                     | v6.x            |

Documentation for older versions can be found using the [branches](https://github.com/ddubrava/angular-yandex-maps/branches/all).

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

#### tsconfig.json

```json
{
  "compilerOptions": {
    "types": ["angular8-yandex-maps"]
  }
}
```

`types` ensure you can access `ymaps` globally without importing it.

### Standalone

#### component.ts

```ts
import { Component } from '@angular/core';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

@Component({
  standalone: true,
  imports: [AngularYandexMapsModule],
})
export class AppComponent {}
```

#### app.config.ts

```typescript
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { YaConfig, AngularYandexMapsModule } from 'angular8-yandex-maps';

const config: YaConfig = {
  apikey: 'API_KEY',
};

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(AngularYandexMapsModule.forRoot(config))],
};
```

### SCAM

#### app.module.ts

```typescript
import { NgModule } from '@angular/core';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';

const config: YaConfig = {
  apikey: 'API_KEY',
};

@NgModule({
  imports: [AngularYandexMapsModule.forRoot(mapConfig)],
})
export class AppModule {}
```
