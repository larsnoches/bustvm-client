import {
  FareConfirmComponent,
  FareFormPageComponent,
  FareListComponent,
  FaresPageComponent,
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FareStoreService } from './services/fare/fare-store.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';
@NgModule({
  declarations: [
    FareConfirmComponent,
    FareFormPageComponent,
    FareListComponent,
    FaresPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  providers: [FareStoreService],
  exports: [FaresPageComponent],
})
export class FaresModule {}
