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
