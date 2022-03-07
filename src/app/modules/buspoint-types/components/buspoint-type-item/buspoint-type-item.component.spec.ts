import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuspointTypeItemComponent } from './buspoint-type-item.component';

describe('BuspointTypeItemComponent', () => {
  let component: BuspointTypeItemComponent;
  let fixture: ComponentFixture<BuspointTypeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuspointTypeItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuspointTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
