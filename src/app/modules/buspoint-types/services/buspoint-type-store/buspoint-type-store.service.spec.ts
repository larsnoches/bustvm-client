import { BusPointTypeStoreService } from './buspoint-type-store.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('BusPointTypeStoreService', () => {
  let service: BusPointTypeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BusPointTypeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
