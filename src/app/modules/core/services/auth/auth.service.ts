import * as moment from 'moment';
import {
  AuthenticationRequestDto,
  AuthenticationResponseDto,
  RegistrationRequestDto,
} from '@modules/core/models/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, tap } from 'rxjs';
import { BehaviorSubjectItem } from '@helpers/behavior-subject-item';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ThrowableService } from '@helpers/throwable-http-service';
import { config } from '@helpers/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ThrowableService {
  loading = new BehaviorSubjectItem(false);
  isAuthenticatedSubject = new BehaviorSubjectItem(false);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public isAuthenticated$ = this.isAuthenticatedSubject.value$;
  public apiUrl = `${config.apiPath}/auth`;

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  login(
    authenticationRequestDto: AuthenticationRequestDto,
  ): Observable<AuthenticationResponseDto> {
    const loginUrl = `${this.apiUrl}/authenticate`;
    return this.http
      .post<AuthenticationResponseDto>(loginUrl, authenticationRequestDto)
      .pipe(
        tap(() => (this.loading.value = true)),
        retry(3),
        catchError(er => {
          this.loading.value = false;
          return this.handleError(er);
        }),
        tap(() => (this.loading.value = false)),
      );
    // .subscribe(data => {
    //   console.log(data);
    //   this.saveToken(data);
    //   this.router.navigate(['/']);
    // });
  }

  register(
    registrationRequestDto: RegistrationRequestDto,
  ): Observable<AuthenticationResponseDto> {
    const registerUrl = `${this.apiUrl}/register`;
    return this.http
      .post<AuthenticationResponseDto>(registerUrl, registrationRequestDto)
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

  logout(): void {
    try {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
      this.router.navigateByUrl('/');
    } catch (er) {
      console.error('Error due logout');
    }
  }

  refreshToken(token: string): Observable<AuthenticationResponseDto> {
    const refreshTokenUrl = `${this.apiUrl}/token/refresh`;
    // const token = this.getRefreshToken();
    return (
      this.http
        // eslint-disable-next-line prettier/prettier
        .get<AuthenticationResponseDto>(refreshTokenUrl, {
          // eslint-disable-next-line @typescript-eslint/indent, prettier/prettier
          headers: new HttpHeaders({ Authorization: `Bearer ${token}` }), // eslint-disable-next-line @typescript-eslint/indent
        })
    );
    // .pipe(
    //   tap(() => (this.loading.value = true)),
    //   retry(3),
    //   catchError(er => {
    //     this.loading.value = false;
    //     return this.handleError(er);
    //   }),
    //   tap(() => (this.loading.value = false)),
    // )
    // .subscribe(data => {
    //   this.saveToken(data);
    // });
  }

  saveToken(authenticationResponseDto: AuthenticationResponseDto): void {
    console.log(authenticationResponseDto);
    try {
      const { accessToken, refreshToken } = authenticationResponseDto;
      window.localStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('refreshToken', refreshToken);

      const tokenData: string[] = accessToken.split('.');
      const claims = JSON.parse(atob(tokenData[1])) as {
        exp: number;
      };
      const expiresAt = moment().add(claims.exp, 'second');
      window.localStorage.setItem(
        'expiresAt',
        JSON.stringify(expiresAt.valueOf()),
      );
    } catch (er) {
      console.error('Error due saving tokens');
    }
  }

  hasValidToken(): boolean {
    return (
      this.getAccessToken() != null && moment().isBefore(this.getExpiration())
    );
  }

  hasManagerRole(): boolean {
    try {
      const accessToken = this.getAccessToken();
      const tokenData: string[] = accessToken.split('.');
      const claims = JSON.parse(atob(tokenData[1])) as {
        authorities: Array<{
          authority: string;
        }>;
      };
      return claims.authorities.some(
        s => s.authority.toLowerCase() === 'role_manager',
      );
    } catch (er) {
      console.error('Error when check manager role');
    }
    return false;
  }

  getExpiration(): moment.Moment {
    try {
      const expiration = window.localStorage.getItem('expiresAt');
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    } catch (er) {
      console.error('Error when get expiration');
    }
    return null;
  }

  getAccessToken(): string {
    try {
      const token = window.localStorage.getItem('accessToken');
      return token;
    } catch (er) {
      console.error('Error due load accessToken');
    }
    return null;
  }

  getRefreshToken(): string {
    try {
      const token = window.localStorage.getItem('refreshToken');
      return token;
    } catch (er) {
      console.error('Error due load refreshToken');
    }
    return null;
  }
}
