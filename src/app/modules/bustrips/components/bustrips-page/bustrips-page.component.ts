import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusTripConfirmComponent } from '../bustrip-confirm/bustrip-confirm.component';
import { BusTripStoreService } from '@modules/bustrips/services/bustrip/bustrip-store.service';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-bustrips-page',
  templateUrl: './bustrips-page.component.html',
  styleUrls: ['./bustrips-page.component.scss'],
})
export class BusTripsPageComponent implements OnInit {
  bsModalRef?: BsModalRef;
  carrier?: GetCarrierResponseDto;
  pageData$: Observable<PageData>;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private carrierService: CarrierStoreService,
    private busTripService: BusTripStoreService,
  ) {
    this.pageData$ = busTripService.pageData.value$;
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

  onDeleteItemBtnClick(busTrip: GetBusTripResponseDto): void {
    const initialModalState: ModalOptions = {
      initialState: {
        busTrip,
      },
    };
    this.bsModalRef = this.modalService.show(
      BusTripConfirmComponent,
      initialModalState,
    );
  }

  loadNext(): void {
    const pageNumber = this.busTripService.pageData.value.number + 1;
    this.busTripService.getListByCarrierId(this.carrier?.id, pageNumber);
  }
}
