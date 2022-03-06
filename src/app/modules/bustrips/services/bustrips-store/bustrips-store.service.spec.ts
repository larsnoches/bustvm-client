import { BustripsStoreService } from './bustrips-store.service';
import { TestBed } from '@angular/core/testing';

describe('BustripsStoreService', () => {
  let service: BustripsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BustripsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
