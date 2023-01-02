import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusConfirmComponent } from '../bus-confirm/bus-confirm.component';
import { BusStoreService } from '@modules/buses/services/bus/bus-store.service';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { GetBusResponseDto } from '@modules/buses/models/bus.model';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-buses-page',
  templateUrl: './buses-page.component.html',
  styleUrls: ['./buses-page.component.scss'],
})
export class BusesPageComponent implements OnInit {
  bsModalRef?: BsModalRef;
  carrier?: GetCarrierResponseDto;
  pageData$: Observable<PageData>;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private carrierService: CarrierStoreService,
    private busService: BusStoreService,
  ) {
    this.pageData$ = busService.pageData.value$;
  }

  ngOnInit(): void {
    const carrierIdString = this.route.snapshot.paramMap.get('carrierId');
    if (carrierIdString == null) return;
    const carrierId = Number.parseInt(carrierIdString, 10);
    this.carrier = this.carrierService.listData.value.find(
      val => val.id === carrierId,
    );
    if (this.carrier == null) {
      this.carrier = {
        id: carrierId,
      } as GetCarrierResponseDto;
    }
  }

  onDeleteItemBtnClick(bus: GetBusResponseDto): void {
    const initialModalState: ModalOptions = {
      initialState: {
        bus,
      },
    };
    this.bsModalRef = this.modalService.show(
      BusConfirmComponent,
      initialModalState,
    );
  }

  loadNext(): void {
    const pageNumber = this.busService.pageData.value.number + 1;
    this.busService.getListByCarrierId(this.carrier?.id, pageNumber);
  }
}
