import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatFormPageComponent } from './seat-form-page.component';

describe('SeatFormPageComponent', () => {
  let component: SeatFormPageComponent;
  let fixture: ComponentFixture<SeatFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatFormPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
