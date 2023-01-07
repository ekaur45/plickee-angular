import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { IndexComponent } from './index.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { VerficationComponent } from './verfication/verfication.component';
import { ResetComponent } from './reset/reset.component';


@NgModule({
  declarations: [
    IndexComponent,
    LoginComponent,
    SignupComponent,
    VerficationComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
