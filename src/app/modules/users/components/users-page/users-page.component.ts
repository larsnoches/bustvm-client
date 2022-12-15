import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  // onDeleteItemBtnClick(busPoint: BusPoint): void {
  //   const initialModalState: ModalOptions = {
  //     initialState: {
  //       busPoint,
  //     },
  //   };
  //   this.bsModalRef = this.modalService.show(
  //     BusPointConfirmComponent,
  //     initialModalState,
  //   );
  // }
}
