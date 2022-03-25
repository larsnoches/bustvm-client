import { catchError, retry } from 'rxjs';
import { BehaviorSubjectItem } from '@helpers/behavior-subject-item';
import { Bus } from '@modules/buses/models/bus.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThrowableService } from '@helpers/throwable-http-service';
import { config } from '@helpers/config';

@Injectable({
  providedIn: 'root',
})
export class BusStoreService extends ThrowableService {
  private readonly apiFetchUrl = `${config.apiPath}/buses`;
  private readonly busData = new BehaviorSubjectItem<Array<Bus>>([]);

  constructor(private http: HttpClient) {
    super();
    this.fetch();
  }

  fetch() {
    this.http
      .get<Array<Bus>>(this.apiFetchUrl)
      .pipe(
        retry(3),
        catchError(er => this.handleError(er)),
      )
      .subscribe(data => this.setBusData(data));
  }

  setBusData(value: Array<Bus>) {
    this.busData.value = value;
  }
}
