import { catchError, retry, tap } from 'rxjs';
import { BehaviorSubjectItem } from '@helpers/behavior-subject-item';
import { BusPointType } from '@modules/buspoint-types/models/buspoint-type.model';
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
  private apiFetchUrl = `${config.apiPath}/busPointTypes`;

  constructor(private http: HttpClient) {
    super();
    this.fetch();
  }

  fetch() {
    this.http
      .get<Array<BusPointType>>(this.apiFetchUrl)
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
}
