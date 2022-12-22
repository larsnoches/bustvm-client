import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component } from '@angular/core';
import { FareStoreService } from '@modules/fares/services/fare/fare-store.service';
import { GetFareResponseDto } from '@modules/fares/models/fare.model';

@Component({
  selector: 'app-fare-confirm',
  templateUrl: './fare-confirm.component.html',
  styleUrls: ['./fare-confirm.component.scss'],
})
export class FareConfirmComponent {
  fare?: GetFareResponseDto;

  constructor(
    private fareStoreService: FareStoreService,
    private bsModalRef: BsModalRef,
  ) {}

  onConfirmBtnClick(): void {
    if (this.fare == null) {
      this.bsModalRef?.hide();
      return;
    }
    this.fareStoreService.removeItem(this.fare.id);
    this.bsModalRef?.hide();
  }

  onDeclineBtnClick(): void {
    this.bsModalRef?.hide();
  }
}
