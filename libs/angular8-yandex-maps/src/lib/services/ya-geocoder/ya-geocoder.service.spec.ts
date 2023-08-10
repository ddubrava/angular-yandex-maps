import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { mockGeocode } from '../../../test-utils';
import { YaApiLoaderService } from '../ya-api-loader/ya-api-loader.service';
import { YaGeocoderService } from './ya-geocoder.service';

describe('YaGeocoderService', () => {
  let geocoderMock: jest.Mock;
  let service: YaGeocoderService;

  beforeEach(() => {
    geocoderMock = mockGeocode();

    TestBed.configureTestingModule({
      providers: [
        YaGeocoderService,
        {
          provide: YaApiLoaderService,
          useValue: {
            load: () => of({}),
          },
        },
      ],
    });

    service = TestBed.inject(YaGeocoderService);
  });

  afterEach(() => {
    (window.ymaps as any) = undefined;
  });

  it('should geocode', (done) => {
    const request = 'Moscow';

    service.geocode(request).subscribe((v) => {
      expect(v).toEqual({});
      done();
    });

    expect(geocoderMock).toHaveBeenCalledWith(request, undefined);
  });

  it('should geocode with options', () => {
    const request = 'Omsk';

    const options = {
      json: true,
      results: 5,
      skip: 1,
    };

    service.geocode(request, options).subscribe();
    expect(geocoderMock).toHaveBeenCalledWith(request, options);
  });
});
