import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-shared-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  @Input() caption?: string;
  @Input() confirmBtnCaption?: string;
  @Input() declineBtnCaption?: string;
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
