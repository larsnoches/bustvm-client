import * as coreComponents from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { EmailGuard } from './guards/email/email.guard';
import { NgModule } from '@angular/core';
import { RoleGuard } from './guards/role/role.guard';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';
import { ValidationService } from './services/validation/validation.service';
import { authInterceptorProvider } from './interceptors/auth.interceptor';
@NgModule({
  declarations: [...coreComponents.components],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [...coreComponents.components],
  providers: [
    AuthGuard,
    RoleGuard,
    EmailGuard,
    AuthService,
    ValidationService,
    authInterceptorProvider,
  ],
})
export class CoreModule {}
