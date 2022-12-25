import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BusPointStoreService } from '@modules/buspoints/services/buspoint/buspoint-store.service';
import { GetBusPointResponseDto } from '@modules/buspoints/models/buspoint.model';

@Component({
  selector: 'app-buspoint-form-page',
  templateUrl: './buspoint-form-page.component.html',
  styleUrls: ['./buspoint-form-page.component.scss'],
})
export class BusPointFormPageComponent implements OnInit {
  busPointForm: FormGroup;
  busPoint?: GetBusPointResponseDto;
  error: string | null = null;

  formId = 'busPointForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busPointService: BusPointStoreService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.busPointForm = new FormGroup({
      name: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(
          '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._,#№-]+ )*[а-яА-Яa-zA-Z0-9._#№-]+(?<![_.])$',
        ),
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
      busPointType: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
    });
  }

  get name(): AbstractControl {
    return this.busPointForm?.get('name') ?? null;
  }

  get address(): AbstractControl {
    return this.busPointForm?.get('address') ?? null;
  }

  get busPointType(): AbstractControl {
    return this.busPointForm?.get('busPointType') ?? null;
  }

  ngOnInit(): void {
    const busPointId = this.route.snapshot.paramMap.get('id');
    if (busPointId != null) {
      const busPointIdInt = Number.parseInt(busPointId, 10);
      this.busPointService.getItemById(busPointIdInt).subscribe({
        next: this.handleGetItemResponse,
      });
    }
  }

  onSubmitBusPoint(): void {
    if (!this.busPointForm.valid) return;

    const busPointDto = {
      ...this.busPointForm?.value,
    };

    if (this.busPoint != null) {
      this.busPointService
        .updateItemById(this.busPoint?.id, busPointDto)
        .subscribe({
          complete: () => {
            this.router.navigate(['/buspoints']);
          },
          error: (er: Error) => {
            this.error = er.message;
          },
        });
    } else {
      this.busPointService.createItem(busPointDto).subscribe({
        complete: () => {
          this.router.navigate(['/buspoints']);
        },
        error: (er: Error) => {
          this.error = er.message;
        },
      });
    }
  }

  private handleGetItemResponse = (data: GetBusPointResponseDto): void => {
    this.busPoint = data;
    this.busPointForm.setValue({
      name: this.busPoint?.name ?? '',
      address: this.busPoint?.address ?? '',
      busPointType: this.busPoint?.busPointType ?? '',
    });
  };
}
