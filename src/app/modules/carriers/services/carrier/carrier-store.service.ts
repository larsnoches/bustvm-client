import { Bus, BusesResponseDto } from '@modules/buses/models/bus.model';
import {
  Carrier,
  CarrierWithPage,
  CarriersResponseDto,
  CarriersWithPage,
} from '@modules/carriers/models/carrier.model';
import { Fare, FaresResponseDto } from '@modules/fares/models/fare.model';
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
export class CarrierStoreService extends ThrowableService {
  loading = new BehaviorSubjectItem(false);
  carrierData = new BehaviorSubjectItem<Array<Carrier>>([]);
  pageData = new BehaviorSubjectItem<PageData>(initialPageData());
  public apiUrl = `${config.apiPath}/carriers`;

  constructor(private http: HttpClient) {
    super();
    this.fetch();
  }

  fetch(): void {
    this.http
      .get<CarriersResponseDto>(this.apiUrl)
      .pipe(
        tap(() => (this.loading.value = true)),
        map((val): CarriersWithPage | null => {
          if (val == null) return null;
          const { _embedded, page } = val;
          const crs: Array<Carrier> = _embedded?.carriers?.map(dto => ({
            id: dto.id,
            name: dto.name,
            inn: dto.inn,
            address: dto.address,
            href: dto._links?.self?.href,
            buses: dto._links?.buses?.href,
            fares: dto._links?.fares?.href,
          }));
          return {
            carriers: crs,
            page,
          };
        }),

        switchMap(({ carriers, page }) =>
          from(carriers).pipe(
            mergeMap(cr =>
              this.http.get<BusesResponseDto>(cr.buses as string).pipe(
                map(
                  (val): Array<Bus> =>
                    val._embedded?.buses?.map(
                      busDto =>
                        ({
                          id: busDto.id,
                          makeModel: busDto.makeModel,
                          manufacturerCountry: busDto.manufacturerCountry,
                          yearOfManufacture: busDto.yearOfManufacture,
                          seatCount: busDto.seatCount,
                          regNumber: busDto.regNumber,
                          carrier: cr,
                        } as Bus),
                    ),
                ),
                map(
                  (val): Carrier => ({
                    ...cr,
                    buses: val,
                  }),
                ),
                catchError(() => of(false).pipe(map(() => cr))),
              ),
            ),
            mergeMap(cr =>
              this.http.get<FaresResponseDto>(cr.fares as string).pipe(
                map(
                  (val): Array<Fare> =>
                    val._embedded?.fares?.map(
                      fareDto =>
                        ({
                          id: fareDto.id,
                          name: fareDto.name,
                          price: fareDto.price,
                          carrier: cr,
                        } as Fare),
                    ),
                ),
                map(
                  (val): CarrierWithPage => ({
                    carrier: {
                      ...cr,
                      fares: val,
                    },
                    page,
                  }),
                ),
                catchError(() => of(false).pipe(map(() => cr))),
              ),
            ),
          ),
        ),
        map((v: Array<CarrierWithPage>): CarriersWithPage => {
          const carriers = v.map(c => c.carrier);
          const [item] = v;
          const { page } = item ?? { page: null };
          return {
            carriers,
            page,
          };
        }),

        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(data => this.setCarrierData(data));
  }

  setCarrierData(value: CarriersWithPage) {
    console.log(value);
  }
}
