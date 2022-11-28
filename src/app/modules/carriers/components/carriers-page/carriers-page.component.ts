import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Carrier } from '@modules/carriers/models/carrier.model';
import { CarrierConfirmComponent } from '../carrier-confirm/carrier-confirm.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buspoints-page',
  templateUrl: './carriers-page.component.html',
  styleUrls: ['./carriers-page.component.scss'],
})
export class CarriersPageComponent {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  onDeleteItemBtnClick(carrier: Carrier): void {
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
