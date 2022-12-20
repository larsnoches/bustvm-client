import { Observable, catchError, retry, tap } from 'rxjs';
import { PageData, Pageable, initialPageData } from '@helpers/page-data';
import { BehaviorSubjectItem } from '@helpers/behavior-subject-item';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { ThrowableService } from '@helpers/throwable-http-service';
import { config } from '@helpers/config';

type TypeWithId = {
  id: number;
};

export class StoreService<
  RequestDto,
  ResponseDto extends TypeWithId,
> extends ThrowableService {
  loading = new BehaviorSubjectItem(false);
  listData = new BehaviorSubjectItem<Array<ResponseDto>>([]);
  pageData = new BehaviorSubjectItem<PageData>(initialPageData());

  apiUrl = `${config.apiPath}/`;

  protected http: HttpClient;

  constructor(protected injector: Injector) {
    super();
    this.http = injector.get(HttpClient);
  }

  getList(pageNumber?: number | null): void {
    const params = {
      page: pageNumber ?? 0,
      size: this.pageData.value.size,
      sort: 'id',
    };

    this.http
      .get<Pageable<ResponseDto>>(this.apiUrl, { params })
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
        next: data => this.updateListAndPageData(data),
        complete: () => (this.loading.value = false),
      });
  }

  getItemById(itemId: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(`${this.apiUrl}/${itemId}`).pipe(
      tap(() => (this.loading.value = true)),
      retry(3),
      catchError(er => {
        this.loading.value = false;
        return this.handleError(er);
      }),
      tap(() => (this.loading.value = false)),
    );
  }

  createItem(dto: RequestDto): Observable<ResponseDto> {
    const createUrl = `${this.apiUrl}/create`;
    return this.http.post<ResponseDto>(createUrl, dto).pipe(
      tap(() => (this.loading.value = true)),
      retry(3),
      catchError(er => {
        this.loading.value = false;
        return this.handleError(er);
      }),
      tap(() => (this.loading.value = false)),
    );
  }

  updateItemById(itemId: number, dto: RequestDto): Observable<ResponseDto> {
    const updateUrl = `${this.apiUrl}/${itemId}`;
    return this.http.put<ResponseDto>(updateUrl, dto).pipe(
      tap(() => (this.loading.value = true)),
      retry(3),
      catchError(er => {
        this.loading.value = false;
        return this.handleError(er);
      }),
      tap(() => (this.loading.value = false)),
    );
  }

  removeItem(itemId: number): void {
    const removeUrl = `${this.apiUrl}/${itemId}`;
    this.http
      .delete<ResponseDto>(removeUrl)
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
        complete: () => {
          this.loading.value = false;
          this.removeDataItem(itemId);
        },
      });
  }

  private updateListAndPageData(value: Pageable<ResponseDto>): void {
    if (
      this.pageData.value.last ||
      this.pageData.value.number === value.number
    ) {
      this.listData.value.length = 0;
    }
    if (value.content != null) {
      this.listData.value.push(...value.content);
    }

    this.listData.value.sort((a, b) => a.id - b.id);

    this.pageData.value = {
      last: value.last,
      totalPages: value.totalPages,
      totalElements: value.totalElements,
      size: value.size,
      number: value.number,
      empty: value.empty,
    };
  }

  private removeDataItem(itemId: number): void {
    const itemIndex = this.listData.value.findIndex(v => v.id === itemId);
    if (itemIndex === -1) return;

    this.listData.value.splice(itemIndex, 1);
    this.listData.value.sort((a, b) => a.id - b.id);
  }
}
