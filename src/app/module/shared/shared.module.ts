import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from 'src/app/utils/headers-interceptor';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TimeFormatPipe } from './time-format.pipe';

@NgModule({
  declarations: [
    TimeFormatPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatListModule,
    MatSidenavModule,

  ],
  exports:[FormsModule,HttpClientModule,MatListModule,MatSidenavModule,TimeFormatPipe],
  providers:[ApiService,{
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor,
    multi: true
  }]
})
export class SharedModule { }
