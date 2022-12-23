import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  u = environment.baseUrl;
  products:any[] = [];
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.api.getCall('video/segments/all').subscribe((x:any)=>{
      this.products = x.data;
    })
  }
}
