import {
  BusPointTypeConfirmComponent,
  BusPointTypeDialogComponent,
  BusPointTypeListComponent,
  BusPointTypesPageComponent,
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusPointTypeStoreService } from './services/buspoint-type-store/buspoint-type-store.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [
    BusPointTypeListComponent,
    BusPointTypesPageComponent,
    BusPointTypeDialogComponent,
    BusPointTypeConfirmComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  providers: [BusPointTypeStoreService],
  exports: [BusPointTypesPageComponent],
})
export class BusPointTypesModule {}
