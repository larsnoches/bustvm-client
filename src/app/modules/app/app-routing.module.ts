import { RouterModule, Routes } from '@angular/router';
import { BusTripsModule } from '@modules/bustrips/bustrips.module';
import { NgModule } from '@angular/core';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), BusTripsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
