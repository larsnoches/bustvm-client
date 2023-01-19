import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTripSearchListComponent } from './bustrip-search-list.component';

describe('BustripSearchListComponent', () => {
  let component: BusTripSearchListComponent;
  let fixture: ComponentFixture<BusTripSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusTripSearchListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTripSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
