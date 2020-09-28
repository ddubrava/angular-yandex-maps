# Script

Service for appending script in document

## Usage

```ts
import { ScriptService } from 'angular8-yandex-maps';

constructor(private _scriptService: ScriptService) {
  this._scriptService.initScript()
    .subscribe(ymaps => console.log(ymaps))
}
```
