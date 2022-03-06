import { catchError, retry } from 'rxjs';
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
  private apiFetchUrl = `${config.apiPath}/busPoints`;
  private busPointTypeData = new BehaviorSubjectItem<Array<BusPointType>>([]);

  constructor(private http: HttpClient) {
    super();
    this.fetch();
  }

  fetch() {
    this.http
      .get<Array<BusPointType>>(this.apiFetchUrl)
      .pipe(
        retry(3),
        catchError(er => this.handleError(er)),
      )
      .subscribe(data => this.setBusPointTypeData(data));
  }

  setBusPointTypeData(value: Array<BusPointType>) {
    this.busPointTypeData.value = value;
  }
}
