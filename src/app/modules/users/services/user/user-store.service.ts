import {
  CreateUserRequestDto,
  GetUserResponseDto,
  UpdateUserRequestDto,
} from '@modules/users/models/user.model';
import { Observable, catchError, retry, tap } from 'rxjs';
import { PageData, Pageable, initialPageData } from '@helpers/page-data';
import { BehaviorSubjectItem } from '@helpers/behavior-subject-item';
import { ChangePasswordRequestDto } from '@modules/core/models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThrowableService } from '@helpers/throwable-http-service';
import { config } from '@helpers/config';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService extends ThrowableService {
  loading = new BehaviorSubjectItem(false);
  userListData = new BehaviorSubjectItem<Array<GetUserResponseDto>>([]);
  pageData = new BehaviorSubjectItem<PageData>(initialPageData());
  public apiUrl = `${config.apiPath}/users`;

  constructor(private http: HttpClient) {
    super();
  }

  getUsers(pageNumber?: number | null): void {
    const params = {
      page: pageNumber ?? 0,
      size: this.pageData.value.size,
      sort: 'id,email',
    };
    this.http
      .get<Pageable<GetUserResponseDto>>(this.apiUrl, { params })
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
        next: data => this.updateUserListAndPageData(data),
        complete: () => (this.loading.value = false),
      });
  }

  getUserById(userId: number): Observable<GetUserResponseDto> {
    return this.http.get<GetUserResponseDto>(`${this.apiUrl}/${userId}`).pipe(
      tap(() => (this.loading.value = true)),
      retry(3),
      catchError(er => {
        this.loading.value = false;
        return this.handleError(er);
      }),
      tap(() => (this.loading.value = false)),
    );
  }

  getUserByEmail(userEmail: string): Observable<GetUserResponseDto> {
    return this.http
      .get<GetUserResponseDto>(`${this.apiUrl}/get/${userEmail}`)
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      );
  }

  createUser(dto: CreateUserRequestDto): Observable<GetUserResponseDto> {
    const createUrl = `${this.apiUrl}/create`;
    return this.http.post<GetUserResponseDto>(createUrl, dto).pipe(
      tap(() => (this.loading.value = true)),
      retry(3),
      catchError(er => {
        this.loading.value = false;
        return this.handleError(er);
      }),
      tap(() => (this.loading.value = false)),
    );
    // .subscribe({
    //   // next: data => this.appendUserToList(data),
    //   complete: () => (this.loading.value = false),
    // });
  }

  updateUserById(
    userId: number,
    dto: UpdateUserRequestDto,
  ): Observable<GetUserResponseDto> {
    const updateUrl = `${this.apiUrl}/${userId}/update`;
    return this.http.put<GetUserResponseDto>(updateUrl, dto).pipe(
      tap(() => (this.loading.value = true)),
      retry(3),
      catchError(er => {
        this.loading.value = false;
        return this.handleError(er);
      }),
      tap(() => (this.loading.value = false)),
    );
    // .subscribe({
    //   next: data => this.updateUserInTheList(data),
    //   complete: () => (this.loading.value = false),
    // });
  }

  changeUserPassword(
    userId: number,
    dto: ChangePasswordRequestDto,
  ): Observable<GetUserResponseDto> {
    const changepasswordUrl = `${this.apiUrl}/${userId}/changepassword`;
    return this.http.put<GetUserResponseDto>(changepasswordUrl, dto).pipe(
      tap(() => (this.loading.value = true)),
      retry(3),
      catchError(er => {
        this.loading.value = false;
        return this.handleError(er);
      }),
      tap(() => (this.loading.value = false)),
    );
    // .subscribe({
    //   complete: () => (this.loading.value = false),
    // });
  }

  removeUser(userId: number): void {
    const removeUrl = `${this.apiUrl}/${userId}/remove`;
    this.http
      .delete<GetUserResponseDto>(removeUrl)
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
          this.removeDataItem(userId);
        },
      });
  }

  private appendUserToList(value: GetUserResponseDto): void {
    if (value == null) return;
    this.userListData.value.push(value);
  }

  private updateUserListAndPageData(value: Pageable<GetUserResponseDto>): void {
    if (
      this.pageData.value.last ||
      this.pageData.value.number === value.number
    ) {
      this.userListData.value.length = 0;
    }
    if (value.content != null) this.userListData.value.push(...value.content);

    this.userListData.value.sort((a, b) => a.id - b.id);

    this.pageData.value = {
      last: value.last,
      totalPages: value.totalPages,
      totalElements: value.totalElements,
      size: value.size,
      number: value.number,
      empty: value.empty,
    };
  }

  private updateUserInTheList(value: GetUserResponseDto): void {
    if (value == null) return;
    const itemIndex = this.userListData.value.findIndex(v => v.id === value.id);
    if (itemIndex === -1) return;
    this.userListData.value.splice(itemIndex, 1, value);
    this.userListData.value.sort((a, b) => a.id - b.id);
  }

  private removeDataItem(userId: number): void {
    const itemIndex = this.userListData.value.findIndex(v => v.id === userId);
    if (itemIndex === -1) return;

    this.userListData.value.splice(itemIndex, 1);
    this.userListData.value.sort((a, b) => a.id - b.id);
  }
}
