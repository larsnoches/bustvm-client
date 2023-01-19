import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusTripStoreService } from '@modules/bustrips/services/bustrip/bustrip-store.service';
import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';
import { GetSeatResponseDto } from '@modules/seats/models/seat.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';
import { SeatConfirmComponent } from '../seat-confirm/seat-confirm.component';
import { SeatStoreService } from '@modules/seats/services/seat/seat-store.service';

@Component({
  selector: 'app-seats-page',
  templateUrl: './seats-page.component.html',
  styleUrls: ['./seats-page.component.scss'],
})
export class SeatsPageComponent implements OnInit {
  bsModalRef?: BsModalRef;
  busTrip?: GetBusTripResponseDto;
  pageData$: Observable<PageData>;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private busTripService: BusTripStoreService,
    private seatService: SeatStoreService,
  ) {
    this.pageData$ = seatService.pageData.value$;
  }

  ngOnInit(): void {
    const busTripIdString = this.route.snapshot.paramMap.get('busTripId');
    if (busTripIdString == null) return;
    const busTripId = Number.parseInt(busTripIdString, 10);
    this.busTrip = this.busTripService.listData.value.find(
      val => val.id === busTripId,
    );
    if (this.busTrip == null) {
      this.busTrip = {
        id: busTripId,
      } as GetBusTripResponseDto;
    }
  }

  onDeleteItemBtnClick(seat: GetSeatResponseDto): void {
    const initialModalState: ModalOptions = {
      initialState: {
        seat,
      },
    };
    this.bsModalRef = this.modalService.show(
      SeatConfirmComponent,
      initialModalState,
    );
  }

  loadNext(): void {
    const pageNumber = this.seatService.pageData.value.number + 1;
    this.seatService.getSeatsByBusTripId(this.busTrip?.id, pageNumber);
  }
}
