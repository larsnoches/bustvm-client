import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, TemplateRef } from '@angular/core';
// import { DialogComponent } from '@modules/shared/components';

@Component({
  selector: 'app-buspoint-types-page',
  templateUrl: './buspoint-types-page.component.html',
  styleUrls: ['./buspoint-types-page.component.scss'],
})
export class BusPointTypesPageComponent {
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  // openModal(template: TemplateRef<any>): void {
  //   this.modalRef = this.modalService.show(template);
  // }

  openAddDialog(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
    // this.modalRef.content
  }

  onConfirmAddBtnClick(): void {
    // this.message = 'Confirmed!';
    this.modalRef?.hide();
  }

  onDeclineBtnClick(): void {
    // this.message = 'Declined!';
    this.modalRef?.hide();
  }
}
