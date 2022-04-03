import {
  BusPoint,
  BusPointRequestDto,
  BusPointResponseDto,
  BusPointTypeByBusPointResponseDto,
  BusPointWithPage,
  BusPointsResponseDto,
  BusPointsWithPage,
} from '@modules/buspoints/models/buspoint.model';
import { PageData, initialPageData } from '@helpers/page-data';
import {
  catchError,
  from,
  map,
  mergeMap,
  of,
  retry,
  switchMap,
  tap,
} from 'rxjs';
import { BehaviorSubjectItem } from '@helpers/behavior-subject-item';
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

  constructor(private http: HttpClient) {
    super();
    this.fetch();
  }

  fetch(): void {
    this.http
      .get<BusPointsResponseDto>(this.apiUrl)
      .pipe(
        tap(() => (this.loading.value = true)),
        map((val): BusPointsWithPage | null => {
          if (val == null) return null;
          const { _embedded, page } = val;
          const bps: Array<BusPoint> = _embedded?.busPoints?.map(dto => ({
            id: dto.id,
            name: dto.name,
            address: dto.address,
            href: dto._links?.self.href,
            busPointType: {
              id: -1,
              name: '',
              href: dto._links?.busPointType?.href,
            },
          }));
          return {
            busPoints: bps,
            page,
          };
        }),

        switchMap(({ busPoints, page }) =>
          from(busPoints).pipe(
            mergeMap(bp =>
              this.http
                .get<BusPointTypeByBusPointResponseDto>(bp.busPointType.href)
                .pipe(
                  map(
                    (val): BusPoint => ({
                      ...bp,
                      busPointType: {
                        id: val.id,
                        name: val.name,
                        href: val._links?.self.href,
                      },
                    }),
                  ),
                  catchError(() => of(false).pipe(map(() => bp))),
                  map(
                    (val: BusPoint): BusPointWithPage => ({
                      busPoint: val,
                      page,
                    }),
                  ),
                ),
            ),
          ),
        ),
        map(v => v),

        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(data => this.setBusPointData(data));
  }

  setBusPointData(value: BusPointWithPage): void {
    const { busPoint, page } = value ?? {
      busPoint: null,
      page: null,
    };

    if (busPoint) this.busPointData.value.push(busPoint);
    this.busPointData.value.sort((a, b) => a.id - b.id);

    if (page) {
      this.pageData.value = page;
    }
  }

  getOne(id: string): BusPoint {
    if (id == null) return null;
    const idNum = Number(id);
    return this.busPointData.value.find(bp => bp.id === idNum);
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

  appendBusPointDataItem(_value: BusPointResponseDto): void {
    // this.bptStoreService.busPointTypeData.value$
    //   .pipe(
    //     mergeMap(bpts => bpts),
    //     filter(bpt => bpt.href === value._links?.busPoint?.href),
    //   )
    //   .subscribe(val => {
    //     if (val == null) return;
    //     this.busPointData.value.push({
    //       id: value.id,
    //       name: value.name,
    //       address: value.address,
    //       href: value._links?.self?.href,
    //       busPointType: { ...val },
    //     });
    //     this.busPointData.value.sort((a, b) => a.id - b.id);
    //   });
  }

  edit(busPoint: BusPoint): void {
    const dto = {
      name: busPoint.name,
      address: busPoint.address,
      busPointType: busPoint.busPointType.href,
    } as BusPointRequestDto;
    this.http
      .patch<BusPointResponseDto>(busPoint.href, dto)
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(data => this.setButPointDataItem(data));
  }

  setButPointDataItem(_value: BusPointResponseDto): void {
    // this.bptStoreService.busPointTypeData.value$
    //   .pipe(
    //     mergeMap(bpts => bpts),
    //     filter(bpt => bpt.href === value._links?.busPoint?.href),
    //   )
    //   .subscribe(val => {
    //     if (val == null) return;
    //     const itemIndex = this.busPointData.value.findIndex(
    //       v => v.id === value.id,
    //     );
    //     if (itemIndex === -1) return;
    //     this.busPointData.value.splice(itemIndex, 1, {
    //       id: value.id,
    //       name: value.name,
    //       address: value.address,
    //       href: value._links?.self?.href,
    //       busPointType: { ...val },
    //     });
    //     this.busPointData.value.sort((a, b) => a.id - b.id);
    //   });
  }

  deleteOne(busPoint: BusPoint): void {
    this.http
      .delete<BusPointResponseDto>(busPoint.href)
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(() => this.removeButPointDataItem(busPoint));
  }

  removeButPointDataItem(value: BusPoint): void {
    const itemIndex = this.busPointData.value.findIndex(v => v.id === value.id);
    if (itemIndex === -1) return;

    this.busPointData.value.splice(itemIndex, 1);
    this.busPointData.value.sort((a, b) => a.id - b.id);
  }
}
