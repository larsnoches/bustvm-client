import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuspointTypeDialogComponent } from './buspoint-type-dialog.component';

describe('BuspointTypeDialogComponent', () => {
  let component: BuspointTypeDialogComponent;
  let fixture: ComponentFixture<BuspointTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuspointTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuspointTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
