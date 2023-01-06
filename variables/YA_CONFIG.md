# YA_CONFIG
An injection token to specify a configuration.

```ts
 NgModule({
  providers: [
    {
      provide: YA_CONFIG,
      useValue: {
        apikey: null,
        lang: 'ru_RU',
      },
    },
  ],
})
export class AppModule {}
```