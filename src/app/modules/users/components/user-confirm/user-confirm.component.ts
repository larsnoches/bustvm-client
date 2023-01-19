import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component } from '@angular/core';
import { GetUserResponseDto } from '@modules/users/models/user.model';
import { UserStoreService } from '@modules/users/services/user/user-store.service';

@Component({
  selector: 'app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.scss'],
})
export class UserConfirmComponent {
  user?: GetUserResponseDto;

  constructor(
    private userService: UserStoreService,
    private bsModalRef: BsModalRef,
  ) {}

  onConfirmBtnClick(): void {
    if (this.user == null) {
      this.bsModalRef?.hide();
      return;
    }
    this.userService.removeUser(this.user.id);
    this.bsModalRef?.hide();
  }

  onDeclineBtnClick(): void {
    this.bsModalRef?.hide();
  }
}
