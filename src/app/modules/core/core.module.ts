import * as coreComponents from './components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [...coreComponents.components],
  imports: [CommonModule, RouterModule],
  exports: [...coreComponents.components],
})
export class CoreModule {}
