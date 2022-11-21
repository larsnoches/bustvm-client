import { CarrierStoreService } from './carrier-store.service';
import { TestBed } from '@angular/core/testing';

describe('CarrierStoreService', () => {
  let service: CarrierStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrierStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
