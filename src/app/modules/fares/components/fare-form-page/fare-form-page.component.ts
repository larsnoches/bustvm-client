import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { FareStoreService } from '@modules/fares/services/fare/fare-store.service';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';
import { GetFareResponseDto } from '@modules/fares/models/fare.model';

@Component({
  selector: 'app-fare-form-page',
  templateUrl: './fare-form-page.component.html',
  styleUrls: ['./fare-form-page.component.scss'],
})
export class FareFormPageComponent implements OnInit {
  fareForm: FormGroup;
  fare?: GetFareResponseDto;
  carrier?: GetCarrierResponseDto;
  error: string | null = null;

  formId = 'fareForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fareService: FareStoreService,
    private carrierService: CarrierStoreService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.fareForm = new FormGroup({
      name: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        // Validators.pattern(
        //   '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
        // ),
      ]),
      price: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern('^\\d*\\.?\\d*$'),
      ]),
    });
  }

  get name(): AbstractControl {
    return this.fareForm?.get('name') ?? null;
  }

  get price(): AbstractControl {
    return this.fareForm?.get('price') ?? null;
  }

  ngOnInit(): void {
    const fareId = this.route.snapshot.paramMap.get('id');
    if (fareId != null) {
      const fareIdInt = Number.parseInt(fareId, 10);
      this.fareService.getItemById(fareIdInt).subscribe({
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

  onSubmitFare(): void {
    if (!this.fareForm.valid) return;

    const fareDto = {
      ...this.fareForm?.value,
      carrier: this.carrier?.id,
    };

    if (this.fare != null) {
      this.fareService.updateItemById(this.fare?.id, fareDto).subscribe({
        complete: () => {
          this.router.navigate(['carriers', this.carrier?.id, 'fares']);
        },
        error: (er: Error) => {
          this.error = er.message;
        },
      });
    } else {
      this.fareService.createItem(fareDto).subscribe({
        complete: () => {
          this.router.navigate(['carriers', this.carrier?.id, 'fares']);
        },
        error: (er: Error) => {
          this.error = er.message;
        },
      });
    }
  }

  private handleGetItemResponse = (data: GetFareResponseDto): void => {
    if (data == null) return;
    this.fare = data;
    this.fareForm.setValue({
      name: this.fare?.name ?? '',
      price: this.fare?.price ?? '',
    });

    this.carrier = this.carrierService.listData.value.find(
      val => val.id === this.fare?.carrier,
    );
    if (this.carrier == null) {
      this.carrier = {
        id: this.fare?.carrier,
      } as GetCarrierResponseDto;
    }
  };
}
