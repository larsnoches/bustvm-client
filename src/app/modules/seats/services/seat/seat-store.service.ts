import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, retry, tap } from 'rxjs';
import {
  BasicSeatRequestDto as T,
  GetSeatResponseDto as U,
} from '@modules/seats/models/seat.model';
import { Pageable } from '@helpers/page-data';
import { StoreService } from '@helpers/store.service';
import { config } from '@helpers/config';

@Injectable({
  providedIn: 'root',
})
export class SeatStoreService extends StoreService<T, U> {
  constructor(protected injector: Injector) {
    super(injector);
    super.apiUrl = `${config.apiPath}/seats`;
  }

  getSeats(
    busTripId: number,
    busId: number,
    departureDateString: string,
    departureTimeString: string,
  ): Observable<Array<U>> {
    const params = {
      busId,
      departureDateString,
      departureTimeString,
    };
    const getSeatsUrl = `${this.apiUrl}/busTrip/${busTripId}/list`;

    return this.http.get<Array<U>>(getSeatsUrl, { params }).pipe(
      tap(() => (this.loading.value = true)),
      retry(3),
      catchError(er => {
        this.loading.value = false;
        return this.handleError(er);
      }),
      tap(() => (this.loading.value = false)),
    );
  }

  getSeatsByBusTripId(busTripId: number, pageNumber?: number | null): void {
    let params = {
      page: pageNumber ?? 0,
      size: this.pageData.value.size,
      sort: 'id',
    };
    if (pageNumber == null) params = null;
    const getSeatsUrl = `${this.apiUrl}/busTrip/${busTripId}`;

    this.http
      .get<Pageable<U>>(getSeatsUrl, { params })
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe({
        next: data => super.updateListAndPageData(data),
        complete: () => (this.loading.value = false),
      });
  }
}
