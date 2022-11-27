# YA_CONFIG
Injection token to specify configuration.

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