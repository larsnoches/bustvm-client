import {
  BusPoint,
  BusPointRequestDto,
  BusPointResponseDto,
  BusPointsResponseDto,
  BusPointsWithBusPointTypesAndPage,
  BusPointsWithPage,
} from '@modules/buspoints/models/buspoint.model';
import { PageData, initialPageData } from '@helpers/page-data';
import {
  catchError,
  combineLatestWith,
  filter,
  from,
  map,
  mergeMap,
  of,
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
import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';

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
    // this.bptStoreService.busPointTypeData.value$.pipe(
    //   map(v => v),
    // ).subscribe(data => this.setBusPointData(data));

    // this.bptStoreService.loading.value$.pipe(
    //   combi

    // ).subscribe(data => this.setBusPointData(data));

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
          // return [bps, page];
          return {
            busPoints: bps,
            page,
          };
        }),
        combineLatestWith(this.bptStoreService.busPointTypeData.value$),
        // map(([busPointsWithPage, busPointTypes]) => {
        //   const { busPoints, page } = busPointsWithPage;
        //   const bps = busPoints.map(val => {
        //     if (val == null) return val;
        //     const bpt = busPointTypes.find(b => {
        //       if (val.busPointType == null) return false;
        //       return b.id === val.busPointType?.id;
        //       // return b.href === val.busPointType?.href;
        //     });
        //     if (bpt == null) return val;
        //     val.busPointType = { ...bpt };
        //     return val;
        //   });
        //   return {
        //     busPoints: bps,
        //     page,
        //   };
        // }),
        // switchMap(({ busPoints, page }) =>
        //   from(busPoints).pipe(
        //     mergeMap(_bp =>
        //       this.bptStoreService.busPointTypeData.value$.pipe(
        //         map(
        //           (val): BusPointsWithBusPointTypesAndPage => ({
        //             busPointTypes: val,
        //             busPoints,
        //             page,
        //           }),
        //         ),
        //       ),
        //     ),
        //   ),
        // ),
        // map(({ busPointTypes, busPoints, page }): BusPointsWithPage => {
        //   const bps = busPoints.map(val => {
        //     if (val == null) return val;
        //     const bpt = busPointTypes.find(b => {
        //       if (val.busPointType == null) return false;
        //       return b.id === val.busPointType?.id;
        //     });
        //     if (bpt == null) return val;
        //     val.busPointType = { ...bpt };
        //     return val;
        //   });
        //   return {
        //     busPoints: bps,
        //     page,
        //   };
        // }),

        // map(([dto, busPointTypes]): [Array<BusPoint>, PageData] | null => {
        //   if (dto == null) return null;
        //   const [busPoints, page] = dto;
        //   if (busPoints == null) return [[], page];
        //   const bps = busPoints.map(val => {
        //     if (val == null) return val;
        //     const bpt = busPointTypes.find(b => {
        //       if (val.busPointType == null) return false;
        //       return b.id === val.busPointType?.id;
        //       // return b.href === val.busPointType?.href;
        //     });
        //     if (bpt == null) return val;
        //     val.busPointType = { ...bpt };
        //     return val;
        //   });
        //   return [bps, page];
        // }),

        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      // .subscribe(data => console.log(data));
      .subscribe(
        // () => {
        //   //
        // },
        // () => {
        //   //
        // },
        data => this.setBusPointData(data),
      );
  }

  // setBusPointData(value: [BusPointsWithPage, Array<BusPointType>]): void {
  setBusPointData(value): void {
    console.log(JSON.stringify(value));
    // const [busPointsWithPage, busPointTypes] = value;
    // const { busPoints, page } = busPointsWithPage ?? {
    //   busPoints: null,
    //   page: null,
    // };
    // const bps = busPoints?.map(val => {
    //   if (val == null) return val;
    //   const bpt = busPointTypes?.find(b => {
    //     if (val.busPointType == null) return false;
    //     return b.id === val.busPointType?.id;
    //   });
    //   if (bpt == null) return val;
    //   val.busPointType = { ...bpt };
    //   return val;
    // });

    // if (bps != null) {
    //   this.busPointData.value = bps;
    //   this.busPointData.value.sort((a, b) => a.id - b.id);
    // }

    // if (page) {
    //   this.pageData.value = page;
    // }
  }

  // setBusPointData(value: [Array<BusPoint>, PageData]): void {
  //   const [bps, page] = value;
  //   if (bps != null) {
  //     this.busPointData.value = bps;
  //     this.busPointData.value.sort((a, b) => a.id - b.id);
  //   }

  //   if (page) {
  //     this.pageData.value = page;
  //   }
  // }

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

  setButPointDataItem(value: BusPointResponseDto): void {
    this.bptStoreService.busPointTypeData.value$
      .pipe(
        mergeMap(bpts => bpts),
        filter(bpt => bpt.href === value._links?.busPoint?.href),
      )
      .subscribe(val => {
        if (val == null) return;

        const itemIndex = this.busPointData.value.findIndex(
          v => v.id === value.id,
        );
        if (itemIndex === -1) return;

        this.busPointData.value.splice(itemIndex, 1, {
          id: value.id,
          name: value.name,
          address: value.address,
          href: value._links?.self?.href,
          busPointType: { ...val },
        });
        this.busPointData.value.sort((a, b) => a.id - b.id);
      });
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
