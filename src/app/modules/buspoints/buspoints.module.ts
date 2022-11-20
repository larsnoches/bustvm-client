import {
  BusPointConfirmComponent,
  BusPointFormPageComponent,
  BusPointListComponent,
  BusPointsPageComponent,
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusPointStoreService } from './services/buspoint/buspoint-store.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [
    BusPointsPageComponent,
    BusPointListComponent,
    BusPointConfirmComponent,
    BusPointFormPageComponent,
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
  providers: [BusPointStoreService],
  exports: [BusPointsPageComponent],
})
export class BusPointsModule {}
