import { SeatsStoreService } from './seats-store.service';
import { TestBed } from '@angular/core/testing';

describe('SeatsStoreService', () => {
  let service: SeatsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
