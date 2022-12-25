import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusTripStoreService } from '@modules/bustrips/services/bustrip/bustrip-store.service';
import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';
import { Observable } from 'rxjs';
import { PageData } from '@helpers/page-data';

@Component({
  selector: 'app-bustrip-search-list',
  templateUrl: './bustrip-search-list.component.html',
  styleUrls: ['./bustrip-search-list.component.scss'],
})
export class BusTripSearchListComponent {
  @Output() orderItemHandler: EventEmitter<GetBusTripResponseDto> =
    new EventEmitter<GetBusTripResponseDto>();
  busTripListData$: Observable<Array<GetBusTripResponseDto>>;
  pageData$: Observable<PageData>;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private busTripService: BusTripStoreService,
  ) {
    this.busTripListData$ = busTripService.listData.value$;
    this.pageData$ = busTripService.pageData.value$;
    this.loading$ = busTripService.loading.value$;
  }

  orderOne(busTrip: GetBusTripResponseDto): void {
    this.orderItemHandler.emit(busTrip);
  }
}
