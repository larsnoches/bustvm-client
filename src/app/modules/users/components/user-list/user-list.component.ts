import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GetUserResponseDto } from '@modules/users/models/user.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';
import { UserStoreService } from '@modules/users/services/user/user-store.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Output() deleteItemHandler: EventEmitter<GetUserResponseDto> =
    new EventEmitter<GetUserResponseDto>();
  userListData$: Observable<Array<GetUserResponseDto>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;
  bsModalRef?: BsModalRef;

  constructor(private userService: UserStoreService) {
    this.userListData$ = userService.userListData.value$;
    this.pageData$ = userService.pageData.value$;
    this.loading$ = userService.loading.value$;

    userService.getUsers();
  }

  deleteOne(user: GetUserResponseDto): void {
    console.log(user);
    this.deleteItemHandler.emit(user);
  }
}
