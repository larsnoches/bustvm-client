import * as coreComponents from '@modules/core/components';
import {
  BusFormPageComponent,
  BusesPageComponent,
} from '@modules/buses/components';
import {
  BusPointFormPageComponent,
  BusPointsPageComponent,
} from '@modules/buspoints/components';
import {
  BusTripFormPageComponent,
  BusTripsPageComponent,
} from '@modules/bustrips/components';
import {
  CarrierFormPageComponent,
  CarriersPageComponent,
} from '@modules/carriers/components';
import {
  FareFormPageComponent,
  FaresPageComponent,
} from '@modules/fares/components';
import { RouterModule, Routes } from '@angular/router';
import {
  SeatFormPageComponent,
  SeatsPageComponent,
} from '@modules/seats/components';
import {
  TicketFormPageComponent,
  TicketViewPageComponent,
  TicketViewPayedPageComponent,
  TicketsPageComponent,
} from '@modules/tickets/components';
import {
  UserChangePasswordComponent,
  UserFormPageComponent,
  UsersPageComponent,
} from '@modules/users/components';
import { AuthGuard } from '@modules/core/guards/auth/auth.guard';
import { EmailGuard } from '@modules/core/guards/email/email.guard';
import { NgModule } from '@angular/core';
import { RoleGuard } from '@modules/core/guards/role/role.guard';

const userRoutes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form',
    component: UserFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form/:id',
    component: UserFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form/changepassword/:id',
    component: UserChangePasswordComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form/self/:email',
    component: UserFormPageComponent,
    canActivate: [AuthGuard, EmailGuard],
  },
  {
    path: 'form/self/changepassword/:email',
    component: UserChangePasswordComponent,
    canActivate: [AuthGuard, EmailGuard],
  },
];

const ticketRoutes: Routes = [
  {
    path: '',
    component: TicketsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':busTripId/order',
    component: TicketFormPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viewPayed',
    component: TicketViewPayedPageComponent,
  },
  {
    path: 'view/:id',
    component: TicketViewPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'form/:id',
    component: TicketFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
];

const buspointRoutes: Routes = [
  {
    path: '',
    component: BusPointsPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form',
    component: BusPointFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form/:id',
    component: BusPointFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
];

const busRoutes: Routes = [
  {
    path: '',
    component: BusesPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form',
    component: BusFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form/:id',
    component: BusFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
];

const fareRoutes: Routes = [
  {
    path: '',
    component: FaresPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form',
    component: FareFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form/:id',
    component: FareFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
];

const seatRoutes: Routes = [
  {
    path: '',
    component: SeatsPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form',
    component: SeatFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form/:id',
    component: SeatFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
];

const bustripRoutes: Routes = [
  {
    path: '',
    component: BusTripsPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form',
    component: BusTripFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form/:id',
    component: BusTripFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: ':busTripId/seats',
    children: seatRoutes,
  },
];

const carrierRoutes: Routes = [
  {
    path: '',
    component: CarriersPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form',
    component: CarrierFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'form/:id',
    component: CarrierFormPageComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: ':carrierId/buses',
    children: busRoutes,
  },
  {
    path: ':carrierId/fares',
    children: fareRoutes,
  },
  {
    path: ':carrierId/bustrips',
    children: bustripRoutes,
  },
];

const routes: Routes = [
  {
    path: '',
    component: coreComponents.HomePageComponent,
  },
  {
    path: 'buspoints',
    children: buspointRoutes,
  },
  {
    path: 'carriers',
    children: carrierRoutes,
  },
  {
    path: 'tickets',
    children: ticketRoutes,
  },
  {
    path: 'users',
    children: userRoutes,
  },
  {
    path: 'login',
    component: coreComponents.LoginPageComponent,
  },
  {
    path: 'logout',
    component: coreComponents.LogoutPageComponent,
  },
  {
    path: 'register',
    component: coreComponents.RegisterPageComponent,
  },
  // {
  //   path: 'callback',
  //   component: coreComponents.RedirectPageComponent,
  // },
  {
    path: '**',
    component: coreComponents.NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
