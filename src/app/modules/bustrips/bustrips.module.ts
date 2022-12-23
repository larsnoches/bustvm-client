import {
  BusTripConfirmComponent,
  BusTripFormPageComponent,
  BusTripListComponent,
  BusTripsPageComponent,
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusTripStoreService } from './services/bustrip/bustrip-store.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';
@NgModule({
  declarations: [
    BusTripConfirmComponent,
    BusTripFormPageComponent,
    BusTripListComponent,
    BusTripsPageComponent,
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
  providers: [BusTripStoreService],
  exports: [BusTripsPageComponent],
})
export class BusTripsModule {}
