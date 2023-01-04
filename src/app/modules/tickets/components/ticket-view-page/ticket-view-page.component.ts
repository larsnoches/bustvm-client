import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/core/services/auth/auth.service';
import { FormGroup } from '@angular/forms';
import { GetTicketResponseDto } from '@modules/tickets/models/ticket.model';
import { TicketStoreService } from '@modules/tickets/services/ticket/ticket-store.service';

@Component({
  selector: 'app-ticket-view-page',
  templateUrl: './ticket-view-page.component.html',
  styleUrls: ['./ticket-view-page.component.scss'],
})
export class TicketViewPageComponent implements OnInit {
  ticket?: GetTicketResponseDto;
  ticketViewForm: FormGroup;
  qrCodeImageSrc: string;

  error: string | null = null;

  formId = 'ticketViewForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketStoreService,
    private authService: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.ticketViewForm = new FormGroup({});
  }

  get currentUserHasManagerRole(): boolean {
    return this.authService.hasManagerRole();
  }

  get isLoggedIn(): boolean {
    return this.authService.hasValidToken();
  }

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');
    if (ticketId != null) {
      const ticketIdInt = Number.parseInt(ticketId, 10);
      const email = this.authService.getEmail();
      this.ticketService.getTicket(ticketIdInt, email).subscribe({
        next: this.handleGetItemResponse,
        error: (er: Error) => {
          this.error = er.message;
        },
      });
    }
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

  onSubmitTicketReturn(): void {
    if (this.ticket == null) return;
    const ticketId = this.ticket?.id;
    this.ticketService.ticketReturn(ticketId).subscribe({
      complete: () => {
        this.router.navigate(['/tickets']);
      },
      error: (er: Error) => {
        this.error = er.message;
      },
    });
  }

  onSubmitTicketChangeToWaitingToReturn(): void {
    if (this.ticket == null) return;
    const ticketId = this.ticket?.id;
    const email = this.authService.getEmail();
    this.ticketService
      .ticketChangeToWaitingToReturn(ticketId, email)
      .subscribe({
        complete: () => {
          this.router.navigate(['/tickets']);
        },
        error: (er: Error) => {
          this.error = er.message;
        },
      });
  }

  private handleGetItemResponse = (data: GetTicketResponseDto): void => {
    if (data == null) return;
    this.ticket = data;

    const ticketsUrl = this.ticketService.apiUrl;
    const ticketId = this.ticket?.id;
    const qrCode = this.ticket?.qrCode;
    this.qrCodeImageSrc = `${ticketsUrl}/${ticketId}/qrcode?value=${qrCode}`;
  };
}
