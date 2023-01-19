import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BusTripStoreService } from '@modules/bustrips/services/bustrip/bustrip-store.service';
import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';
import { GetSeatResponseDto } from '@modules/seats/models/seat.model';
import { SeatStoreService } from '@modules/seats/services/seat/seat-store.service';

@Component({
  selector: 'app-seat-form-page',
  templateUrl: './seat-form-page.component.html',
  styleUrls: ['./seat-form-page.component.scss'],
})
export class SeatFormPageComponent implements OnInit {
  seatForm: FormGroup;
  seat?: GetSeatResponseDto;
  busTrip?: GetBusTripResponseDto;
  error: string | null = null;

  formId = 'seatForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seatService: SeatStoreService,
    private busTripService: BusTripStoreService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.seatForm = new FormGroup({
      name: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),
      ]),
      seatIsOccupied: new FormControl(''),
    });
  }

  get name(): AbstractControl {
    return this.seatForm?.get('name') ?? null;
  }

  get seatIsOccupied(): AbstractControl {
    return this.seatForm?.get('seatIsOccupied') ?? null;
  }

  ngOnInit(): void {
    const seatId = this.route.snapshot.paramMap.get('id');
    if (seatId != null) {
      const seatIdInt = Number.parseInt(seatId, 10);
      this.seatService.getItemById(seatIdInt).subscribe({
        next: this.handleGetItemResponse,
      });
    } else {
      const busTripIdString = this.route.snapshot.paramMap.get('busTripId');
      if (busTripIdString == null) return;
      const busTripId = Number.parseInt(busTripIdString, 10);
      this.busTrip = this.busTripService.listData.value.find(
        val => val.id === busTripId,
      );
      if (this.busTrip == null) {
        this.busTrip = {
          id: busTripId,
        } as GetBusTripResponseDto;
      }
    }
  }

  onSubmitSeat(): void {
    if (!this.seatForm.valid) return;

    const seatDto = {
      ...this.seatForm?.value,
      busTrip: this.busTrip?.id,
    };

    if (this.seat != null) {
      this.seatService.updateItemById(this.seat?.id, seatDto).subscribe({
        complete: () => {
          this.router.navigate([
            '/carriers',
            this.busTrip?.carrier?.id ?? 0,
            'bustrips',
            this.busTrip?.id ?? 0,
            'seats',
          ]);
        },
        error: (er: Error) => {
          this.error = er.message;
        },
      });
    } else {
      this.seatService.createItem(seatDto).subscribe({
        complete: () => {
          this.router.navigate([
            '/carriers',
            this.busTrip?.carrier?.id ?? 0,
            'bustrips',
            this.busTrip?.id ?? 0,
            'seats',
          ]);
        },
        error: (er: Error) => {
          this.error = er.message;
        },
      });
    }
  }

  private handleGetItemResponse = (data: GetSeatResponseDto): void => {
    if (data == null) return;
    this.seat = data;
    this.seatForm.setValue({
      name: this.seat?.name ?? '',
      seatIsOccupied: this.seat?.seatIsOccupied ?? '',
    });

    this.busTrip = this.busTripService.listData.value.find(
      val => val.id === this.seat?.busTrip?.id,
    );
    if (this.busTrip == null) {
      this.busTrip = {
        id: this.seat?.busTrip?.id,
      } as GetBusTripResponseDto;
    }
  };
}
