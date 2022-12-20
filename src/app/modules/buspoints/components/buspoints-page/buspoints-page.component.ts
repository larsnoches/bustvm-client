import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BusPointConfirmComponent } from '../buspoint-confirm/buspoint-confirm.component';
import { Component } from '@angular/core';
import { GetBusPointResponseDto } from '@modules/buspoints/models/buspoint.model';

@Component({
  selector: 'app-buspoints-page',
  templateUrl: './buspoints-page.component.html',
  styleUrls: ['./buspoints-page.component.scss'],
})
export class BusPointsPageComponent {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  onDeleteItemBtnClick(busPoint: GetBusPointResponseDto): void {
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
