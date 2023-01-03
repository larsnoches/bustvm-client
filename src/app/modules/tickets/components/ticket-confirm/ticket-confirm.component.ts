import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component } from '@angular/core';
import { GetTicketResponseDto } from '@modules/tickets/models/ticket.model';
import { TicketStoreService } from '@modules/tickets/services/ticket/ticket-store.service';

@Component({
  selector: 'app-ticket-confirm',
  templateUrl: './ticket-confirm.component.html',
  styleUrls: ['./ticket-confirm.component.scss'],
})
export class TicketConfirmComponent {
  ticket?: GetTicketResponseDto;

  constructor(
    private ticketStoreService: TicketStoreService,
    private bsModalRef: BsModalRef,
  ) {}

  onConfirmBtnClick(): void {
    if (this.ticket == null) {
      this.bsModalRef?.hide();
      return;
    }
    this.ticketStoreService.removeItem(this.ticket.id);
    this.bsModalRef?.hide();
  }

  onDeclineBtnClick(): void {
    this.bsModalRef?.hide();
  }
}
