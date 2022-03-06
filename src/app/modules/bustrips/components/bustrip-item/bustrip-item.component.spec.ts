import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTripItemComponent } from './bustrip-item.component';

describe('BustripItemComponent', () => {
  let component: BusTripItemComponent;
  let fixture: ComponentFixture<BusTripItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusTripItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTripItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
