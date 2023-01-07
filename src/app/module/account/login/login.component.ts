import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { LoginModel } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model:LoginModel;
  constructor(private readonly api:ApiService,private router:Router) { 

    this.model = new LoginModel();
  }

  ngOnInit(): void {
  }
  onLoginClick(){
    this.api.postCall('account/login',this.model).subscribe((obj:any)=>{
      console.log(obj.data);
      if(obj.data){
        localStorage.setItem("access-token",obj.data.token);
      localStorage.setItem("user",JSON.stringify(obj.data));
        this.router.navigate(['/']);
      }
    })    
  }
}
