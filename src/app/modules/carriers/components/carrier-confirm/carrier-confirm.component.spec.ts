import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierConfirmComponent } from './carrier-confirm.component';

describe('CarrierConfirmComponent', () => {
  let component: CarrierConfirmComponent;
  let fixture: ComponentFixture<CarrierConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarrierConfirmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
