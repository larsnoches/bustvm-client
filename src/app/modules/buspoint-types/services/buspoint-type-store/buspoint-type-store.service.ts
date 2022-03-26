import {
  BusPointType,
  BusPointTypeRequestDto,
  BusPointTypeResponseDto,
  BusPointTypeWithBusPoints,
  BusPointTypeWithBusPointsPage,
  BusPointTypesResponseDto,
  BusPointsByTypeResponseDto,
} from '@modules/buspoint-types/models/buspoint-type.model';
import { PageData, initialPageData } from '@helpers/page-data';
import { catchError, from, map, mergeMap, retry, switchMap, tap } from 'rxjs';
import { BehaviorSubjectItem } from '@helpers/behavior-subject-item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThrowableService } from '@helpers/throwable-http-service';
import { config } from '@helpers/config';
// import { BusPoint } from '@modules/buspoints/models/buspoint.model';

@Injectable({
  providedIn: 'root',
})
export class BusPointTypeStoreService extends ThrowableService {
  loading = new BehaviorSubjectItem(false);
  busPointTypeData = new BehaviorSubjectItem<Array<BusPointType>>([]);
  pageData = new BehaviorSubjectItem<PageData>(initialPageData());
  public apiUrl = `${config.apiPath}/busPointTypes`;

  constructor(private http: HttpClient) {
    super();
    this.fetch();
  }

  fetch(): void {
    this.http
      .get<BusPointTypesResponseDto>(this.apiUrl)
      .pipe(
        tap(() => (this.loading.value = true)),

        map((val): [Array<BusPointType>, PageData] | null => {
          if (val == null) return null;
          const { _embedded, page } = val;
          if (_embedded == null) return [[], page];
          const bpts: Array<BusPointType> = _embedded?.busPointTypes?.map(
            dto => ({
              id: dto.id,
              name: dto.name,
              href: dto._links?.self?.href,
              busPoints: dto._links?.busPoints?.href,
            }),
          );
          return [bpts, page];
        }),
        switchMap(([bpts, page]) =>
          from(bpts).pipe(
            mergeMap(bpt =>
              this.http
                .get<BusPointsByTypeResponseDto>(bpt.busPoints as string)
                .pipe(
                  map(
                    (val): BusPointTypeWithBusPoints => ({
                      busPointType: bpt,
                      busPointsByTypeResponseDto: val,
                    }),
                  ),
                ),
            ),
            map(
              (val): BusPointTypeWithBusPointsPage => ({
                busPointType: val?.busPointType,
                busPointsByTypeResponseDto: val?.busPointsByTypeResponseDto,
                page,
              }),
            ),
          ),
        ),

        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(data => this.setBusPointTypeData(data));
  }

  setBusPointTypeData(value: BusPointTypeWithBusPointsPage): void {
    const { busPointType, busPointsByTypeResponseDto, page } = value ?? {
      busPointType: null,
      busPointsByTypeResponseDto: null,
      page: null,
    };
    const { _embedded } = busPointsByTypeResponseDto ?? { _embedded: null };
    if (_embedded != null) {
      this.busPointTypeData.value.push({
        ...busPointType,
        busPoints: _embedded.busPoints?.map(dto => ({
          id: dto.id,
          name: dto.name,
          address: dto.address,
          href: dto._links?.self.href,
        })),
      });
    }
    this.busPointTypeData.value.sort((a, b) => a.id - b.id);

    if (page) {
      this.pageData.value = page;
    }
  }

  // setBusPointTypeData(value: BusPointTypesResponseDto): void {
  //   const { _embedded, page } = value;
  //   if (_embedded != null) {
  //     this.busPointTypeData.value = _embedded.busPointTypes?.map(dto => ({
  //       id: dto.id,
  //       name: dto.name,
  //       href: dto._links?.self.href,
  //     }));
  //   }
  //   this.busPointTypeData.value.sort((a, b) => a.id - b.id);

  //   if (page) {
  //     this.pageData.value = page;
  //   }
  // }

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

  deleteOne(busPointType: BusPointType): void {
    this.http
      .delete(busPointType.href)
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(() => this.removeBusPointTypeDataItem(busPointType));
  }

  removeBusPointTypeDataItem(value: BusPointType): void {
    const itemIndex = this.busPointTypeData.value.findIndex(
      v => v.id === value.id,
    );
    if (itemIndex === -1) return;

    this.busPointTypeData.value.splice(itemIndex, 1);
    this.busPointTypeData.value.sort((a, b) => a.id - b.id);
  }
}
