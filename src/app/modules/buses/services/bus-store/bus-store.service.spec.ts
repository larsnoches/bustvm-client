import { TestBed } from '@angular/core/testing';

import { BusesStoreService } from './buses-store.service';

describe('BusesStoreService', () => {
  let service: BusesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
