import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Carrier } from '@modules/carriers/models/carrier.model';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-carriers-list',
  templateUrl: './carrier-list.component.html',
  styleUrls: ['./carrier-list.component.scss'],
})
export class CarrierListComponent {
  @Output() deleteItemHandler: EventEmitter<Carrier> =
    new EventEmitter<Carrier>();
  carrierData$: Observable<Array<Carrier>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;
  bsModalRef?: BsModalRef;

  constructor(private carrierService: CarrierStoreService) {
    this.carrierData$ = carrierService.carrierData.value$;
    this.pageData$ = carrierService.pageData.value$;
    this.loading$ = carrierService.loading.value$;
  }

  deleteOne(carrier: Carrier): void {
    this.deleteItemHandler.emit(carrier);
  }
}
