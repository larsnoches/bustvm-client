import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriersPageComponent } from './carriers-page.component';

describe('CarriersPageComponent', () => {
  let component: CarriersPageComponent;
  let fixture: ComponentFixture<CarriersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarriersPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarriersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
