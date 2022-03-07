import * as sharedComponents from './components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { PageData } from './models/page-data.model';
// import { SmallButtonComponent } from './small-button/small-button.component';

@NgModule({
  declarations: [...sharedComponents.components],
  imports: [CommonModule],
  exports: [...sharedComponents.components],
})
export class SharedModule {}
