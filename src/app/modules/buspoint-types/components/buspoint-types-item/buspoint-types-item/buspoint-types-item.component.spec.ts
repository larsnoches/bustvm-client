import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuspointTypesItemComponent } from './buspoint-types-item.component';

describe('BuspointTypesItemComponent', () => {
  let component: BuspointTypesItemComponent;
  let fixture: ComponentFixture<BuspointTypesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuspointTypesItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuspointTypesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
