import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-buspoint-type-list',
  templateUrl: './buspoint-type-list.component.html',
  styleUrls: ['./buspoint-type-list.component.scss'],
})
export class BusPointTypeListComponent {
  @Output() editItemHandler: EventEmitter<BusPointType> =
    new EventEmitter<BusPointType>();
  @Output() deleteItemHandler: EventEmitter<BusPointType> =
    new EventEmitter<BusPointType>();
  busPointTypesData$: Observable<Array<BusPointType>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;
  bsModalRef?: BsModalRef;

  constructor(private storeService: BusPointTypeStoreService) {
    this.busPointTypesData$ = storeService.busPointTypeData.value$;
    this.pageData$ = storeService.pageData.value$;
    this.loading$ = storeService.loading.value$;
  }

  editOne(busPointType: BusPointType): void {
    this.editItemHandler.emit(busPointType);
  }

  deleteOne(busPointType: BusPointType): void {
    this.deleteItemHandler.emit(busPointType);
  }
}
