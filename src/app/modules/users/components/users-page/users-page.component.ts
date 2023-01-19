import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Component } from '@angular/core';
import { GetUserResponseDto } from '@modules/users/models/user.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';
import { UserConfirmComponent } from '../user-confirm/user-confirm.component';
import { UserStoreService } from '@modules/users/services/user/user-store.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent {
  bsModalRef?: BsModalRef;
  pageData$: Observable<PageData>;

  constructor(
    private modalService: BsModalService,
    private userService: UserStoreService,
  ) {
    this.pageData$ = userService.pageData.value$;
  }

  onDeleteItemBtnClick(user: GetUserResponseDto): void {
    const initialModalState: ModalOptions = {
      initialState: {
        user,
      },
    };
    this.bsModalRef = this.modalService.show(
      UserConfirmComponent,
      initialModalState,
    );
  }

  loadNext(): void {
    const pageNumber = this.userService.pageData.value.number + 1;
    this.userService.getUsers(pageNumber);
  }
}
