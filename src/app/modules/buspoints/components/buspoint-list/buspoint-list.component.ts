import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BusPoint } from '@modules/buspoints/models/buspoint.model';
import { BusPointStoreService } from '@modules/buspoints/services/buspoint/buspoint-store.service';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-buspoint-list',
  templateUrl: './buspoint-list.component.html',
  styleUrls: ['./buspoint-list.component.scss'],
})
export class BusPointListComponent {
  @Output() deleteItemHandler: EventEmitter<BusPoint> =
    new EventEmitter<BusPoint>();
  busPointData$: Observable<Array<BusPoint>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;
  bsModalRef?: BsModalRef;

  constructor(private busPointService: BusPointStoreService) {
    this.busPointData$ = busPointService.busPointData.value$;
    this.pageData$ = busPointService.pageData.value$;
    this.loading$ = busPointService.loading.value$;
  }

  deleteOne(busPoint: BusPoint): void {
    this.deleteItemHandler.emit(busPoint);
  }
}
