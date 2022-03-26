import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPointConfirmComponent } from './buspoint-confirm.component';

describe('BusPointConfirmComponent', () => {
  let component: BusPointConfirmComponent;
  let fixture: ComponentFixture<BusPointConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusPointConfirmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPointConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
