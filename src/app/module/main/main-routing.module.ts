import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index.component';
import { PlayerComponent } from './player/player.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [{
  path:'',component:IndexComponent,children:[
    {
      path:'',redirectTo:'home',pathMatch:'full'
    },
    {
      path:'home',component:HomeComponent
    },
    {
      path:'products',component:ProductsComponent
    },
    {
      path:'play/:id',component:PlayerComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
