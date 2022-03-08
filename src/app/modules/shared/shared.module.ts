import * as sharedComponents from './components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [...sharedComponents.components],
  imports: [CommonModule],
  exports: [...sharedComponents.components],
})
export class SharedModule {}
