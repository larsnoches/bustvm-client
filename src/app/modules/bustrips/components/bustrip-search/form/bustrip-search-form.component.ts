import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component } from '@angular/core';
import { BusTripStoreService } from '@modules/bustrips/services/bustrip/bustrip-store.service';

@Component({
  selector: 'app-bustrip-search-form',
  templateUrl: './bustrip-search-form.component.html',
  styleUrls: ['./bustrip-search-form.component.scss'],
})
export class BusTripSearchFormComponent {
  searchBusTripForm: FormGroup;
  error: string | null = null;

  formId = 'searchBusTripForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busTripService: BusTripStoreService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.searchBusTripForm = new FormGroup({
      arrivalPointTo: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(
          '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._,#№-]+ )*[а-яА-Яa-zA-Z0-9._#№-]+(?<![_.])$',
        ),
      ]),
      departureDate: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.pattern(
          // eslint-disable-next-line prettier/prettier, no-useless-escape
          '^(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[012]).[0-9]{4}$',
        ),
      ]),
    });
  }

  get arrivalPointTo(): AbstractControl {
    return this.searchBusTripForm?.get('arrivalPointTo') ?? null;
  }

  get departureDate(): AbstractControl {
    return this.searchBusTripForm?.get('departureDate') ?? null;
  }

  onSubmitSearchBusTrip(): void {
    if (!this.searchBusTripForm.valid) return;

    const arrivalPointTo = this.searchBusTripForm?.value
      ?.arrivalPointTo as string;
    const departureDate = this.searchBusTripForm?.value
      ?.departureDate as string;

    this.busTripService.search(arrivalPointTo, departureDate);
  }
}
