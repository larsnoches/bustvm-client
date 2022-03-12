import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPointTypeItemComponent } from './buspoint-type-item.component';

describe('BusPointTypeItemComponent', () => {
  let component: BusPointTypeItemComponent;
  let fixture: ComponentFixture<BusPointTypeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusPointTypeItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPointTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
