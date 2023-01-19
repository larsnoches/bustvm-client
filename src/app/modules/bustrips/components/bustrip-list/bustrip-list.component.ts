import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BusTripStoreService } from '@modules/bustrips/services/bustrip/bustrip-store.service';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-bustrip-list',
  templateUrl: './bustrip-list.component.html',
  styleUrls: ['./bustrip-list.component.scss'],
})
export class BusTripListComponent implements OnInit {
  @Output() deleteItemHandler: EventEmitter<GetBusTripResponseDto> =
    new EventEmitter<GetBusTripResponseDto>();
  busTripListData$: Observable<Array<GetBusTripResponseDto>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;
  bsModalRef?: BsModalRef;
  carrier?: GetCarrierResponseDto;

  constructor(
    private route: ActivatedRoute,
    private busTripService: BusTripStoreService,
    private carrierService: CarrierStoreService,
  ) {
    this.busTripListData$ = busTripService.listData.value$;
    this.pageData$ = busTripService.pageData.value$;
    this.loading$ = busTripService.loading.value$;
  }

  ngOnInit(): void {
    const carrierId = this.route.snapshot.paramMap.get('carrierId');
    if (carrierId != null) {
      const carrierIdInt = Number.parseInt(carrierId, 10);
      this.busTripService.getListByCarrierId(carrierIdInt);
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

  deleteOne(busTrip: GetBusTripResponseDto): void {
    this.deleteItemHandler.emit(busTrip);
  }
}
