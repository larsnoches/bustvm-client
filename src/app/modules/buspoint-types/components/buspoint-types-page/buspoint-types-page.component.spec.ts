import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPointTypesPageComponent } from './buspoint-types-page.component';

describe('BusPointTypesPageComponent', () => {
  let component: BusPointTypesPageComponent;
  let fixture: ComponentFixture<BusPointTypesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusPointTypesPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPointTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
