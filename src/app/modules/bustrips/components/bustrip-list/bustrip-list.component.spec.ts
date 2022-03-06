import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTripListComponent } from './bustrip-list.component';

describe('BusTripListComponent', () => {
  let component: BusTripListComponent;
  let fixture: ComponentFixture<BusTripListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusTripListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
