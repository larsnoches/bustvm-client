import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  SeatConfirmComponent,
  SeatFormPageComponent,
  SeatListComponent,
  SeatsPageComponent,
} from './components';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeatStoreService } from './services/seat/seat-store.service';
import { SharedModule } from '@modules/shared/shared.module';
@NgModule({
  declarations: [
    SeatListComponent,
    SeatsPageComponent,
    SeatConfirmComponent,
    SeatFormPageComponent,
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
  providers: [SeatStoreService],
  exports: [SeatsPageComponent],
})
export class SeatsModule {}
