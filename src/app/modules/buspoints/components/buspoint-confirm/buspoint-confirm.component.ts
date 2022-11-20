import { BsModalRef } from 'ngx-bootstrap/modal';
import { BusPoint } from '@modules/buspoints/models/buspoint.model';
import { BusPointStoreService } from '@modules/buspoints/services/buspoint/buspoint-store.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buspoint-confirm',
  templateUrl: './buspoint-confirm.component.html',
  styleUrls: ['./buspoint-confirm.component.scss'],
})
export class BusPointConfirmComponent {
  busPoint?: BusPoint;

  constructor(
    private busPointStoreService: BusPointStoreService,
    private bsModalRef: BsModalRef,
  ) {}

  onConfirmBtnClick(): void {
    if (this.busPoint == null) {
      this.bsModalRef?.hide();
      return;
    }
    this.busPointStoreService.deleteOne(this.busPoint);
    this.bsModalRef?.hide();
  }

  onDeclineBtnClick(): void {
    this.bsModalRef?.hide();
  }
}
