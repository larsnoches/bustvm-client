import {
  CarrierConfirmComponent,
  CarrierFormPageComponent,
  CarrierListComponent,
  CarriersPageComponent,
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarrierStoreService } from './services/carrier/carrier-store.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [
    CarrierListComponent,
    CarriersPageComponent,
    CarrierConfirmComponent,
    CarrierFormPageComponent,
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
  providers: [CarrierStoreService],
  exports: [CarriersPageComponent],
})
export class CarriersModule {}
