import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTripSearchFormComponent } from './bustrip-search-form.component';

describe('BustripSearchFormComponent', () => {
  let component: BusTripSearchFormComponent;
  let fixture: ComponentFixture<BusTripSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusTripSearchFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTripSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
