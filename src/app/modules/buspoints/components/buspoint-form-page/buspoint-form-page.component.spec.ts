import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPointFormPageComponent } from './buspoint-form-page.component';

describe('BusPointFormPageComponent', () => {
  let component: BusPointFormPageComponent;
  let fixture: ComponentFixture<BusPointFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusPointFormPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPointFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
