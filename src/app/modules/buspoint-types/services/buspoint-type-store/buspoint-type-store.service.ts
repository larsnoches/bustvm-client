import {
  BusPointType,
  BusPointTypeRequestDto,
  BusPointTypeResponseDto,
} from '@modules/buspoint-types/models/buspoint-type.model';
import { catchError, retry, tap } from 'rxjs';
import { BehaviorSubjectItem } from '@helpers/behavior-subject-item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThrowableService } from '@helpers/throwable-http-service';
import { config } from '@helpers/config';

@Injectable({
  providedIn: 'root',
})
export class BusPointTypeStoreService extends ThrowableService {
  loading = new BehaviorSubjectItem(false);
  busPointTypeData = new BehaviorSubjectItem<Array<BusPointType>>([]);
  private apiUrl = `${config.apiPath}/busPointTypes`;

  constructor(private http: HttpClient) {
    super();
    this.fetch();
  }

  fetch() {
    this.http
      .get<Array<BusPointType>>(this.apiUrl)
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(data => this.setBusPointTypeData(data));
  }

  setBusPointTypeData(value: Array<BusPointType>) {
    this.busPointTypeData.value = value;
  }

  create(busPointTypeDto: BusPointTypeRequestDto) {
    this.http.post<BusPointTypeResponseDto>(this.apiUrl, busPointTypeDto).pipe(
      tap(() => (this.loading.value = true)),
      retry(3),
      catchError(er => {
        this.loading.value = false;
        return this.handleError(er);
      }),
      tap(() => (this.loading.value = false)),
    );
  }
}
