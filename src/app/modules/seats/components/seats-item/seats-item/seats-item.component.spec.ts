import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsItemComponent } from './seats-item.component';

describe('SeatsItemComponent', () => {
  let component: SeatsItemComponent;
  let fixture: ComponentFixture<SeatsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatsItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
