import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@modules/core/services/auth/auth.service';
import { Component } from '@angular/core';
import { GetTicketResponseDto } from '@modules/tickets/models/ticket.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';
import { TicketConfirmComponent } from '../ticket-confirm/ticket-confirm.component';
import { TicketStoreService } from '@modules/tickets/services/ticket/ticket-store.service';

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html',
  styleUrls: ['./tickets-page.component.scss'],
})
export class TicketsPageComponent {
  bsModalRef?: BsModalRef;
  pageData$: Observable<PageData>;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private ticketService: TicketStoreService,
    private authService: AuthService,
  ) {
    this.pageData$ = ticketService.pageData.value$;
  }

  onDeleteItemBtnClick(ticket: GetTicketResponseDto): void {
    const initialModalState: ModalOptions = {
      initialState: {
        ticket,
      },
    };
    this.bsModalRef = this.modalService.show(
      TicketConfirmComponent,
      initialModalState,
    );
  }

  loadNext(): void {
    const email = this.authService.getEmail();
    const pageNumber = this.ticketService.pageData.value.number + 1;
    this.ticketService.getAllTickets(email, pageNumber);
  }
}
