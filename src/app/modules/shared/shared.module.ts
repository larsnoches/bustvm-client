import * as sharedComponents from './components';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [...sharedComponents.components],
  imports: [CommonModule, NgxSpinnerModule, BrowserAnimationsModule],
  exports: [...sharedComponents.components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
