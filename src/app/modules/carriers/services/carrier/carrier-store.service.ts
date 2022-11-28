import { Bus, BusesResponseDto } from '@modules/buses/models/bus.model';
import {
  Carrier,
  CarrierRequestDto,
  CarrierResponseDto,
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
        // map((v: Array<CarrierWithPage>): CarriersWithPage => {
        //   const carriers = v.map(c => c.carrier);
        //   const [item] = v;
        //   const { page } = item ?? { page: null };
        //   return {
        //     carriers,
        //     page,
        //   };
        // }),

        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(data => this.setCarrierData(data));
  }

  setCarrierData(value): void {
    console.log(value); // log
    // const { carrier, page } = value ?? {
    //   carrier: null,
    //   page: null,
    // };

    // if (carrier) this.carrierData.value.push(carrier);
    // this.carrierData.value.sort((a, b) => a.id - b.id);

    // if (page) {
    //   this.pageData.value = page;
    // }
  }

  getOne(id: string): Carrier {
    if (id == null) return null;
    const idNum = Number(id);
    return this.carrierData.value.find(cr => cr.id === idNum);
  }

  create(carrierDto: CarrierRequestDto): void {
    // if (carrierDto == null) return;
    //
  }

  appendCarrierDataItem(value: Carrier): void {
    if (value == null) return;
    this.carrierData.value.push(value);
    this.carrierData.value.sort((a, b) => a.id - b.id);
  }

  edit(itemHref: string, carrierDto: CarrierRequestDto): void {
    this.http
      .patch<CarrierResponseDto>(itemHref, carrierDto)
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(data => this.setCarrierDataItem(data));
  }

  setCarrierDataItem(value: CarrierResponseDto): void {
    const itemIndex = this.carrierData.value.findIndex(v => v.id === value.id);
    if (itemIndex === -1) return;

    this.carrierData.value.splice(itemIndex, 1, {
      id: value.id,
      name: value.name,
      inn: value.inn,
      address: value.address,
      href: value._links?.self.href,
    });
    this.carrierData.value.sort((a, b) => a.id - b.id);
  }

  deleteOne(carrier: Carrier): void {
    this.http
      .delete(carrier.href)
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      )
      .subscribe(() => this.removeCarrierDataItem(carrier));
  }

  removeCarrierDataItem(value: Carrier): void {
    const itemIndex = this.carrierData.value.findIndex(v => v.id === value.id);
    if (itemIndex === -1) return;

    this.carrierData.value.splice(itemIndex, 1);
    this.carrierData.value.sort((a, b) => a.id - b.id);
  }
}
