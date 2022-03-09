import * as coreComponents from '@modules/core/components';
import { RouterModule, Routes } from '@angular/router';
import { BusPointTypesPageComponent } from '@modules/buspoint-types/components';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: coreComponents.HomePageComponent,
  },
  {
    path: 'buspoint-types',
    component: BusPointTypesPageComponent,
  },
  {
    path: '**',
    component: coreComponents.NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
