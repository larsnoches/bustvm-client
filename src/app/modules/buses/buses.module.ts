import {
  BusConfirmComponent,
  BusFormPageComponent,
  BusListComponent,
  BusesPageComponent,
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusStoreService } from './services/bus/bus-store.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';
@NgModule({
  declarations: [
    BusListComponent,
    BusesPageComponent,
    BusConfirmComponent,
    BusFormPageComponent,
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
  providers: [BusStoreService],
  exports: [BusesPageComponent],
})
export class BusesModule {}
