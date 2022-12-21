import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from '@modules/core/guards/auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BusPointsModule } from '@modules/buspoints/buspoints.module';
import { BusesModule } from '@modules/buses/buses.module';
import { CarriersModule } from '@modules/carriers/carriers.module';
import { CoreModule } from '@modules/core/core.module';
import { EmailGuard } from '@modules/core/guards/email/email.guard';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
    BusPointsModule,
    CarriersModule,
    BusesModule,
    UsersModule,
    CoreModule,
    // AuthGuard,
  ],
  providers: [AuthGuard, RoleGuard, EmailGuard, authInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
