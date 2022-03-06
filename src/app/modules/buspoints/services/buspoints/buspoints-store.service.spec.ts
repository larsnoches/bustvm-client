import { BuspointsStoreService } from './buspoints-store.service';
import { TestBed } from '@angular/core/testing';

describe('BuspointsStoreService', () => {
  let service: BuspointsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuspointsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
