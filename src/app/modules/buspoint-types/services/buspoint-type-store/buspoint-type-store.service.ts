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
  busPointTypeData = new BehaviorSubjectItem<Array<BusPointType>>([]);
  pageData = new BehaviorSubjectItem<PageData>(initialPageData());
  private apiUrl = `${config.apiPath}/busPointTypes`;

  constructor(private http: HttpClient) {
    super();
    this.fetch();
  }

  fetch(): void {
    this.http
      .get<BusPointTypesResponseDto>(this.apiUrl)
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => setTimeout(() => (this.loading.value = false), 1500)),
      )
      .subscribe(data =>
        setTimeout(() => this.setBusPointTypeData(data), 1500),
      );
  }

  setBusPointTypeData(value: BusPointTypesResponseDto): void {
    const { _embedded, page } = value;
    if (_embedded != null) {
      this.busPointTypeData.value = _embedded.busPointTypes?.map(dto => ({
        id: dto.id,
        name: dto.name,
        href: dto._links?.self.href,
      }));
    }
    this.busPointTypeData.value.sort((a, b) => a.id - b.id);

    if (page) {
      this.pageData.value = page;
    }
  }

  create(busPointTypeDto: BusPointTypeRequestDto): void {
    this.http
      .post<BusPointTypeResponseDto>(this.apiUrl, busPointTypeDto)
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(data => this.appendBusPointTypeDataItem(data));
  }

  appendBusPointTypeDataItem(value: BusPointTypeResponseDto): void {
    this.busPointTypeData.value.push({
      id: value.id,
      name: value.name,
      href: value._links?.self.href,
    });
    this.busPointTypeData.value.sort((a, b) => a.id - b.id);
  }

  edit(itemHref: string, busPointTypeDto: BusPointTypeRequestDto): void {
    this.http
      .patch<BusPointTypeResponseDto>(itemHref, busPointTypeDto)
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(data => this.setBusPointTypeDataItem(data));
  }

  setBusPointTypeDataItem(value: BusPointTypeResponseDto): void {
    const itemIndex = this.busPointTypeData.value.findIndex(
      v => v.id === value.id,
    );
    if (itemIndex === -1) return;

    this.busPointTypeData.value.splice(itemIndex, 1, {
      id: value.id,
      name: value.name,
      href: value._links?.self.href,
    });
    this.busPointTypeData.value.sort((a, b) => a.id - b.id);
  }

  deleteOne(itemHref: string): void {
    this.http.delete(itemHref).pipe(
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
