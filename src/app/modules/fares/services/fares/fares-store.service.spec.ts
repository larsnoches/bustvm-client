import { FaresStoreService } from './fares-store.service';
import { TestBed } from '@angular/core/testing';

describe('FaresStoreService', () => {
  let service: FaresStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaresStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
