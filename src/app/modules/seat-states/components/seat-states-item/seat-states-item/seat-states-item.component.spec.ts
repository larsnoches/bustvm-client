import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatStatesItemComponent } from './seat-states-item.component';

describe('SeatStatesItemComponent', () => {
  let component: SeatStatesItemComponent;
  let fixture: ComponentFixture<SeatStatesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatStatesItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatStatesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
