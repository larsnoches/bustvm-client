import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BusPointStoreService } from '@modules/buspoints/services/buspoint/buspoint-store.service';
import { BusStoreService } from '@modules/buses/services/bus/bus-store.service';
import { BusTripStoreService } from '@modules/bustrips/services/bustrip/bustrip-store.service';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { FareStoreService } from '@modules/fares/services/fare/fare-store.service';
import { GetBusPointResponseDto } from '@modules/buspoints/models/buspoint.model';
import { GetBusResponseDto } from '@modules/buses/models/bus.model';
import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';
import { GetFareResponseDto } from '@modules/fares/models/fare.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bustrip-form-page',
  templateUrl: './bustrip-form-page.component.html',
  styleUrls: ['./bustrip-form-page.component.scss'],
})
export class BusTripFormPageComponent implements OnInit {
  busTripForm: FormGroup;
  busTrip?: GetBusTripResponseDto;
  carrier?: GetCarrierResponseDto;

  busListData?: Observable<Array<GetBusResponseDto>>;
  fareListData?: Observable<Array<GetFareResponseDto>>;
  busPointListData?: Observable<Array<GetBusPointResponseDto>>;

  error: string | null = null;

  formId = 'busTripForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busTripService: BusTripStoreService,
    private carrierService: CarrierStoreService,
    private busService: BusStoreService,
    private fareService: FareStoreService,
    private busPointService: BusPointStoreService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.busPointListData = this.busPointService.listData.value$;
    this.busListData = this.busService.listData.value$;
    this.fareListData = this.fareService.listData.value$;

    this.busTripForm = new FormGroup({
      departureBusPoint: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      arrivalBusPoint: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      distance: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.min(0),
        Validators.pattern('^\\d*\\.?\\d*$'),
      ]),
      busRouteNumber: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ]),
      departureDate: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.pattern(
          // eslint-disable-next-line prettier/prettier, no-useless-escape
          '/^(0?[1-9]|[12][0-9]|3[01])[/-.](0?[1-9]|1[012])[/-.]d{4}$/',
        ),
      ]),
      departureTime: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.pattern(
          // eslint-disable-next-line prettier/prettier, no-useless-escape
          '^([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$',
        ),
      ]),
      averageBusSpeed: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.min(5),
        Validators.max(130),
        Validators.pattern(
          // eslint-disable-next-line prettier/prettier, no-useless-escape
          '^[0-9]+$',
        ),
      ]),
      bus: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      fare: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      // carrier: new FormControl('', [
      //   // eslint-disable-next-line @typescript-eslint/unbound-method
      //   Validators.required,
      // ]),
    });
  }

  get departureBusPoint(): AbstractControl {
    return this.busTripForm?.get('departureBusPoint') ?? null;
  }

  get arrivalBusPoint(): AbstractControl {
    return this.busTripForm?.get('arrivalBusPoint') ?? null;
  }

  get distance(): AbstractControl {
    return this.busTripForm?.get('distance') ?? null;
  }

  get busRouteNumber(): AbstractControl {
    return this.busTripForm?.get('busRouteNumber') ?? null;
  }

  get departureDate(): AbstractControl {
    return this.busTripForm?.get('departureDate') ?? null;
  }

  get departureTime(): AbstractControl {
    return this.busTripForm?.get('departureTime') ?? null;
  }

  get averageBusSpeed(): AbstractControl {
    return this.busTripForm?.get('averageBusSpeed') ?? null;
  }

  get bus(): AbstractControl {
    return this.busTripForm?.get('bus') ?? null;
  }

  get fare(): AbstractControl {
    return this.busTripForm?.get('fare') ?? null;
  }

  // get carrierId(): AbstractControl {
  //   return this.busTripForm?.get('carrierId') ?? null;
  // }

  ngOnInit(): void {
    const busTripId = this.route.snapshot.paramMap.get('id');
    if (busTripId != null) {
      const busTripIdInt = Number.parseInt(busTripId, 10);
      this.busTripService.getItemById(busTripIdInt).subscribe({
        next: this.handleGetItemResponse,
      });
    } else {
      const carrierIdString = this.route.snapshot.paramMap.get('carrierId');
      if (carrierIdString == null) return;
      const carrierId = Number.parseInt(carrierIdString, 10);
      this.carrier = this.carrierService.listData.value.find(
        val => val.id === carrierId,
      );
      if (this.carrier == null) {
        this.carrier = {
          id: carrierId,
        } as GetCarrierResponseDto;
      }
      this.busService.getListByCarrierId(this.carrier?.id);
      this.fareService.getListByCarrierId(this.carrier?.id);
    }
    this.busPointService.getList();
  }

  onSubmitBusTrip(): void {
    if (!this.busTripForm.valid) return;

    const busTripDto = {
      ...this.busTripForm?.value,
      carrier: this.carrier?.id,
    };

    if (this.busTrip != null) {
      this.busTripService
        .updateItemById(this.busTrip?.id, busTripDto)
        .subscribe({
          complete: () => {
            this.router.navigate(['carriers', this.carrier?.id, 'bustrips']);
          },
          error: (er: Error) => {
            this.error = er.message;
          },
        });
    } else {
      this.busTripService.createItem(busTripDto).subscribe({
        complete: () => {
          this.router.navigate(['carriers', this.carrier?.id, 'bustrips']);
        },
        error: (er: Error) => {
          this.error = er.message;
        },
      });
    }
  }

  private handleGetItemResponse = (data: GetBusTripResponseDto): void => {
    if (data == null) return;
    this.busTrip = data;
    this.busTripForm.setValue({
      departureBusPoint: this.busTrip?.departureBusPoint?.id ?? '',
      arrivalBusPoint: this.busTrip?.arrivalBusPoint?.id ?? '',
      distance: this.busTrip?.distance ?? '',
      busRouteNumber: this.busTrip?.busRouteNumber ?? '',
      departureDate: this.busTrip?.departureDate ?? '',
      departureTime: this.busTrip?.departureTime ?? '',
      averageBusSpeed: this.busTrip?.averageBusSpeed ?? '',
      bus: this.busTrip?.bus?.id ?? '',
      fare: this.busTrip?.fare?.id ?? '',
    });

    this.carrier = this.carrierService.listData.value.find(
      val => val.id === this.busTrip?.carrier?.id,
    );
    if (this.carrier == null) {
      this.carrier = {
        id: this.busTrip?.carrier?.id,
      } as GetCarrierResponseDto;
    }

    this.busService.getListByCarrierId(this.carrier?.id);
    this.fareService.getListByCarrierId(this.carrier?.id);
  };
}
