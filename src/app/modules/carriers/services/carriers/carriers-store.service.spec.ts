import { CarriersStoreService } from './carriers-store.service';
import { TestBed } from '@angular/core/testing';

describe('CarriersStoreService', () => {
  let service: CarriersStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarriersStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
