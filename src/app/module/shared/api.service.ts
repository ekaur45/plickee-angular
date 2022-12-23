import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.apibaseUrl;
  constructor(private readonly http:HttpClient,private router:Router) { 

  }
  postForm(url:string,data:any){
    return this.http.post(this.baseUrl+url,data);
  }
  postCall(url:string,data:any){
    return this.http.post(this.baseUrl+url,data);
  }
  getCall(url:string){
    return this.http.get(this.baseUrl+url).pipe(map((x:any)=>{
      if(x.status == 401){
        return this.router.navigate(['/account']);
      }
      return x;
    }),(e:any)=>{
      console.log(e);
      
      return e;
    });
  }
}
