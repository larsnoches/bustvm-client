import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from '@modules/core/guards/auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BusPointTypesModule } from '@modules/buspoint-types/buspoint-types.module';
import { BusPointsModule } from '@modules/buspoints/buspoints.module';
import { CarriersModule } from '@modules/carriers/carriers.module';
import { CoreModule } from '@modules/core/core.module';
import { EmailGuard } from '@modules/core/guards/email/email.guard';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { OAuthModule } from 'angular-oauth2-oidc';
import { RoleGuard } from '@modules/core/guards/role/role.guard';
import { UsersModule } from '@modules/users/users.module';
import { authInterceptorProvider } from '@modules/core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BusPointTypesModule,
    BusPointsModule,
    CarriersModule,
    UsersModule,
    CoreModule,
    // AuthGuard,
    // OAuthModule.forRoot({
    //   resourceServer: {
    //     allowedUrls: [
    //       'http://127.0.0.1:8080/api',
    //       'http://127.0.0.1:8181/userinfo',
    //       'http://127.0.0.1:8181/api',
    //     ],
    //     sendAccessToken: true,
    //   },
    // }),
  ],
  providers: [AuthGuard, RoleGuard, EmailGuard, authInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
