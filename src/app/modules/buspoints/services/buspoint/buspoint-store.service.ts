import {
  BusPoint,
  BusPointRequestDto,
  BusPointResponseDto,
  BusPointsResponseDto,
} from '@modules/buspoints/models/buspoint.model';
import { PageData, initialPageData } from '@helpers/page-data';
import {
  catchError,
  combineLatestWith,
  filter,
  iif,
  map,
  mergeMap,
  retry,
  switchMap,
  tap,
} from 'rxjs';
import { BehaviorSubjectItem } from '@helpers/behavior-subject-item';
import { BusPointTypeStoreService } from '@modules/buspoint-types/services/buspoint-type-store/buspoint-type-store.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThrowableService } from '@helpers/throwable-http-service';
import { config } from '@helpers/config';

@Injectable({
  providedIn: 'root',
})
export class BusPointStoreService extends ThrowableService {
  loading = new BehaviorSubjectItem(false);
  busPointData = new BehaviorSubjectItem<Array<BusPoint>>([]);
  pageData = new BehaviorSubjectItem<PageData>(initialPageData());
  public apiUrl = `${config.apiPath}/busPoints`;

  constructor(
    private bptStoreService: BusPointTypeStoreService,
    private http: HttpClient,
  ) {
    super();
    this.fetch();
  }

  fetch(): void {
    this.http
      .get<BusPointsResponseDto>(this.apiUrl)
      .pipe(
        tap(() => (this.loading.value = true)),
        map((val): [Array<BusPoint>, PageData] | null => {
          if (val == null) return null;
          const { _embedded, page } = val;
          if (_embedded == null) return [[], page];
          const bps = _embedded?.busPoints?.map(dto => ({
            id: dto.id,
            name: dto.name,
            address: dto.address,
            href: dto._links?.self.href,
          }));
          return [bps, page];
        }),
        combineLatestWith(this.bptStoreService.busPointTypeData.value$),
        map(([dto, busPointTypes]): [Array<BusPoint>, PageData] | null => {
          if (dto == null) return null;
          const [busPoints, page] = dto;
          if (busPoints == null) return [[], page];
          const bps = busPoints.map(val => {
            const bpt = busPointTypes.find(
              b => b.href === val.busPointType.href,
            );
            if (bpt == null) return val;
            val.busPointType = { ...bpt };
            return val;
          });
          return [bps, page];
        }),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(data => this.setBusPointData(data));
  }

  setBusPointData(value: [Array<BusPoint>, PageData]): void {
    const [bps, page] = value;
    if (bps != null) {
      this.busPointData.value = bps;
      this.busPointData.value.sort((a, b) => a.id - b.id);
    }

    if (page) {
      this.pageData.value = page;
    }
  }

  create(busPointDto: BusPointRequestDto): void {
    this.http
      .post<BusPointResponseDto>(this.apiUrl, busPointDto)
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(data => this.appendBusPointDataItem(data));
  }

  appendBusPointDataItem(value: BusPointResponseDto): void {
    this.bptStoreService.busPointTypeData.value$
      .pipe(
        mergeMap(bpts => bpts),
        filter(bpt => bpt.href === value._links?.busPoint?.href),
      )
      .subscribe(val => {
        if (val == null) return;
        this.busPointData.value.push({
          id: value.id,
          name: value.name,
          address: value.address,
          href: value._links?.self?.href,
          busPointType: { ...val },
        });
        this.busPointData.value.sort((a, b) => a.id - b.id);
      });
  }
}
