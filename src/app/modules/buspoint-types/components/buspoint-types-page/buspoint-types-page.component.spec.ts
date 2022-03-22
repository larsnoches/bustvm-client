import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusPointTypesPageComponent } from './buspoint-types-page.component';
import { ModalModule } from 'ngx-bootstrap/modal';

describe('BusPointTypesPageComponent', () => {
  let component: BusPointTypesPageComponent;
  let fixture: ComponentFixture<BusPointTypesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusPointTypesPageComponent],
      imports: [ModalModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPointTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
