import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesItemComponent } from './buses-item.component';

describe('BusesItemComponent', () => {
  let component: BusesItemComponent;
  let fixture: ComponentFixture<BusesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusesItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
