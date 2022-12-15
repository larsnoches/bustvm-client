import {
  AuthConfig,
  NullValidationHandler,
  OAuthErrorEvent,
  OAuthService,
  OAuthSuccessEvent,
} from 'angular-oauth2-oidc';
import { BehaviorSubjectItem } from '@helpers/behavior-subject-item';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * The OpenID-Connect configuration using the Authorization Code flow
   */
  authConfig: AuthConfig = {
    issuer: 'http://127.0.0.1:8181',
    // issuer: 'http://localhost:8484/auth/realms/bustvs_realm',
    redirectUri: `${window.location.origin}/callback`,
    // redirectUri: `${window.location.origin}/callback`,
    postLogoutRedirectUri: `${window.location.origin}/logout`,
    clientId: 'vending_client',
    dummyClientSecret: '12345',
    scope: 'openid profile',
    // scope: 'openid profile email offline_access',
    responseType: 'code',
    sessionChecksEnabled: true,

    showDebugInformation: true,
    requireHttps: false,

    oidc: true,
  };

  private isAuthenticatedSubject = new BehaviorSubjectItem(false);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public isAuthenticated$ = this.isAuthenticatedSubject.value$;

  constructor(private oauthService: OAuthService, private router: Router) {
    this.configure();
    // For SSO logout
    // this.oauthService.events
    //   .pipe(filter(e => e.type === 'session_changed'))
    //   .subscribe(_e => {
    //     console.log(_e);
    //     // this.logout();
    //   });
    this.oauthService.events.subscribe(_ => {
      this.isAuthenticatedSubject.value =
        this.oauthService.hasValidAccessToken();
    });

    this.oauthService.events
      .pipe(filter(e => ['token_received'].includes(e.type)))
      .subscribe(_e => this.loadUserProfile());

    this.oauthService.events
      .pipe(
        filter(e => ['session_terminated', 'session_error'].includes(e.type)),
      )
      .subscribe(_e => this.navigateToLoginPage());
  }

  /**
   * Extract the roles from the claim within the generated access token (JWT)
   */
  public getClaims(): string[] {
    try {
      const accessToken: string = this.oauthService.getAccessToken();
      const tokens: string[] = accessToken.split('.');
      const claims = JSON.parse(atob(tokens[1]));
      return claims.roles;
    } catch (er) {
      return [];
    }
  }

  /**
   * Extracts the OpenID Connect clientId from the generated access token (JWT)
   */
  public getClientId(): string {
    const claims = this.getJwtAsObject();
    return claims['azp'];
  }

  /**
   * Extracts the JWT Issuer from the generated access token
   */
  public getIssuer(): string {
    const claims = this.getJwtAsObject();
    return claims['iss'];
  }

  public getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  /**
   * Will kick-off the OpenID Connect Authorization Code flow (Based on the configured authConfig#issuer)
   */
  public login(): void {
    this.oauthService.initLoginFlow();
  }

  /**
   * Will execute a logout operation by re-directing to logout endpoint and successively to
   * to a configured logout path (Configured above in authConfig#postLogoutRedirectUri)
   */
  public logout(): void {
    this.oauthService.logOut();
  }

  /**
   * Will hook into the OAuth 'token_recieved' event and perform a re-direct to the profile page.
   */
  public redirectOnCallback(): void {
    this.oauthService.events.subscribe(ev => {
      if (ev instanceof OAuthErrorEvent) {
        console.error(ev);
      } else if (ev instanceof OAuthSuccessEvent) {
        if (ev.type === 'token_received') {
          this.router.navigateByUrl('/buspoint-types');
        }
        console.info(ev);
      } else {
        console.warn(ev);
      }
    });
  }

  /**
   * Determines if the current user has a valid id token
   * Returns true if an IdToken exists within the session storage, false otherwise
   */
  public hasValidIdToken(): boolean {
    return this.oauthService.hasValidIdToken();
  }

  public hasManagerRole(): boolean {
    console.log(this.getClaims());
    return this.getClaims().some(s => s.toLowerCase() === 'role_manager');
  }

  /**
   * Configures the Angular OpenID Connect client
   */
  private configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService
      .loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        this.loadUserProfile();
      })
      .catch(er => console.log(er));
  }

  /**
   * Helper method to extract the claims from the body component of the signed access token
   */
  private getJwtAsObject(): object {
    const accessToken: string = this.oauthService.getAccessToken();
    const tokens: string[] = accessToken.split('.');
    return JSON.parse(atob(tokens[1]));
  }

  private navigateToLoginPage(): void {
    // TODO: Remember current URL
    this.router.navigateByUrl('/');
  }

  private loadUserProfile(): void {
    // this.oauthService.loadUserProfile();
  }
}
