import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component } from '@angular/core';
import { GetSeatResponseDto } from '@modules/seats/models/seat.model';
import { SeatStoreService } from '@modules/seats/services/seat/seat-store.service';

@Component({
  selector: 'app-seat-confirm',
  templateUrl: './seat-confirm.component.html',
  styleUrls: ['./seat-confirm.component.scss'],
})
export class SeatConfirmComponent {
  seat?: GetSeatResponseDto;

  constructor(
    private seatStoreService: SeatStoreService,
    private bsModalRef: BsModalRef,
  ) {}

  onConfirmBtnClick(): void {
    if (this.seat == null) {
      this.bsModalRef?.hide();
      return;
    }
    this.seatStoreService.removeItem(this.seat.id);
    this.bsModalRef?.hide();
  }

  onDeclineBtnClick(): void {
    this.bsModalRef?.hide();
  }
}
