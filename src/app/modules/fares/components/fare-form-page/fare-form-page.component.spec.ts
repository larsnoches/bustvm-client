import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareFormPageComponent } from './fare-form-page.component';

describe('FareFormPageComponent', () => {
  let component: FareFormPageComponent;
  let fixture: ComponentFixture<FareFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FareFormPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FareFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
