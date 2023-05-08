# YA_CONFIG
An injection token to provide a configuration.

Use this token only if you want to implement some special logic.
Otherwise, use an `AngularYandexMapsModule.forRoot()` method in a root module.

Please note that `YaApiLoaderService` is provided at the root level,
so it won't take your configuration unless this token is provided in the root module.

If you want to provide the configuration in the module other than the root module,
you should provide `YaApiLoaderService`. However, keep in mind that `YaApiLoaderService` is not designed for such purposes,
so it can lead to unexpected issues such as script duplications.

```ts
@NgModule({
  imports: [AngularYandexMapsModule],
  providers: [
    YaApiLoaderService,
    {
      provide: YA_CONFIG,
      useValue: {
        apikey: null,
        lang: 'ru_RU',
      },
    },
  ],
})
export class HomeModule {}
```