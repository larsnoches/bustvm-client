import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPointTypeListComponent } from './buspoint-type-list.component';

describe('BusPointTypeListComponent', () => {
  let component: BusPointTypeListComponent;
  let fixture: ComponentFixture<BusPointTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusPointTypeListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPointTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
