import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BusStoreService } from '@modules/buses/services/bus/bus-store.service';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { GetBusResponseDto } from '@modules/buses/models/bus.model';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss'],
})
export class BusListComponent implements OnInit {
  @Output() deleteItemHandler: EventEmitter<GetBusResponseDto> =
    new EventEmitter<GetBusResponseDto>();
  busListData$: Observable<Array<GetBusResponseDto>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;
  bsModalRef?: BsModalRef;
  carrier?: GetCarrierResponseDto;

  constructor(
    private route: ActivatedRoute,
    private busService: BusStoreService,
    private carrierService: CarrierStoreService,
  ) {
    this.busListData$ = busService.listData.value$;
    this.pageData$ = busService.pageData.value$;
    this.loading$ = busService.loading.value$;
  }

  ngOnInit(): void {
    const carrierId = this.route.snapshot.paramMap.get('carrierId');
    if (carrierId != null) {
      const carrierIdInt = Number.parseInt(carrierId, 10);
      this.busService.getListByCarrierId(carrierIdInt);
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

  deleteOne(bus: GetBusResponseDto): void {
    this.deleteItemHandler.emit(bus);
  }
}
