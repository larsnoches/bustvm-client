import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierFormPageComponent } from './carrier-form-page.component';

describe('CarrierFormPageComponent', () => {
  let component: CarrierFormPageComponent;
  let fixture: ComponentFixture<CarrierFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarrierFormPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
