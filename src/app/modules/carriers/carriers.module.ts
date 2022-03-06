import { CarriersItemComponent } from './components/carriers-item/carriers-item/carriers-item.component';
import { CarriersListComponent } from './components/carriers-list/carriers-list/carriers-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [CarriersListComponent, CarriersItemComponent],
  imports: [CommonModule],
})
export class CarriersModule {}
