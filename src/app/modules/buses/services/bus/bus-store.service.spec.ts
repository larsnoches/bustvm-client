import { BusStoreService } from './bus-store.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('BusesStoreService', () => {
  let service: BusStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BusStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
