import {
  BusPointType,
  BusPointTypeRequestDto,
  BusPointTypeResponseDto,
  BusPointTypesResponseDto,
} from '@modules/buspoint-types/models/buspoint-type.model';
import { PageData, initialPageData } from '@helpers/page-data';
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
  busPointTypeData = new BehaviorSubjectItem<Array<BusPointTypeResponseDto>>(
    [],
  );
  pageData = new BehaviorSubjectItem<PageData>(initialPageData());
  private apiUrl = `${config.apiPath}/busPointTypes`;

  constructor(private http: HttpClient) {
    super();
    this.fetch();
  }

  fetch() {
    this.http
      .get<BusPointTypesResponseDto>(this.apiUrl)
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

  setBusPointTypeData(value: BusPointTypesResponseDto) {
    const { _embedded, page } = value;
    if (_embedded != null) {
      this.busPointTypeData.value = _embedded.busPointTypes ?? [];
    }
    if (page) {
      this.pageData.value = page;
    }
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
