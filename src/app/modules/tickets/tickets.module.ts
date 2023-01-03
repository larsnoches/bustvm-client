import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TicketConfirmComponent,
  TicketFormPageComponent,
  TicketListComponent,
  TicketViewPageComponent,
  TicketViewPayedPageComponent,
  TicketsPageComponent,
} from './components';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { SecurePipe } from '@modules/core/pipes/secure.pipe';
import { SharedModule } from '@modules/shared/shared.module';
import { TicketStoreService } from './services/ticket/ticket-store.service';

@NgModule({
  declarations: [
    TicketFormPageComponent,
    TicketConfirmComponent,
    TicketListComponent,
    TicketsPageComponent,
    TicketViewPageComponent,
    TicketViewPayedPageComponent,
    // SecurePipe,
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
  providers: [TicketStoreService],
  exports: [TicketsPageComponent],
})
export class TicketsModule {}
