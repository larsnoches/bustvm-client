import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriersItemComponent } from './carriers-item.component';

describe('CarriersItemComponent', () => {
  let component: CarriersItemComponent;
  let fixture: ComponentFixture<CarriersItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarriersItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarriersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
