import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'http://192.168.56.104:8180/auth',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: '<your clientId>',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthenticationModule {}
