import { SeatStatesStoreService } from './seat-states-store.service';
import { TestBed } from '@angular/core/testing';

describe('SeatStatesStoreService', () => {
  let service: SeatStatesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatStatesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
