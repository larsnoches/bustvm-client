import { BsModalRef } from 'ngx-bootstrap/modal';
import { BusPointStoreService } from '@modules/buspoints/services/buspoint/buspoint-store.service';
import { Component } from '@angular/core';
import { GetBusPointResponseDto } from '@modules/buspoints/models/buspoint.model';

@Component({
  selector: 'app-buspoint-confirm',
  templateUrl: './buspoint-confirm.component.html',
  styleUrls: ['./buspoint-confirm.component.scss'],
})
export class BusPointConfirmComponent {
  busPoint?: GetBusPointResponseDto;

  constructor(
    private busPointStoreService: BusPointStoreService,
    private bsModalRef: BsModalRef,
  ) {}

  onConfirmBtnClick(): void {
    if (this.busPoint == null) {
      this.bsModalRef?.hide();
      return;
    }
    this.busPointStoreService.removeItem(this.busPoint.id);
    this.bsModalRef?.hide();
  }

  onDeclineBtnClick(): void {
    this.bsModalRef?.hide();
  }
}
