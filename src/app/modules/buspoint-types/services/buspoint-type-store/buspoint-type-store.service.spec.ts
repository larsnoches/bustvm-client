import { BusPointTypeStoreService } from './buspoint-type-store.service';
import { TestBed } from '@angular/core/testing';

describe('BusPointTypeStoreService', () => {
  let service: BusPointTypeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusPointTypeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
