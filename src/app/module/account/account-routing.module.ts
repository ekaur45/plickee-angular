import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { SignupComponent } from './signup/signup.component';
import { VerficationComponent } from './verfication/verfication.component';

const routes: Routes = [
  {
    path:'',component:IndexComponent,children:[
      {
        path:'',component:LoginComponent
      },
      {
        path:'create',component:SignupComponent
      },
      {
        path:'verification', component: VerficationComponent
      },
      {
        path:'reset',component:ResetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
