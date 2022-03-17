import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-buspoint-types-page',
  templateUrl: './buspoint-types-page.component.html',
  styleUrls: ['./buspoint-types-page.component.scss'],
})
export class BusPointTypesPageComponent {
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    // this.message = 'Confirmed!';
    this.modalRef?.hide();
  }

  decline(): void {
    // this.message = 'Declined!';
    this.modalRef?.hide();
  }
}
