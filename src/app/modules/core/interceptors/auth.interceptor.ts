import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { AuthenticationResponseDto } from '@modules/core/models/auth.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );

  constructor(private authService: AuthService) {}

  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler,
  // ): Observable<HttpEvent<any>> {
  //   // const idToken = localStorage.getItem('id_token');
  //   const token = this.authService.getAccessToken();

  //   if (idToken) {
  //     const cloned = req.clone({
  //       headers: req.headers.set('Authorization', 'Bearer ' + idToken),
  //     });

  //     return next.handle(cloned);
  //   }
  //   return next.handle(req);
  // }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.authService.getAccessToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('auth/authenticate') &&
          error.status === 401
        ) {
          return this.handle401Error(authReq, next);
        }

        return throwError(error);
      }),
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.authService.getRefreshToken();

      if (token != null) {
        return this.authService.refreshToken(token).pipe(
          switchMap((authenticationResponseDto: AuthenticationResponseDto) => {
            this.isRefreshing = false;

            this.authService.saveToken(authenticationResponseDto);
            this.refreshTokenSubject.next(
              authenticationResponseDto.accessToken,
            );

            return next.handle(
              this.addTokenHeader(
                request,
                authenticationResponseDto.accessToken,
              ),
            );
          }),
          catchError(err => {
            this.isRefreshing = false;
            this.authService.logout();
            return throwError(err);
          }),
        );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addTokenHeader(request, token))),
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}

// // eslint-disable-next-line array-bracket-newline
// export const authInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
//   // eslint-disable-next-line array-bracket-newline
// ];
// eslint-disable-next-line array-bracket-newline
export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
