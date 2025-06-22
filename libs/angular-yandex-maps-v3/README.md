<h1 align="center">angular-yandex-maps-v3</h1>
<p align="center">Yandex.Maps Angular components that implement the Yandex.Maps JavaScript API 3.0</p>

<p align="center">
  <a href="https://www.npmjs.com/package/angular-yandex-maps-v3">
    <img src="https://img.shields.io/npm/v/angular-yandex-maps-v3" alt="NPM version">
  </a>

  <a href="https://www.npmjs.com/package/angular-yandex-maps-v3">
    <img src="https://img.shields.io/npm/dm/angular-yandex-maps-v3?color=blue" alt="NPM downloads">
  </a>

  <a href="https://codecov.io/gh/ddubrava/angular-yandex-maps" >
    <img src="https://codecov.io/gh/ddubrava/angular-yandex-maps/graph/badge.svg?token=ZU50NBBBH6&flag=angular-yandex-maps-v3" alt="Codecov"/>
  </a>
</p>

<h4 align="center">
  <a href="https://ddubrava.github.io/angular-yandex-maps/#/v3/">📄 Documentation</a> |
  <a href="https://ddubrava.github.io/angular-yandex-maps/#/v3/examples">🗺️ Examples</a> |
  <a href="https://ddubrava.github.io/angular-yandex-maps/#/v3/faq">❓ FAQ</a>
</h4>

## Installation

```bash
npm install angular-yandex-maps-v3
npm install @yandex/ymaps3-types --save-dev
```

#### Version compatibility

| Angular version    | Library version |
| ------------------ | --------------- |
| v20                | v20.x           |
| v16, v17, v18, v19 | v19.x           |

## Usage

#### component.html

```html
<div class="container">
  <y-map
    [props]="{
      location: {
        center: [-0.127696, 51.507351],
        zoom: 10,
      },
      theme: 'dark',
    }"
  >
    <y-map-default-scheme-layer />
  </y-map>
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
    "skipLibCheck": true,
    "types": ["@yandex/ymaps3-types"]
  }
}
```

`skipLibCheck` must be set to `true` because `@yandex/ymaps3-types` uses both Vue and React typings.
If you do not enable this option, you will not be able to build the application.

`types` ensure you can access `ymaps3` globally without importing it.

### Standalone

#### component.ts

```ts
import { Component } from '@angular/core';
import { YMapComponent, YMapDefaultSchemeLayerDirective } from 'angular-yandex-maps-v3';

@Component({
  standalone: true,
  imports: [YMapComponent, YMapDefaultSchemeLayerDirective],
})
export class AppComponent {}
```

#### app.config.ts

```ts
import { ApplicationConfig } from '@angular/core';
import { provideYConfig, YConfig } from 'angular-yandex-maps-v3';

const config: YConfig = {
  apikey: 'API_KEY',
};

export const appConfig: ApplicationConfig = {
  providers: [provideYConfig(config)],
};
```

### SCAM

#### app.module.ts

```ts
import { NgModule } from '@angular/core';
import {
  YConfig,
  YMapComponent,
  YMapDefaultSchemeLayerDirective,
  provideYConfig,
} from 'angular-yandex-maps-v3';

const config: YConfig = {
  apikey: 'API_KEY',
};

@NgModule({
  imports: [YMapComponent, YMapDefaultSchemeLayerDirective],
  providers: [provideYConfig(config)],
})
export class AppModule {}
```
