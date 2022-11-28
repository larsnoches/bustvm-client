import { BsModalRef } from 'ngx-bootstrap/modal';
import { Carrier } from '@modules/carriers/models/carrier.model';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carrier-confirm',
  templateUrl: './carrier-confirm.component.html',
  styleUrls: ['./carrier-confirm.component.scss'],
})
export class CarrierConfirmComponent {
  carrier?: Carrier;

  constructor(
    private carrierStoreService: CarrierStoreService,
    private bsModalRef: BsModalRef,
  ) {}

  onConfirmBtnClick(): void {
    if (this.carrier == null) {
      this.bsModalRef?.hide();
      return;
    }
    this.carrierStoreService.deleteOne(this.carrier);
    this.bsModalRef?.hide();
  }

  onDeclineBtnClick(): void {
    this.bsModalRef?.hide();
  }
}
