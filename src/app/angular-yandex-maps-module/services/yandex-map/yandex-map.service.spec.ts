import { TestBed } from '@angular/core/testing';

import { YandexMapService } from './yandex-map.service';

describe('YandexMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YandexMapService = TestBed.get(YandexMapService);
    expect(service).toBeTruthy();
  });
});
