import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaresPageComponent } from './fares-page.component';

describe('FaresPageComponent', () => {
  let component: FaresPageComponent;
  let fixture: ComponentFixture<FaresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaresPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
