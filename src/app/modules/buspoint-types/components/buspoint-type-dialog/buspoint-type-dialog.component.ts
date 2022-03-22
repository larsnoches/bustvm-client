import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buspoint-type-dialog',
  templateUrl: './buspoint-type-dialog.component.html',
  styleUrls: ['./buspoint-type-dialog.component.scss'],
})
export class BuspointTypeDialogComponent implements OnInit {
  loading$: Observable<boolean>;
  busPointTypeForm: FormGroup;
  busPointType?: BusPointType;

  formId = 'busPointTypeForm';

  constructor(
    private busPointTypeStoreService: BusPointTypeStoreService,
    public bsModalRef: BsModalRef,
  ) {
    this.loading$ = busPointTypeStoreService.loading.value$;
  }

  get name(): AbstractControl {
    return this.busPointTypeForm.get('name');
  }

  ngOnInit(): void {
    this.busPointTypeForm = new FormGroup({
      name: new FormControl(this.busPointType?.name ?? '', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(45),
        Validators.pattern(
          '^(?![_.])(?!.*[_.]{2})([а-яА-Яa-zA-Z0-9._]+ )*[а-яА-Яa-zA-Z0-9._]+(?<![_.])$',
        ),
      ]),
    });
  }

  onSubmitBusPointType(): void {
    console.log(this.busPointTypeForm.valid);
    console.log(this.busPointTypeForm.value);
    console.log('123');
    // this.bsModalRef?.hide();
  }

  // onConfirmBtnClick(): void {
  //   // this.confirmBtnClick?.();
  //   // this.confirmBtnClick?.emit();
  // }

  onDeclineBtnClick(): void {
    this.bsModalRef?.hide();
    // this.declineBtnClick?.emit();
  }

  // createBusPointType() {
  //   this.busPointTypeStoreService.create({
  //     name: this.name.value,
  //   });
  // }
}
