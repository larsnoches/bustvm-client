import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CarrierConfirmComponent } from '../carrier-confirm/carrier-confirm.component';
import { Component } from '@angular/core';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';

@Component({
  selector: 'app-carriers-page',
  templateUrl: './carriers-page.component.html',
  styleUrls: ['./carriers-page.component.scss'],
})
export class CarriersPageComponent {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  onDeleteItemBtnClick(carrier: GetCarrierResponseDto): void {
    const initialModalState: ModalOptions = {
      initialState: {
        carrier,
      },
    };
    this.bsModalRef = this.modalService.show(
      CarrierConfirmComponent,
      initialModalState,
    );
  }
}
