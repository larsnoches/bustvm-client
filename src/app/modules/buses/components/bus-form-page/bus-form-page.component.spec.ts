import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusFormPageComponent } from './bus-form-page.component';

describe('BusFormPageComponent', () => {
  let component: BusFormPageComponent;
  let fixture: ComponentFixture<BusFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusFormPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
