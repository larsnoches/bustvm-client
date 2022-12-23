import { BsModalRef } from 'ngx-bootstrap/modal';
import { BusTripStoreService } from '@modules/bustrips/services/bustrip/bustrip-store.service';
import { Component } from '@angular/core';
import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';

@Component({
  selector: 'app-bustrip-confirm',
  templateUrl: './bustrip-confirm.component.html',
  styleUrls: ['./bustrip-confirm.component.scss'],
})
export class BusTripConfirmComponent {
  busTrip?: GetBusTripResponseDto;

  constructor(
    private busTripStoreService: BusTripStoreService,
    private bsModalRef: BsModalRef,
  ) {}

  onConfirmBtnClick(): void {
    if (this.busTrip == null) {
      this.bsModalRef?.hide();
      return;
    }
    this.busTripStoreService.removeItem(this.busTrip.id);
    this.bsModalRef?.hide();
  }

  onDeclineBtnClick(): void {
    this.bsModalRef?.hide();
  }
}
