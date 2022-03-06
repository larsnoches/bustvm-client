import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsItemComponent } from './tickets-item.component';

describe('TicketsItemComponent', () => {
  let component: TicketsItemComponent;
  let fixture: ComponentFixture<TicketsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketsItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
