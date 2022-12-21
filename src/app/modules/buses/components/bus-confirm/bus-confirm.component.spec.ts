import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusConfirmComponent } from './bus-confirm.component';

describe('BusConfirmComponent', () => {
  let component: BusConfirmComponent;
  let fixture: ComponentFixture<BusConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusConfirmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
