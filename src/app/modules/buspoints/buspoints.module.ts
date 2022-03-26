import { BusPointConfirmComponent } from './components/buspoint-confirm/buspoint-confirm.component';
import { BusPointFormPageComponent } from './components/buspoint-form-page/buspoint-form-page.component';
import { BusPointListComponent } from './components/buspoint-list/buspoint-list.component';
import { BusPointStoreService } from './services/buspoint/buspoint-store.service';
import { BusPointsPageComponent } from './components/buspoints-page/buspoints-page.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    BusPointsPageComponent,
    BusPointListComponent,
    BusPointConfirmComponent,
    BusPointFormPageComponent,
  ],
  imports: [CommonModule],
  providers: [BusPointStoreService],
})
export class BusPointsModule {}
