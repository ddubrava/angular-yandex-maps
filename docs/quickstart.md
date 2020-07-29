
# Quick start

## Instalation

```bash
npm install angular8-yandex-maps
```

## Usage

### app.module.ts

Default map config options
```ts
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

@NgModule({
  imports: [AngularYandexMapsModule]
})
export class AppModule { }
```

Custom map config options
```ts
import { AngularYandexMapsModule, IConfig } from 'angular8-yandex-maps';

const mapConfig: IConfig = {
  apikey: 'API_KEY',
  lang: 'en_US',
};

@NgModule({
  imports: [AngularYandexMapsModule.forRoot(mapConfig)]
})
export class AppModule { }
```

Injection token
```ts
import { AngularYandexMapsModule, YA_MAP_CONFIG } from 'angular8-yandex-maps';

@NgModule({
  imports: [AngularYandexMapsModule],
  providers: [{
    provide: YA_MAP_CONFIG,
    useValue: {
      apikey: 'API_KEY',
      lang: 'en_US',
    }
  }],
})
export class AppModule { }
```

### component.html

```html
<div class="container">
  <angular-yandex-map [center]="[55.751952, 37.600739]" [zoom]="12">
    <angular-yandex-placemark [geometry]="[55.751952, 37.600739]"></angular-yandex-placemark>
  </angular-yandex-map>
</div>
```

### component.css

```css
.container {
  width: 1000px;
  height: 500px;
}
```
