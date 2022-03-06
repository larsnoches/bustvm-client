import { BuspointTypesStoreService } from './buspoint-type-store.service';
import { TestBed } from '@angular/core/testing';

describe('BuspointTypesStoreService', () => {
  let service: BuspointTypesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuspointTypesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
