import * as sharedComponents from './components';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...sharedComponents.components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  exports: [...sharedComponents.components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
