import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  title?: string;
  applyBtnCaption?: string;
  cancelBtnCaption?: string;

  constructor(public bsModalRef: BsModalRef) {}
}
