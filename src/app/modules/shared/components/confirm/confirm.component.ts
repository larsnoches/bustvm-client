import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  @Input() caption?: string;
  @Input() text?: string;
  @Input() confirmBtnCaption?: string;
  @Input() declineBtnCaption?: string;
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
