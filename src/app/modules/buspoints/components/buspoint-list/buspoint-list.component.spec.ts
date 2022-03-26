import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPointListComponent } from './buspoint-list.component';

describe('BusPointListComponent', () => {
  let component: BusPointListComponent;
  let fixture: ComponentFixture<BusPointListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusPointListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
