import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@modules/core/services/auth/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GetTicketResponseDto } from '@modules/tickets/models/ticket.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';
import { TicketStoreService } from '@modules/tickets/services/ticket/ticket-store.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  @Output() deleteItemHandler: EventEmitter<GetTicketResponseDto> =
    new EventEmitter<GetTicketResponseDto>();
  ticketListData$: Observable<Array<GetTicketResponseDto>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;
  bsModalRef?: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketStoreService,
    private authService: AuthService,
  ) {
    this.ticketListData$ = ticketService.listData.value$;
    this.pageData$ = ticketService.pageData.value$;
    this.loading$ = ticketService.loading.value$;
  }

  get currentUserHasManagerRole(): boolean {
    return this.authService.hasManagerRole();
  }

  get isLoggedIn(): boolean {
    return this.authService.hasValidToken();
  }

  ngOnInit(): void {
    const email = this.authService.getEmail();
    this.ticketService.getAllTickets(email, 0);
  }

  deleteOne(ticket: GetTicketResponseDto): void {
    this.deleteItemHandler.emit(ticket);
  }

  ticketStatusText(ticketStatus: string): string {
    switch (ticketStatus) {
      case 'WAITING_TO_PAY': {
        return 'Ожидает оплаты';
      }
      case 'PAYED': {
        return 'Оплачен';
      }
      case 'WAITING_TO_RETURN': {
        return 'Ожидает возврата';
      }
      case 'RETURNED': {
        return 'Возвращен';
      }
      case 'FREE': {
        return 'Свободен';
      }
      default:
        return 'Свободен';
    }
  }
}
