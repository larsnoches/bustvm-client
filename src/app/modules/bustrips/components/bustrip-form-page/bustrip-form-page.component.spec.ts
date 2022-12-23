import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTripFormPageComponent } from './bustrip-form-page.component';

describe('BusTripFormPageComponent', () => {
  let component: BusTripFormPageComponent;
  let fixture: ComponentFixture<BusTripFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusTripFormPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTripFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
