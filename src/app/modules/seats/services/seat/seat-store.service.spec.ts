import { SeatStoreService } from './seat-store.service';
import { TestBed } from '@angular/core/testing';

describe('SeatStoreService', () => {
  let service: SeatStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
