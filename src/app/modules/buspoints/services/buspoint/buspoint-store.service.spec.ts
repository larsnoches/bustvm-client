import { BusPointStoreService } from './buspoint-store.service';
import { TestBed } from '@angular/core/testing';

describe('BusPointStoreService', () => {
  let service: BusPointStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusPointStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
