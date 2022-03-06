import { RouterModule, Routes } from '@angular/router';
import { BustripsModule } from '@modules/bustrips/bustrips.module';
import { NgModule } from '@angular/core';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), BustripsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
