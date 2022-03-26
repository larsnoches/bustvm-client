import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BusPoint } from '@modules/buspoints/models/buspoint.model';
import { BusPointConfirmComponent } from '../buspoint-confirm/buspoint-confirm.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buspoints-page',
  templateUrl: './buspoints-page.component.html',
  styleUrls: ['./buspoints-page.component.scss'],
})
export class BusPointsPageComponent {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  onDeleteItemBtnClick(busPoint: BusPoint): void {
    const initialModalState: ModalOptions = {
      initialState: {
        busPoint,
      },
    };
    this.bsModalRef = this.modalService.show(
      BusPointConfirmComponent,
      initialModalState,
    );
  }
}
