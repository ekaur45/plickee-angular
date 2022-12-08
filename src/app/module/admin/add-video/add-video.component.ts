import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { AddVideoModel, MovieCategoryEnum } from '../models/add-video.model';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
model:AddVideoModel;
  constructor(private api: ApiService,private router:Router) { 
    this.model = new  AddVideoModel();
  }

  ngOnInit(): void {
  }
  onVideoChange(e:any){
    this.model.file =e.target.files[0];
  }
  onThumbnailChange(e:any){
    this.model.thumbnail =e.target.files[0];
  }
  onFormSubmit(f:NgForm){
    var form = new FormData();
    form.append("title", this.model.title ?? "");
    form.append("description", this.model.description ?? "");
    form.append("file", this.model.file ?? "");
    form.append("thumbnail", this.model?.thumbnail, "thumbnail");
    form.append("category",this.model.category+""??"");
    form.append("quality",this.model.quality+""??"");
    form.append("releaseYear",this.model.releaseYear+""??"");
    form.append("language",this.model.language+""??"");
    form.append("duration",this.model.duration+""??"");
    this.api.postCall('video/upload',form).subscribe((x:any)=>{
      this.router.navigate(['/admin/list-video']);
    })
  }
}
