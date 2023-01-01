import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatConfirmComponent } from './seat-confirm.component';

describe('SeatConfirmComponent', () => {
  let component: SeatConfirmComponent;
  let fixture: ComponentFixture<SeatConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatConfirmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
