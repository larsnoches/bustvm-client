import * as coreComponents from '@modules/core/components';
import { RouterModule, Routes } from '@angular/router';
import { BusPointTypesPageComponent } from '@modules/buspoint-types/components';
// import { HomePageComponent } from '../core/components/home-page/home-page.component';
import { NgModule } from '@angular/core';
// import { NotFoundPageComponent } from '../core/components/not-found-page/not-found-page.component';

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
