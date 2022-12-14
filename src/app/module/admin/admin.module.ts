import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AddVideoComponent } from './add-video/add-video.component';
import { ListVideoComponent } from './list-video/list-video.component';
import { SharedModule } from '../shared/shared.module';
import { AddCensorComponent } from './add-censor/add-censor.component';
import { AddLinksComponent } from './add-links/add-links.component';


@NgModule({
  declarations: [
    IndexComponent,
    DashboardComponent,
    NoAccessComponent,
    AddVideoComponent,
    ListVideoComponent,
    AddCensorComponent,
    AddLinksComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,

  ]
})
export class AdminModule { }
