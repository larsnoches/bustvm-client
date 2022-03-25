import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusPointTypeListComponent } from './buspoint-type-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalModule } from 'ngx-bootstrap/modal';

describe('BusPointTypeListComponent', () => {
  let component: BusPointTypeListComponent;
  let fixture: ComponentFixture<BusPointTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusPointTypeListComponent],
      imports: [HttpClientTestingModule, ModalModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPointTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
