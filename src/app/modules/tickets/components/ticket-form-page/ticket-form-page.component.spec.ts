import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFormPageComponent } from './ticket-form-page.component';

describe('TicketFormPageComponent', () => {
  let component: TicketFormPageComponent;
  let fixture: ComponentFixture<TicketFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketFormPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
