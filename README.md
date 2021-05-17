![npm](https://img.shields.io/npm/v/angular8-yandex-maps)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/ddubrava/angular8-yandex-maps/CI/master)
![npm](https://img.shields.io/npm/dm/angular8-yandex-maps?color=blue)
![npm bundle size](https://img.shields.io/bundlephobia/min/angular8-yandex-maps)
![GitHub Repo stars](https://img.shields.io/github/stars/ddubrava/angular8-yandex-maps)

# Angular8-yandex-maps

Angular components for Yandex.Maps.

## Documentation

[Documentation](https://ddubrava.github.io/angular8-yandex-maps/)

## Examples

[Examples](https://ddubrava.github.io/angular8-yandex-maps/additional-documentation/examples.html)

## Installation

```bash
npm install angular8-yandex-maps
```

#### Version compatibility

| Angular version | Library Version | Documentation                                                                     |
| --------------- | --------------- | --------------------------------------------------------------------------------- |
| v9, v10, v11    | v11.x           | [DOCUMENTATION](https://ddubrava.github.io/angular8-yandex-maps/#/)               |
| v8              | v8.x            | [DOCUMENTATION](https://github.com/ddubrava/angular8-yandex-maps/tree/8.0.0/docs) |
| v7              | v7.x            | [DOCUMENTATION](https://github.com/ddubrava/angular8-yandex-maps/tree/7.0.0/docs) |
| v6              | v6.x            | [DOCUMENTATION](https://github.com/ddubrava/angular8-yandex-maps/tree/6.0.0/docs) |

```bash
npm install angular8-yandex-maps@^6.0.0
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

##### Injection token

```typescript
import { AngularYandexMapsModule, YA_CONFIG } from 'angular8-yandex-maps';

@NgModule({
  imports: [AngularYandexMapsModule],
  providers: [
    {
      provide: YA_CONFIG,
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

## Changelog

[CHANGELOG](https://github.com/ddubrava/angular8-yandex-maps/blob/master/CHANGELOG.md)

## License

[MIT](https://github.com/ddubrava/angular8-yandex-maps/blob/master/LICENSE.md)
