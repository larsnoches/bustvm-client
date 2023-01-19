import { Injectable, Injector } from '@angular/core';
import {
  BasicFareRequestDto as Req,
  GetFareResponseDto as Resp,
} from '@modules/fares/models/fare.model';
import { catchError, retry, tap } from 'rxjs';
import { Pageable } from '@helpers/page-data';
import { StoreService } from '@helpers/store.service';
import { config } from '@helpers/config';

@Injectable({
  providedIn: 'root',
})
export class FareStoreService extends StoreService<Req, Resp> {
  fareApiUrl = `${config.apiPath}/fares`;

  constructor(protected injector: Injector) {
    super(injector);
    super.apiUrl = this.fareApiUrl;
  }

  getListByCarrierId(carrierId: number, pageNumber?: number | null): void {
    const listUtl = `${this.fareApiUrl}/carrier/${carrierId}`;
    let params = {
      page: pageNumber ?? 0,
      size: this.pageData.value.size,
      sort: 'id',
    };
    if (pageNumber == null) params = null;

    this.http
      .get<Pageable<Resp>>(listUtl, { params })
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
}
