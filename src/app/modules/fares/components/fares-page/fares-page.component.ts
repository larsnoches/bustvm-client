import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrierStoreService } from '@modules/carriers/services/carrier/carrier-store.service';
import { FareConfirmComponent } from '../fare-confirm/fare-confirm.component';
import { GetCarrierResponseDto } from '@modules/carriers/models/carrier.model';
import { GetFareResponseDto } from '@modules/fares/models/fare.model';

@Component({
  selector: 'app-fares-page',
  templateUrl: './fares-page.component.html',
  styleUrls: ['./fares-page.component.scss'],
})
export class FaresPageComponent implements OnInit {
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

  onDeleteItemBtnClick(fare: GetFareResponseDto): void {
    const initialModalState: ModalOptions = {
      initialState: {
        fare,
      },
    };
    this.bsModalRef = this.modalService.show(
      FareConfirmComponent,
      initialModalState,
    );
  }
}
