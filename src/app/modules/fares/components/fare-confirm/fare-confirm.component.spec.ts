import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareConfirmComponent } from './fare-confirm.component';

describe('FareConfirmComponent', () => {
  let component: FareConfirmComponent;
  let fixture: ComponentFixture<FareConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FareConfirmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FareConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
