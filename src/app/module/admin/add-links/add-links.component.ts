import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-add-links',
  templateUrl: './add-links.component.html',
  styleUrls: ['./add-links.component.scss']
})
export class AddLinksComponent implements OnInit {
  model: any = null;
  id = 0;
  constructor(private api:ApiService,private ar:ActivatedRoute) { 
    this.ar.params.subscribe(x=>{
      if(x["id"]){
        this.id = x["id"];
      }
    })
    this.model = {
      title: "",
      link: "",
      description: "",
      to: "",
      from: "",
      linkPreviewImage: "",
    }
  }

  ngOnInit(): void {
  }
  onFormSubmit(f: NgForm) {
    this.api.postCall('video/video-add-segment/'+this.id,[this.model]).subscribe((x:any)=>{
        alert("Added");
    })
  }
  onFileChange(e:any){
    let file = e.target.files[0];
    var form = new FormData();
    form.append("file",file);
    this.api.postForm("file/upload",form).subscribe((x:any)=>{
      this.model.previewImage = x.data.fileName;
    })
  }
}
