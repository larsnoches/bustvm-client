import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-shared-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Input() caption?: string;
  @Input() confirmBtnCaption?: string;
  @Input() declineBtnCaption?: string;
  @Input() formId?: string;
  @Input() buttonsDisabled?: boolean;
  @Output() confirmBtnClick: EventEmitter<any> = new EventEmitter();
  @Output() declineBtnClick: EventEmitter<any> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) {}

  confirmBtnClickHandler(): void {
    this.confirmBtnClick.emit();
  }

  declineBtnClickHandler(): void {
    this.declineBtnClick.emit();
  }
}
