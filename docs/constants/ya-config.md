# YA_CONFIG

Injection token

```ts
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

## Source

[lib/constants/constant.ts](https://github.com/ddubrava/angular8-yandex-maps/blob/master/projects/angular8-yandex-maps/src/lib/constants/constant.ts)
