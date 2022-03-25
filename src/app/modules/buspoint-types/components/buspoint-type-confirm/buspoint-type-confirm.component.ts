import { BsModalRef } from 'ngx-bootstrap/modal';
import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buspoint-type-confirm',
  templateUrl: './buspoint-type-confirm.component.html',
  styleUrls: ['./buspoint-type-confirm.component.scss'],
})
export class BusPointTypeConfirmComponent {
  busPointType?: BusPointType;

  constructor(
    private busPointTypeStoreService: BusPointTypeStoreService,
    private bsModalRef: BsModalRef,
  ) {}

  onConfirmBtnClick(): void {
    if (this.busPointType == null) {
      this.bsModalRef?.hide();
      return;
    }
    this.busPointTypeStoreService.deleteOne(this.busPointType);
    this.bsModalRef?.hide();
  }

  onDeclineBtnClick(): void {
    this.bsModalRef?.hide();
  }
}
