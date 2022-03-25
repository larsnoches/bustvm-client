import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusPointTypeConfirmComponent } from '@modules/buspoint-types/components/buspoint-type-confirm/buspoint-type-confirm.component';
import { BusPointTypeDialogComponent } from '@modules/buspoint-types/components';
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
