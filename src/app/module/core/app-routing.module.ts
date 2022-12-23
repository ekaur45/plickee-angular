import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utils/auth.guard';

const routes: Routes = [
  {
    path:'',loadChildren:()=>import("./../main/main.module").then(e=>{      
      return e.MainModule
    })
  },
  {
    path:'admin',loadChildren:()=>import('./../admin/admin.module').then(m=>{
      return m.AdminModule
    }),canActivate:[AuthGuard]
  },
  {
    path:'account',loadChildren:()=>import('./../account/account.module').then(m=>{
      return m.AccountModule
    })
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
