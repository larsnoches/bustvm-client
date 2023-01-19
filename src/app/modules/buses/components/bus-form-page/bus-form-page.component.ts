import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BusStoreService } from '@modules/buses/services/bus/bus-store.service';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { GetBusResponseDto } from '@modules/buses/models/bus.model';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';

@Component({
  selector: 'app-bus-form-page',
  templateUrl: './bus-form-page.component.html',
  styleUrls: ['./bus-form-page.component.scss'],
})
export class BusFormPageComponent implements OnInit {
  busForm: FormGroup;
  bus?: GetBusResponseDto;
  carrier?: GetCarrierResponseDto;
  error: string | null = null;

  formId = 'busForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busService: BusStoreService,
    private carrierService: CarrierStoreService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.busForm = new FormGroup({
      makeModel: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(
          '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
        ),
      ]),
      manufacturerCountry: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(
          '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
        ),
      ]),
      yearOfManufacture: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.min(1920),
        // Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]+$'),
      ]),
      seatCount: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.min(2),
        Validators.max(200),
        Validators.pattern('^[0-9]+$'),
      ]),
      regNumber: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
        Validators.pattern(
          '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
        ),
      ]),
    });
  }

  get makeModel(): AbstractControl {
    return this.busForm?.get('makeModel') ?? null;
  }

  get manufacturerCountry(): AbstractControl {
    return this.busForm?.get('manufacturerCountry') ?? null;
  }

  get yearOfManufacture(): AbstractControl {
    return this.busForm?.get('yearOfManufacture') ?? null;
  }

  get seatCount(): AbstractControl {
    return this.busForm?.get('seatCount') ?? null;
  }

  get regNumber(): AbstractControl {
    return this.busForm?.get('regNumber') ?? null;
  }

  ngOnInit(): void {
    const busId = this.route.snapshot.paramMap.get('id');
    if (busId != null) {
      const busIdInt = Number.parseInt(busId, 10);
      this.busService.getItemById(busIdInt).subscribe({
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
    }
  }

  onSubmitBus(): void {
    if (!this.busForm.valid) return;

    const busDto = {
      ...this.busForm?.value,
      carrier: this.carrier?.id,
    };

    if (this.bus != null) {
      this.busService.updateItemById(this.bus?.id, busDto).subscribe({
        complete: () => {
          this.router.navigate(['carriers', this.carrier?.id, 'buses']);
        },
        error: (er: Error) => {
          this.error = er.message;
        },
      });
    } else {
      this.busService.createItem(busDto).subscribe({
        complete: () => {
          this.router.navigate(['carriers', this.carrier?.id, 'buses']);
        },
        error: (er: Error) => {
          this.error = er.message;
        },
      });
    }
  }

  private handleGetItemResponse = (data: GetBusResponseDto): void => {
    if (data == null) return;
    this.bus = data;
    this.busForm.setValue({
      makeModel: this.bus?.makeModel ?? '',
      manufacturerCountry: this.bus?.manufacturerCountry ?? '',
      yearOfManufacture: this.bus?.yearOfManufacture ?? '',
      seatCount: this.bus?.seatCount ?? '',
      regNumber: this.bus?.regNumber ?? '',
    });

    this.carrier = this.carrierService.listData.value.find(
      val => val.id === this.bus?.carrier,
    );
    if (this.carrier == null) {
      this.carrier = {
        id: this.bus?.carrier,
      } as GetCarrierResponseDto;
    }
  };
}
