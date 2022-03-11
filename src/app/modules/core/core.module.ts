import * as coreComponents from './components';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [...coreComponents.components],
  imports: [CommonModule, RouterModule],
  exports: [...coreComponents.components],
  providers: [AuthService],
})
export class CoreModule {}
