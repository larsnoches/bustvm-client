import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BusPoint } from '@modules/buspoints/models/buspoint.model';
import { BusPointStoreService } from '@modules/buspoints/services/buspoint/buspoint-store.service';
import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';

@Component({
  selector: 'app-buspoint-form-page',
  templateUrl: './buspoint-form-page.component.html',
  styleUrls: ['./buspoint-form-page.component.scss'],
})
export class BusPointFormPageComponent implements OnInit /*, AfterViewChecked*/ {
  // id: number;
  busPointTypeData$: Observable<Array<BusPointType>>;
  busPointForm: FormGroup;
  busPoint?: BusPoint;

  formId = 'busPointForm';

  constructor(
    private route: ActivatedRoute,
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
    this.route.paramMap
      .pipe(switchMap(val => val.getAll('id')))
      .subscribe(val => {
        const id = val;
        this.busPoint = this.busPointService.getOne(id);
        this.busPointForm.setValue({
          name: this.busPoint?.name ?? '',
          address: this.busPoint?.address ?? '',
          busPointType: this.busPoint?.busPointType.id ?? '',
        });
        // this.busPointForm = new FormGroup({
        //   name: new FormControl(this.busPoint?.name ?? '', [
        //     // eslint-disable-next-line @typescript-eslint/unbound-method
        //     Validators.required,
        //     Validators.minLength(2),
        //     Validators.maxLength(255),
        //     Validators.pattern(
        //       '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
        //     ),
        //   ]),
        //   address: new FormControl(this.busPoint?.address ?? '', [
        //     // eslint-disable-next-line @typescript-eslint/unbound-method
        //     Validators.required,
        //     Validators.minLength(2),
        //     Validators.maxLength(255),
        //     Validators.pattern(
        //       '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._,#№-]+ )*[а-яА-Яa-zA-Z0-9._#№-]+(?<![_.])$',
        //     ),
        //   ]),
        //   busPointType: new FormControl(this.busPoint?.busPointType.id ?? '', [
        //     // eslint-disable-next-line @typescript-eslint/unbound-method
        //     Validators.required,
        //   ]),
        // });
      });
  }

  // ngAfterViewChecked(): void {
  //   // this.changeDetectorRef.detectChanges();
  //   // console.log('123', this.busPointForm.get('name').value);
  //   // if (this.busPoint != null) {
  //   //   this.busPointForm?.setValue({
  //   //     name: this.busPoint.name,
  //   //     address: this.busPoint.address,
  //   //     busPointType: this.busPoint?.busPointType?.id ?? '',
  //   //   }, {
  //   //     onlySelf: true,
  //   //     emitEvent: true,
  //   //   });
  //   // }
  //   // this.changeDetectorRef.detectChanges();
  // }

  onSubmitBusPoint(): void {
    console.log(this.busPointForm.value);
    if (!this.busPointForm.valid) return;
  }
}
