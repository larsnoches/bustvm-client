import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPointsPageComponent } from './buspoints-page.component';

describe('BusPointsPageComponent', () => {
  let component: BusPointsPageComponent;
  let fixture: ComponentFixture<BusPointsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusPointsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPointsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
