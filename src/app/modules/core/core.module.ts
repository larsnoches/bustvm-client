import * as coreComponents from './components';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoleGuard } from './guards/role/role.guard';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [...coreComponents.components],
  imports: [CommonModule, RouterModule],
  exports: [...coreComponents.components],
  providers: [AuthGuard, RoleGuard, AuthService],
})
export class CoreModule {}
