import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GetPayedTicketResponseDto } from '@modules/tickets/models/ticket.model';
import { TicketStoreService } from '@modules/tickets/services/ticket/ticket-store.service';

@Component({
  selector: 'app-ticket-view-payed-page',
  templateUrl: './ticket-view-payed-page.component.html',
  styleUrls: ['./ticket-view-payed-page.component.scss'],
})
export class TicketViewPayedPageComponent implements OnInit {
  ticket?: GetPayedTicketResponseDto;
  ticketViewPayedForm: FormGroup;
  qrCodeImageSrc: string;

  error: string | null = null;

  formId = 'ticketViewPayedForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketStoreService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.ticketViewPayedForm = new FormGroup({});
  }

  ngOnInit(): void {
    const qrcode = this.route.snapshot.queryParamMap.get('qrcode');
    if (qrcode != null) {
      this.ticketService.getPayedTicket(qrcode).subscribe({
        next: this.handleGetTicketResponse,
      });
    }
  }

  onSubmitTicket(): void {
    //
  }

  private handleGetTicketResponse = (data: GetPayedTicketResponseDto): void => {
    if (data == null) return;
    this.ticket = data;

    const ticketsUrl = this.ticketService.apiUrl;
    const ticketId = this.ticket?.id;
    const qrCode = this.ticket?.qrCode;
    this.qrCodeImageSrc = `${ticketsUrl}/${ticketId}/qrcode?value=${qrCode}`;

    // this.ticketService
    //   .getQrCode(this.ticket?.id, this.ticket?.qrCode)
    //   .subscribe({
    //     next: img => (this.qrCodeImage = img),
    //   });
  };
}
