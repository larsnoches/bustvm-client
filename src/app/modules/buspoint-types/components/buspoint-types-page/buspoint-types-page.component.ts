import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import {
  BusPointTypeConfirmComponent,
  BusPointTypeDialogComponent,
} from '@modules/buspoint-types/components';
import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buspoint-types-page',
  templateUrl: './buspoint-types-page.component.html',
  styleUrls: ['./buspoint-types-page.component.scss'],
})
export class BusPointTypesPageComponent {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  onOpenAddItemDialogBtnClick(): void {
    this.bsModalRef = this.modalService.show(BusPointTypeDialogComponent);
  }

  onEditItemBtnClick(busPointType: BusPointType): void {
    const initialModalState: ModalOptions = {
      initialState: {
        busPointType,
      },
    };
    this.bsModalRef = this.modalService.show(
      BusPointTypeDialogComponent,
      initialModalState,
    );
  }

  onDeleteItemBtnClick(busPointType: BusPointType): void {
    const initialModalState: ModalOptions = {
      initialState: {
        busPointType,
      },
    };
    this.bsModalRef = this.modalService.show(
      BusPointTypeConfirmComponent,
      initialModalState,
    );
  }
}
