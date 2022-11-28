import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Carrier } from '@modules/carriers/models/carrier.model';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-carrier-form-page',
  templateUrl: './carrier-form-page.component.html',
  styleUrls: ['./carrier-form-page.component.scss'],
})
export class CarrierFormPageComponent implements OnInit {
  // busPointTypeData$: Observable<Array<BusPointType>>;
  carrierForm: FormGroup;
  carrier?: Carrier;

  formId = 'carrierForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carrierService: CarrierStoreService,
    // private busPointTypeService: BusPointTypeStoreService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    // this.busPointTypeData$ = busPointTypeService.busPointTypeData.value$;

    this.carrierForm = new FormGroup({
      name: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(
          '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
        ),
      ]),
      inn: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.pattern('[0-9]'),
      ]),
      address: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(
          '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._,#№-]+ )*[а-яА-Яa-zA-Z0-9._#№-]+(?<![_.])$',
        ),
      ]),
      busPointTypeId: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
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
    this.route.paramMap
      .pipe(switchMap(val => val.getAll('id')))
      .subscribe(val => {
        const id = val;
        this.carrier = this.carrierService.getOne(id);
        this.carrierForm.setValue({
          name: this.carrier?.name ?? '',
          inn: this.carrier?.inn ?? '',
          address: this.carrier?.address ?? '',
          // busPointTypeId: this.busPoint?.busPointType.id ?? '',
        });
      });
  }

  onSubmitCarrier(): void {
    if (!this.carrierForm.valid) return;

    const crId: string = this.carrierForm?.value?.busPointTypeId;
    if (crId == null) throw new Error('No carrier id');

    const carrierDto = {
      ...this.carrierForm?.value,
      // busPointType: `${this.busPointTypeService.apiUrl}/${bptId}`,
    };

    if (this.carrier != null) {
      this.carrierService.edit(this.carrier.href, carrierDto);
    } else {
      this.carrierService.create(carrierDto);
    }

    this.router.navigate(['buspoints']);
  }
}
