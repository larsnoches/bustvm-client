import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/core/services/auth/auth.service';
import { BusTripStoreService } from '@modules/bustrips/services/bustrip/bustrip-store.service';
import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';
import { GetSeatResponseDto } from '@modules/seats/models/seat.model';
import { GetTicketResponseDto } from '@modules/tickets/models/ticket.model';
import { Observable } from 'rxjs';
import { SeatStoreService } from '@modules/seats/services/seat/seat-store.service';
import { TicketStoreService } from '@modules/tickets/services/ticket/ticket-store.service';

@Component({
  selector: 'app-ticket-form-page',
  templateUrl: './ticket-form-page.component.html',
  styleUrls: ['./ticket-form-page.component.scss'],
})
export class TicketFormPageComponent implements OnInit {
  ticketForm: FormGroup;
  ticket?: GetTicketResponseDto;
  busTrip?: GetBusTripResponseDto;
  seatListData?: Observable<Array<GetSeatResponseDto>>;
  error: string | null = null;

  formId = 'ticketForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketStoreService,
    private busTripService: BusTripStoreService,
    private seatService: SeatStoreService,
    private authService: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.seatListData = this.seatService.listData.value$;

    if (!this.authService.hasValidToken()) {
      this.ticketForm = new FormGroup({
        passengerLastname: new FormControl('', [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.pattern(
            '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
          ),
        ]),
        passengerFirstname: new FormControl('', [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.pattern(
            '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
          ),
        ]),
        passengerMiddlename: new FormControl('', [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.maxLength(255),
          Validators.pattern(
            '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
          ),
        ]),
        seatName: new FormControl('', [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]),
        // busTrip: new FormControl('', [
        //   // eslint-disable-next-line @typescript-eslint/unbound-method
        //   Validators.required,
        // ]),
        email: new FormControl('', [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255),
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      });
    } else {
      this.ticketForm = new FormGroup({
        seatName: new FormControl('', [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]),
        // busTrip: new FormControl('', [
        //   // eslint-disable-next-line @typescript-eslint/unbound-method
        //   Validators.required,
        // ]),
      });
    }
  }

  get passengerLastname(): AbstractControl {
    return this.ticketForm?.get('passengerLastname') ?? null;
  }

  get passengerFirstname(): AbstractControl {
    return this.ticketForm?.get('passengerFirstname') ?? null;
  }

  get passengerMiddlename(): AbstractControl {
    return this.ticketForm?.get('passengerMiddlename') ?? null;
  }

  get seatName(): AbstractControl {
    return this.ticketForm?.get('seatName') ?? null;
  }

  // get busTrip(): AbstractControl {
  //   return this.ticketForm?.get('busTrip') ?? null;
  // }

  get email(): AbstractControl {
    return this.ticketForm?.get('email') ?? null;
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
      this.ticketService.getItemById(ticketIdInt).subscribe({
        next: this.handleGetItemResponse,
      });
    } else {
      const busTripIdString = this.route.snapshot.paramMap.get('busTripId');
      if (busTripIdString == null) return;
      const busTripId = Number.parseInt(busTripIdString, 10);
      this.busTripService.getItemById(busTripId).subscribe({
        next: this.handleGetBusTripResponse,
      });
    }
  }

  onSubmitTicket(): void {
    if (!this.ticketForm.valid) return;

    let ticketDto = {
      ...this.ticketForm?.value,
      busTrip: this.busTrip?.id,
    };
    if (this.isLoggedIn) {
      const email = this.authService.getEmail();
      ticketDto = {
        ...ticketDto,
        email,
        passengerLastname: email,
        passengerFirstname: email,
        passengerMiddlename: email,
      };
    }
    // todo: разделить dto для анонимного пользователя и для зарегистрированного

    if (this.ticket != null) {
      // this.ticketService.updateItemById(this.ticket?.id, ticketDto).subscribe({
      //   complete: () => {
      //     this.router.navigate([
      //       '/tickets',
      //       this.busTrip?.id ?? 0,
      //     ]);
      //   },
      //   error: (er: Error) => {
      //     this.error = er.message;
      //   },
      // });
    } else {
      this.ticketService.createTicket(ticketDto).subscribe({
        next: data => {
          console.log(data.path);
          window.location.href = data.path;
        },
        // complete: () => {
        //   this.router.navigate([
        //     '/tickets',
        //     this.busTrip?.carrier?.id ?? 0,
        //     'bustrips',
        //     this.busTrip?.id ?? 0,
        //     'tickets',
        //   ]);
        // },
        error: (er: Error) => {
          this.error = er.message;
        },
      });
    }
  }

  private handleGetBusTripResponse = (data: GetBusTripResponseDto): void => {
    if (data == null) return;
    this.busTrip = data;

    this.seatService?.getSeats(
      this.busTrip?.id,
      this.busTrip?.bus?.id,
      this.busTrip?.departureDate,
      this.busTrip?.departureTime,
    );
  };

  private handleGetItemResponse = (data: GetTicketResponseDto): void => {
    if (data == null) return;
    this.ticket = data;
    this.ticketForm.setValue({
      passengerLastname: this.ticket?.passengerLastname ?? '',
      passengerFirstname: this.ticket?.passengerFirstname ?? '',
      passengerMiddlename: this.ticket?.passengerMiddlename ?? '',
      seatName: this.ticket?.seatName ?? '',
      busTrip: this.ticket?.busTrip ?? '',
      email: this.ticket?.email ?? '',
    });

    this.busTrip = this.busTripService.listData.value.find(
      val => val.id === this.ticket?.busTrip?.id,
    );
    if (this.busTrip == null) {
      this.busTrip = {
        id: this.ticket?.busTrip?.id,
      } as GetBusTripResponseDto;
    }
  };
}
