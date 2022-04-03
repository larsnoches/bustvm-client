import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { BusPoint } from '@modules/buspoints/models/buspoint.model';
import { BusPointStoreService } from '@modules/buspoints/services/buspoint/buspoint-store.service';
import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';

@Component({
  selector: 'app-buspoint-form-page',
  templateUrl: './buspoint-form-page.component.html',
  styleUrls: ['./buspoint-form-page.component.scss'],
})
export class BusPointFormPageComponent implements OnInit {
  busPointTypeData$: Observable<Array<BusPointType>>;
  busPointForm: FormGroup;
  busPoint?: BusPoint;

  formId = 'busPointForm';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busPointService: BusPointStoreService,
    private busPointTypeService: BusPointTypeStoreService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.busPointTypeData$ = busPointTypeService.busPointTypeData.value$;

    this.busPointForm = new FormGroup({
      name: new FormControl('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(
          '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
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
      busPointTypeId: new FormControl('', [
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

  get busPointTypeId(): AbstractControl {
    return this.busPointForm?.get('busPointTypeId') ?? null;
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap(val => val.getAll('id')))
      .subscribe(val => {
        const id = val;
        this.busPoint = this.busPointService.getOne(id);
        this.busPointForm.setValue({
          name: this.busPoint?.name ?? '',
          address: this.busPoint?.address ?? '',
          busPointTypeId: this.busPoint?.busPointType.id ?? '',
        });
      });
  }

  onSubmitBusPoint(): void {
    if (!this.busPointForm.valid) return;

    const bptId: string = this.busPointForm?.value?.busPointTypeId;
    if (bptId == null) throw new Error('No bus point id');

    const bpt = this.busPointTypeService.busPointTypeData.value.find(
      v => v.id === Number(bptId),
    );
    if (bpt == null) throw new Error('No selected bus point');

    const busPointDto = {
      ...this.busPointForm?.value,
      busPointType: `${this.busPointTypeService.apiUrl}/${bptId}`,
    };

    if (this.busPoint != null) {
      this.busPointService.edit({
        busPointDto,
        busPointHref: this.busPoint.href,
        busPointType: bpt,
      });
    } else {
      this.busPointService.create(busPointDto, bpt);
    }

    this.router.navigate(['buspoints']);
  }
}
