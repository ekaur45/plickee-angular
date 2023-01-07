import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { IndexComponent } from './index.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { ProductsComponent } from './products/products.component';
import { PlayerComponent } from './player/player.component';
@NgModule({
  declarations: [
    IndexComponent,
    HomeComponent,
    ProductsComponent,
    PlayerComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    SwiperModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],

})
export class MainModule { }
