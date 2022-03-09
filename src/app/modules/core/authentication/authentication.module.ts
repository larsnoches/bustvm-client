import {
  AuthInterceptor,
  AuthModule,
  LogLevel,
} from 'angular-auth-oidc-client';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
        // secureRoutes: [
        //   'https://my-secure-url.com/',
        //   'https://my-second-secure-url.com/',
        // ],
      },
    }),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [AuthModule],
})
export class AuthenticationModule {}
