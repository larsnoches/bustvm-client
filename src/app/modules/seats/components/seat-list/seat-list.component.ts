import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BusTripStoreService } from '@modules/bustrips/services/bustrip/bustrip-store.service';
import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';
import { GetSeatResponseDto } from '@modules/seats/models/seat.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';
import { SeatStoreService } from '@modules/seats/services/seat/seat-store.service';

@Component({
  selector: 'app-seat-list',
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.scss'],
})
export class SeatListComponent implements OnInit {
  @Output() deleteItemHandler: EventEmitter<GetSeatResponseDto> =
    new EventEmitter<GetSeatResponseDto>();
  seatListData$: Observable<Array<GetSeatResponseDto>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;
  bsModalRef?: BsModalRef;
  busTrip?: GetBusTripResponseDto;

  constructor(
    private route: ActivatedRoute,
    private seatService: SeatStoreService,
    private busTripService: BusTripStoreService,
  ) {
    this.seatListData$ = seatService.listData.value$;
    this.pageData$ = seatService.pageData.value$;
    this.loading$ = seatService.loading.value$;
  }

  ngOnInit(): void {
    const busTripId = this.route.snapshot.paramMap.get('busTripId');
    if (busTripId != null) {
      const busTripIdInt = Number.parseInt(busTripId, 10);
      this.seatService.getSeatsByBusTripId(busTripIdInt, 0);
      this.busTrip = this.busTripService.listData.value.find(
        val => val.id === busTripIdInt,
      );
      if (this.busTrip == null) {
        this.busTrip = {
          id: busTripIdInt,
        } as GetBusTripResponseDto;
      }
    }
  }

  deleteOne(seat: GetSeatResponseDto): void {
    this.deleteItemHandler.emit(seat);
  }
}
