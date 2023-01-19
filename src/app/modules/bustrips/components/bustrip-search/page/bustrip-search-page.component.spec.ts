import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTripSearchPageComponent } from './bustrip-search-page.component';

describe('BustripSearchPageComponent', () => {
  let component: BusTripSearchPageComponent;
  let fixture: ComponentFixture<BusTripSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusTripSearchPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTripSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
