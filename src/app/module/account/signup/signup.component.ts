import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { SignupModel } from '../models/signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  model:SignupModel;
  step:number = 1;
  constructor(private api:ApiService) { 

    this.model = new SignupModel();
  }

  ngOnInit(): void {
  }
  onPersonalInfoClick(f:NgForm){
    //this.step = 2;
    this.api.postCall('account/create',this.model.personalInfo).subscribe(x=>{
      console.log(x);
    })
  }
}
