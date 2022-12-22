import { FareStoreService } from './fare-store.service';
import { TestBed } from '@angular/core/testing';

describe('FaresStoreService', () => {
  let service: FareStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FareStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
