import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaresItemComponent } from './fares-item.component';

describe('FaresItemComponent', () => {
  let component: FaresItemComponent;
  let fixture: ComponentFixture<FaresItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaresItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaresItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
