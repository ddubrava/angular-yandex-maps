import { TestBed } from '@angular/core/testing';

import { AngularYandexMapsModule } from './angular-yandex-maps.module';
import { YA_CONFIG } from './services/ya-api-loader/ya-api-loader.service';

describe('AngularYandexMapsModule', () => {
  it('should not provide YaConfig when forRoot is not call', () => {
    TestBed.configureTestingModule({
      imports: [AngularYandexMapsModule],
    });

    expect(() => TestBed.inject(YA_CONFIG)).toThrowError();
  });

  it('should provide YaConfig when forRoot is called', () => {
    TestBed.configureTestingModule({
      imports: [AngularYandexMapsModule.forRoot({ apikey: 'X-X-X' })],
    });

    expect(() => TestBed.inject(YA_CONFIG)).toBeTruthy();
  });
});
