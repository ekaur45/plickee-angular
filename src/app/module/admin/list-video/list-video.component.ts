import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-list-video',
  templateUrl: './list-video.component.html',
  styleUrls: ['./list-video.component.scss']
})
export class ListVideoComponent implements OnInit {
videos:any[] = [];
assetsUrl = environment.baseUrl;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllVideos();
  }
  getAllVideos() {
    this.api.getCall('video/my-videos').subscribe((res:any) => {
      this.videos = res.data
    })
  }
  onDeleteClick(id:number){
    this.api.getCall('video/delete/'+id).subscribe((x:any)=>{
      this.getAllVideos();
    })
  }
}
