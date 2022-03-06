import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TicketsItemComponent } from './components/tickets-item/tickets-item/tickets-item.component';
import { TicketsListComponent } from './components/tickets-list/tickets-list/tickets-list.component';

@NgModule({
  declarations: [TicketsListComponent, TicketsItemComponent],
  imports: [CommonModule],
})
export class TicketsModule {}
