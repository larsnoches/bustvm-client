import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPointTypeConfirmComponent } from './buspoint-type-confirm.component';

describe('BusPointTypeConfirmComponent', () => {
  let component: BusPointTypeConfirmComponent;
  let fixture: ComponentFixture<BusPointTypeConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusPointTypeConfirmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPointTypeConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
