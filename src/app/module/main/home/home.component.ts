import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  assetsUrl = environment.baseUrl;
  videos:any[] = [];
  video:any;
  constructor(private api: ApiService,private router:Router) { }

  ngOnInit(): void {
    this.getAllVideos();
  }
  getAllVideos() {
    this.api.getCall('video').subscribe((x:any)=>{
      this.video = x.data[0];
      this.videos = [...x.data,...x.data,...x.data];
    })
  }
  onVideoClick(v:any){
    this.router.navigate(["/play",v.id]);
  }
}
