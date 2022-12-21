import { BsModalRef } from 'ngx-bootstrap/modal';
import { BusStoreService } from '@modules/buses/services/bus/bus-store.service';
import { Component } from '@angular/core';
import { GetBusResponseDto } from '@modules/buses/models/bus.model';

@Component({
  selector: 'app-bus-confirm',
  templateUrl: './bus-confirm.component.html',
  styleUrls: ['./bus-confirm.component.scss'],
})
export class BusConfirmComponent {
  bus?: GetBusResponseDto;

  constructor(
    private busStoreService: BusStoreService,
    private bsModalRef: BsModalRef,
  ) {}

  onConfirmBtnClick(): void {
    if (this.bus == null) {
      this.bsModalRef?.hide();
      return;
    }
    this.busStoreService.removeItem(this.bus.id);
    this.bsModalRef?.hide();
  }

  onDeclineBtnClick(): void {
    this.bsModalRef?.hide();
  }
}
