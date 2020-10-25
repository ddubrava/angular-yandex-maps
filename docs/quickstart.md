# Quick start

## Installation

```bash
npm install angular8-yandex-maps
```

Versions now follow Angular's version to easily reflect compatibility.
Meaning, for Angular 6, use

```bash
npm install angular8-yandex-maps@^6.0.0
```

## Usage

### app.module.ts

Default map config options

```ts
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

@NgModule({
  imports: [AngularYandexMapsModule],
})
export class AppModule {}
```

Custom map config options

```ts
import { AngularYandexMapsModule, IConfig } from 'angular8-yandex-maps';

const mapConfig: IConfig = {
  apikey: 'API_KEY',
  lang: 'en_US',
};

@NgModule({
  imports: [AngularYandexMapsModule.forRoot(mapConfig)],
})
export class AppModule {}
```

Injection token

```ts
import { AngularYandexMapsModule, YA_MAP_CONFIG } from 'angular8-yandex-maps';

@NgModule({
  imports: [AngularYandexMapsModule],
  providers: [
    {
      provide: YA_MAP_CONFIG,
      useValue: {
        apikey: 'API_KEY',
        lang: 'en_US',
      },
    },
  ],
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
