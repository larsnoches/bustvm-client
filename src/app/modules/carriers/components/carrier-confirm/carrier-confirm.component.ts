import { BsModalRef } from 'ngx-bootstrap/modal';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { Component } from '@angular/core';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';

@Component({
  selector: 'app-carrier-confirm',
  templateUrl: './carrier-confirm.component.html',
  styleUrls: ['./carrier-confirm.component.scss'],
})
export class CarrierConfirmComponent {
  carrier?: GetCarrierResponseDto;

  constructor(
    private carrierStoreService: CarrierStoreService,
    private bsModalRef: BsModalRef,
  ) {}

  onConfirmBtnClick(): void {
    if (this.carrier == null) {
      this.bsModalRef?.hide();
      return;
    }
    this.carrierStoreService.removeItem(this.carrier.id);
    this.bsModalRef?.hide();
  }

  onDeclineBtnClick(): void {
    this.bsModalRef?.hide();
  }
}
