import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketViewPayedPageComponent } from './ticket-view-payed-page.component';

describe('TicketViewPayedPageComponent', () => {
  let component: TicketViewPayedPageComponent;
  let fixture: ComponentFixture<TicketViewPayedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketViewPayedPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewPayedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
