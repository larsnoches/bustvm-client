import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatStatesListComponent } from './seat-states-list.component';

describe('SeatStatesListComponent', () => {
  let component: SeatStatesListComponent;
  let fixture: ComponentFixture<SeatStatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatStatesListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatStatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
