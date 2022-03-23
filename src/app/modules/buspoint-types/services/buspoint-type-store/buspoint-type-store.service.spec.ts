import { BusPointTypeStoreService } from './buspoint-type-store.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('BusPointTypeStoreService', () => {
  let service: BusPointTypeStoreService;
  // let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BusPointTypeStoreService);
    // httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    //   httpMock.expectOne(service.apiUrl);
  });
});
