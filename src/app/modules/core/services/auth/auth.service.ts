import {
  AuthConfig,
  NullValidationHandler,
  OAuthErrorEvent,
  OAuthService,
  OAuthSuccessEvent,
} from 'angular-oauth2-oidc';
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
    issuer: 'http://192.168.56.104:8180/auth/realms/bustvm_realm',
    redirectUri: `${window.location.origin}/callback`,
    postLogoutRedirectUri: `${window.location.origin}/logout`,
    clientId: 'demo',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    sessionChecksEnabled: true,
  };

  constructor(private oauthService: OAuthService, private router: Router) {
    this.configure();
    // For SSO logout
    this.oauthService.events
      .pipe(filter(e => e.type === 'session_changed'))
      .subscribe(_e => {
        this.logout();
      });
  }

  /**
   * Extract the roles from the realm_access claim within the Keycloak generated access token (JWT)
   */
  public getClaims(): string[] {
    const accessToken: string = this.oauthService.getAccessToken();
    const tokens: string[] = accessToken.split('.');
    const claims = JSON.parse(atob(tokens[1]));
    return claims.realm_access.roles;
  }

  /**
   * Extracts the OpenID Connect clientId from the Keycloak generated access token (JWT)
   */
  public getClientId(): string {
    const claims = this.getJwtAsObject();
    return claims['azp'];
  }

  /**
   * Extracts the JWT Issuer from the Keycloak generated access token
   */
  public getIssuer(): string {
    const claims = this.getJwtAsObject();
    return claims['iss'];
  }

  /**
   * Will kick-off the OpenID Connect Authorization Code flow (Based on the configured authConfig#issuer)
   */
  public login(): void {
    this.oauthService.initLoginFlow();
  }

  /**
   * Will execute a logout operation by re-directing to Keycloaks logout endpoint and successively to
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
        this.oauthService.loadUserProfile();
      })
      .catch(() => true);
  }

  /**
   * Helper method to extract the claims from the body component of the signed access token
   */
  private getJwtAsObject(): object {
    const accessToken: string = this.oauthService.getAccessToken();
    const tokens: string[] = accessToken.split('.');
    return JSON.parse(atob(tokens[1]));
  }
}
