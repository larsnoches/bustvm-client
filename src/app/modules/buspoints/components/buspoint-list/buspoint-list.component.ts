import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BusPointStoreService } from '@modules/buspoints/services/buspoint/buspoint-store.service';
import { GetBusPointResponseDto } from '@modules/buspoints/models/buspoint.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-buspoint-list',
  templateUrl: './buspoint-list.component.html',
  styleUrls: ['./buspoint-list.component.scss'],
})
export class BusPointListComponent {
  @Output() deleteItemHandler: EventEmitter<GetBusPointResponseDto> =
    new EventEmitter<GetBusPointResponseDto>();
  busPointListData$: Observable<Array<GetBusPointResponseDto>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;
  bsModalRef?: BsModalRef;

  constructor(private busPointService: BusPointStoreService) {
    this.busPointListData$ = busPointService.listData.value$;
    this.pageData$ = busPointService.pageData.value$;
    this.loading$ = busPointService.loading.value$;

    this.busPointService.getList();
  }

  deleteOne(busPoint: GetBusPointResponseDto): void {
    this.deleteItemHandler.emit(busPoint);
  }
}
