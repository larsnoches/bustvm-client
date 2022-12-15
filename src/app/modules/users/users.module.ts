import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  UserConfirmComponent,
  UserFormPageComponent,
  UserListComponent,
  UsersPageComponent,
} from './components';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';
import { UserStoreService } from './services/user/user-store.service';

@NgModule({
  declarations: [
    UserConfirmComponent,
    UserFormPageComponent,
    UserListComponent,
    UsersPageComponent,
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
  providers: [UserStoreService],
  exports: [UsersPageComponent],
})
export class UsersModule {}
