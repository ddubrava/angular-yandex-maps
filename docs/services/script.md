# Script

Injectable service that will handle the loading of Yandex.Maps script

## Usage

```ts
import { ScriptService } from 'angular8-yandex-maps';

constructor(private _scriptService: ScriptService) {
  this._scriptService.initScript()
    .subscribe(ymaps => console.log(ymaps))
}
```

## Source

[lib/services/script](https://github.com/ddubrava/angular8-yandex-maps/tree/master/projects/angular8-yandex-maps/src/lib/services/script)
