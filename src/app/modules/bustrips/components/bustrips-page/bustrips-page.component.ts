import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusTripConfirmComponent } from '../bustrip-confirm/bustrip-confirm.component';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';

@Component({
  selector: 'app-bustrips-page',
  templateUrl: './bustrips-page.component.html',
  styleUrls: ['./bustrips-page.component.scss'],
})
export class BusTripsPageComponent implements OnInit {
  bsModalRef?: BsModalRef;
  carrier?: GetCarrierResponseDto;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private carrierService: CarrierStoreService,
  ) {}

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
}
