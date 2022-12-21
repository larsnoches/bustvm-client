import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';

@Component({
  selector: 'app-carrier-form-page',
  templateUrl: './carrier-form-page.component.html',
  styleUrls: ['./carrier-form-page.component.scss'],
})
export class CarrierFormPageComponent implements OnInit {
  carrierForm: FormGroup;
  carrier?: GetCarrierResponseDto;
  error: string | null = null;

  formId = 'carrierForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carrierService: CarrierStoreService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.carrierForm = new FormGroup({
      name: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        // Validators.pattern(
        //   '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._,#№-]+ )*[а-яА-Яa-zA-Z0-9._#№-]+(?<![_.])$',
        // ),
      ]),
      inn: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.pattern('^[0-9]+$'),
      ]),
      address: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(255),
        // Validators.pattern(
        //   '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._,#№-]+ )*[а-яА-Яa-zA-Z0-9._#№-]+(?<![_.])$',
        // ),
      ]),
    });
  }

  get name(): AbstractControl {
    return this.carrierForm?.get('name') ?? null;
  }

  get inn(): AbstractControl {
    return this.carrierForm?.get('inn') ?? null;
  }

  get address(): AbstractControl {
    return this.carrierForm?.get('address') ?? null;
  }

  ngOnInit(): void {
    const carrierId = this.route.snapshot.paramMap.get('id');
    if (carrierId != null) {
      const carrierIdInt = Number.parseInt(carrierId, 10);
      this.carrierService.getItemById(carrierIdInt).subscribe({
        next: this.handleGetItemResponse,
      });
    }
  }

  onSubmitCarrier(): void {
    if (!this.carrierForm.valid) return;

    const carrierDto = {
      ...this.carrierForm?.value,
    };

    if (this.carrier != null) {
      this.carrierService
        .updateItemById(this.carrier?.id, carrierDto)
        .subscribe({
          complete: () => {
            this.router.navigate(['/carriers']);
          },
          error: (er: Error) => {
            this.error = er.message;
          },
        });
    } else {
      this.carrierService.createItem(carrierDto).subscribe({
        complete: () => {
          this.router.navigate(['/carriers']);
        },
        error: (er: Error) => {
          this.error = er.message;
        },
      });
    }
  }

  private handleGetItemResponse = (data: GetCarrierResponseDto): void => {
    this.carrier = data;
    this.carrierForm.setValue({
      name: this.carrier?.name ?? '',
      inn: this.carrier?.inn ?? '',
      address: this.carrier?.address ?? '',
    });
  };
}
