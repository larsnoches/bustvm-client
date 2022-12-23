import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { FareStoreService } from '@modules/fares/services/fare/fare-store.service';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';
import { GetFareResponseDto } from '@modules/fares/models/fare.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-fare-list',
  templateUrl: './fare-list.component.html',
  styleUrls: ['./fare-list.component.scss'],
})
export class FareListComponent implements OnInit {
  @Output() deleteItemHandler: EventEmitter<GetFareResponseDto> =
    new EventEmitter<GetFareResponseDto>();
  fareListData$: Observable<Array<GetFareResponseDto>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;
  bsModalRef?: BsModalRef;
  carrier?: GetCarrierResponseDto;

  constructor(
    private route: ActivatedRoute,
    private fareService: FareStoreService,
    private carrierService: CarrierStoreService,
  ) {
    this.fareListData$ = fareService.listData.value$;
    this.pageData$ = fareService.pageData.value$;
    this.loading$ = fareService.loading.value$;
  }

  ngOnInit(): void {
    const carrierId = this.route.snapshot.paramMap.get('carrierId');
    if (carrierId != null) {
      const carrierIdInt = Number.parseInt(carrierId, 10);
      this.fareService.getListByCarrierId(carrierIdInt, 0);
      this.carrier = this.carrierService.listData.value.find(
        val => val.id === carrierIdInt,
      );
      if (this.carrier == null) {
        this.carrier = {
          id: carrierIdInt,
        } as GetCarrierResponseDto;
      }
    }
  }

  deleteOne(fare: GetFareResponseDto): void {
    this.deleteItemHandler.emit(fare);
  }
}
