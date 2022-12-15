import { Component } from '@angular/core';
import { UserStoreService } from '@modules/users/services/user/user-store.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  // @Output() deleteItemHandler: EventEmitter<BusPoint> =
  //   new EventEmitter<BusPoint>();
  // busPointData$: Observable<Array<BusPoint>>;
  // pageData$: Observable<PageData>;
  // loading$: Observable<boolean>;
  // bsModalRef?: BsModalRef;

  constructor(private userService: UserStoreService) {
    // this.busPointData$ = busPointService.busPointData.value$;
    // this.pageData$ = busPointService.pageData.value$;
    // this.loading$ = busPointService.loading.value$;
  }

  // deleteOne(busPoint: BusPoint): void {
  //   this.deleteItemHandler.emit(busPoint);
  // }
}
