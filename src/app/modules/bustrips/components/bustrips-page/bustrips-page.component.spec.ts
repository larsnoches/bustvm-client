import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTripsPageComponent } from './bustrips-page.component';

describe('BusTripsPageComponent', () => {
  let component: BusTripsPageComponent;
  let fixture: ComponentFixture<BusTripsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusTripsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTripsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
