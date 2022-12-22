import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-add-censor',
  templateUrl: './add-censor.component.html',
  styleUrls: ['./add-censor.component.scss']
})
export class AddCensorComponent implements OnInit {
  type:number = 2; // 1 for audio 2 for video (blur)
  model:any = {from:0,to:0}
  id:number = 0;
  list:any[] = [];
  constructor(private ar:ActivatedRoute,private api:ApiService) { 
    ar.params.subscribe(x=>{
      if(x['id']>0){
        this.id =x["id"];
      }
    })
  }

  ngOnInit(): void {
  }
  onFormSubmit(f:NgForm){
    this.list.push({...f.value,type:'video',videoId:this.id});
    this.model = {from:0,to:0}
  }
  onSubmitAll(){
    this.api.postCall('video/add-censors?type='+this.type,this.list).subscribe(x=>{
      console.log({x});
    })
  }
}
