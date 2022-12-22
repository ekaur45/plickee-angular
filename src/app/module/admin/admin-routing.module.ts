import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/utils/admin.guard';
import { AddCensorComponent } from './add-censor/add-censor.component';
import { AddLinksComponent } from './add-links/add-links.component';
import { AddVideoComponent } from './add-video/add-video.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index.component';
import { ListVideoComponent } from './list-video/list-video.component';
import { NoAccessComponent } from './no-access/no-access.component';

const routes: Routes = [{
  path: '', component: IndexComponent, children: [
    {
      path: '', component: DashboardComponent, canActivate: [AdminGuard]
    },
    {
      path:'add-video',component:AddVideoComponent,canActivate: [AdminGuard]
    },
    {
      path:'list-video',component:ListVideoComponent,canActivate: [AdminGuard]
    },

    {
      path:'add-censor/:id',component:AddCensorComponent,canActivate: [AdminGuard]
    },
    {
      path:'add-links/:id',component:AddLinksComponent,canActivate: [AdminGuard]
    },

    {
      path: 'no-access', component: NoAccessComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
