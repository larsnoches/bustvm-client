import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThrowableService } from '@helpers/throwable-http-service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService extends ThrowableService {
  // loading = new BehaviorSubjectItem(false);
  // busPointData = new BehaviorSubjectItem<Array<BusPoint>>([]);
  // pageData = new BehaviorSubjectItem<PageData>(initialPageData());
  public apiUrl = 'http://127.0.0.1:8181/api/what';

  constructor(private http: HttpClient) {
    super();
    this.fetch();
  }

  fetch(): void {
    this.http
      .get(this.apiUrl)
      .pipe(
        // tap(() => (this.loading.value = true)),
        map(val => val),
      )
      .subscribe(data => console.log(data));
  }
}
