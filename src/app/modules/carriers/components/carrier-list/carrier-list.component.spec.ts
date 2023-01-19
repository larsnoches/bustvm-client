import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierListComponent } from './carrier-list.component';

describe('CarrierListComponent', () => {
  let component: CarrierListComponent;
  let fixture: ComponentFixture<CarrierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarrierListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
