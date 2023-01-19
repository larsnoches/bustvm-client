import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-carrier-list',
  templateUrl: './carrier-list.component.html',
  styleUrls: ['./carrier-list.component.scss'],
})
export class CarrierListComponent {
  @Output() deleteItemHandler: EventEmitter<GetCarrierResponseDto> =
    new EventEmitter<GetCarrierResponseDto>();
  carrierListData$: Observable<Array<GetCarrierResponseDto>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;
  bsModalRef?: BsModalRef;

  constructor(private carrierService: CarrierStoreService) {
    this.carrierListData$ = carrierService.listData.value$;
    this.pageData$ = carrierService.pageData.value$;
    this.loading$ = carrierService.loading.value$;

    this.carrierService.getList(0);
  }

  deleteOne(carrier: GetCarrierResponseDto): void {
    this.deleteItemHandler.emit(carrier);
  }
}
