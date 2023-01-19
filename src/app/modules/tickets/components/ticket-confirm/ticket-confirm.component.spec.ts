import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketConfirmComponent } from './ticket-confirm.component';

describe('TicketConfirmComponent', () => {
  let component: TicketConfirmComponent;
  let fixture: ComponentFixture<TicketConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketConfirmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
