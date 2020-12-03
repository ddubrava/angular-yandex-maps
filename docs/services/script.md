# Script

Injectable service that will handle the loading of Yandex.Maps script

## Usage

Success

```ts
import { ScriptService } from 'angular8-yandex-maps';

constructor(private scriptService: ScriptService) {
  this.scriptService.initScript()
    .subscribe(ymaps => console.log(ymaps))
}
```

Error

```ts
import { ScriptService } from 'angular8-yandex-maps';

constructor(private scriptService: ScriptService) {
  scriptService
    .initScript()
    .pipe(catchError((e) => throwError(e)))
    .subscribe();
}
```

## Source

[lib/services/script](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/services/script)
