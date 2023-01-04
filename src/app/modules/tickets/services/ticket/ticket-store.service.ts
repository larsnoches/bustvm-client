import {
  GetPayedTicketResponseDto,
  BasicTicketRequestDto as T,
  GetTicketResponseDto as U,
  UpdateTicketStatusAsPayedResponseDto,
} from '@modules/tickets/models/ticket.model';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, retry, tap } from 'rxjs';
import { Pageable } from '@helpers/page-data';
import { StoreService } from '@helpers/store.service';
import { config } from '@helpers/config';

@Injectable({
  providedIn: 'root',
})
export class TicketStoreService extends StoreService<T, U> {
  constructor(protected injector: Injector) {
    super(injector);
    super.apiUrl = `${config.apiPath}/tickets`;
  }

  createTicket(dto: T): Observable<UpdateTicketStatusAsPayedResponseDto> {
    const createUrl = `${this.apiUrl}/create`;
    return this.http
      .post<UpdateTicketStatusAsPayedResponseDto>(createUrl, dto)
      .pipe(
        tap(() => (this.loading.value = true)),
        // retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      );
  }

  getTicket(ticketId: number, email: string): Observable<U> {
    const params = {
      email,
    };
    const getTicketUrl = `${this.apiUrl}/${ticketId}`;
    return this.http.get<U>(getTicketUrl, { params }).pipe(
      tap(() => (this.loading.value = true)),
      retry(3),
      catchError(er => {
        this.loading.value = false;
        return this.handleError(er);
      }),
      tap(() => (this.loading.value = false)),
    );
  }

  // getQrCode(ticketId: number, value: string): Observable<U> {
  //   const params = {
  //     value,
  //   };
  //   const getTicketUrl = `${this.apiUrl}/${ticketId}/qrcode`;
  //   return this.http.get<U>(getTicketUrl, { params }).pipe(
  //     tap(() => (this.loading.value = true)),
  //     retry(3),
  //     catchError(er => {
  //       this.loading.value = false;
  //       return this.handleError(er);
  //     }),
  //     tap(() => (this.loading.value = false)),
  //   );
  // }

  getAllTickets(email: string, pageNumber?: number | null): void {
    let params: any = {
      email,
    };
    if (pageNumber != null) {
      params = {
        ...params,
        page: pageNumber ?? 0,
        size: this.pageData.value.size,
        sort: 'id',
      };
    }

    this.http
      .get<Pageable<U>>(this.apiUrl, { params })
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

  getPayedTicket(qrcode: string): Observable<GetPayedTicketResponseDto> {
    const params = {
      qrcode,
    };
    const getTicketUrl = `${this.apiUrl}/payed-ticket`;
    return this.http
      .get<GetPayedTicketResponseDto>(getTicketUrl, { params })
      .pipe(
        tap(() => (this.loading.value = true)),
        // retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      );
  }

  ticketReturn(ticketId: number): Observable<any> {
    const getTicketUrl = `${this.apiUrl}/${ticketId}/update-status/returned`;
    return this.http.get(getTicketUrl).pipe(
      tap(() => (this.loading.value = true)),
      // retry(3),
      catchError(er => {
        this.loading.value = false;
        return this.handleError(er);
      }),
      tap(() => (this.loading.value = false)),
    );
  }

  ticketChangeToWaitingToReturn(
    ticketId: number,
    email: string,
  ): Observable<any> {
    const params = {
      email,
    };
    const getTicketUrl = `${this.apiUrl}/${ticketId}/update-status/waiting-to-return`;
    return this.http.get(getTicketUrl, { params }).pipe(
      tap(() => (this.loading.value = true)),
      // retry(3),
      catchError(er => {
        this.loading.value = false;
        return this.handleError(er);
      }),
      tap(() => (this.loading.value = false)),
    );
  }
}
