import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTripConfirmComponent } from './bustrip-confirm.component';

describe('BusTripConfirmComponent', () => {
  let component: BusTripConfirmComponent;
  let fixture: ComponentFixture<BusTripConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusTripConfirmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTripConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
