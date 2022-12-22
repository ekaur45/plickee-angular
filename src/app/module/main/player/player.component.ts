import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../shared/api.service';
import { VideoPlayer } from './video-model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  isBlur = false;
  baseUrl = environment.baseUrl;
  @ViewChild('playerVideo', { static: false }) video?: ElementRef<HTMLVideoElement>;
  filteredLinks:any[] = [];
  links:any[] = []
  censors:any[] = []
  id = 0;
  videoPlayer: VideoPlayer;
  _video:any;
  constructor(private api:ApiService,private router:Router,private ar:ActivatedRoute) {
    ar.params.subscribe(x=>{
      if(x["id"]){
        this.id = x["id"];
        this.getVideo();
      }
    })
    this.videoPlayer = new VideoPlayer();
  }
  ngAfterViewInit(): void {
  
  }

  ngOnInit(): void {
    document.onfullscreenchange = e => {
      this.videoPlayer.isFullScreen = document.fullscreen;
    }
  }
  getVideo(){
    this.api.getCall("video/video/"+this.id).subscribe((x:any)=>{
      this.initialize();
      this.getLinks()
      this.getVideoCensor()
      this._video = x.data;
      this.runTimer()
    })
  }
  getLinks(){
    this.api.getCall("video/video-segments/"+this.id).subscribe((x:any)=>{
      this.links = x.data;
    })
  }
  getVideoCensor(){
    this.api.getCall("video/get-censor/"+this.id+"/video").subscribe((x:any)=>{
      this.censors = x.data;
    })
  }
  initialize() {
    let element = null;
    if (this.video && this.video.nativeElement) {
      element = this.video.nativeElement;
      let _this = this;
      element.onplay = () => {
        console.log("played");
        this.videoPlayer.isPlaying = true;
      }
      element.onloadedmetadata = () => {
        if (this.video && this.video.nativeElement) {
          this.videoPlayer.totalTime = this.video.nativeElement.duration;
        }
      }
      element.onpause = () => {
        this.videoPlayer.isPlaying = false;
      }
    }
  }
  playPause() {
    let element = null;
    if (this.video && this.video.nativeElement) {
      element = this.video.nativeElement;
      let _this = this;
      if (_this.videoPlayer.isPlaying)
        element.pause()
      else
        element.play();

      this.videoPlayer.isPlaying = !this.video.nativeElement.paused;
    }
  }
  playClick() {
    let element = null;
    if (this.video && this.video.nativeElement) {
      element = this.video.nativeElement;
      let _this = this;
      element.play();
    }
  }
  pauseClick() {
    let element = null;
    if (this.video && this.video.nativeElement) {
      element = this.video.nativeElement;
      let _this = this;
      element.pause();
    }
  }
  runTimer() {
    if (this.video && this.video.nativeElement) {
      if (this.videoPlayer.isPlaying){
      this.videoPlayer.totalTime = this.video.nativeElement.duration;
        this.videoPlayer.timer = this.video.nativeElement.currentTime;
        this.videoPlayer.isPlaying = !this.video.nativeElement.paused;
        let filtered =  this.links.filter(x=>x.from<=this.videoPlayer.timer&&x.end>=this.videoPlayer.timer);
        if(filtered.length>0){
          debugger
        }
        if(JSON.stringify(filtered)!=JSON.stringify(this.filteredLinks)){
          debugger
          this.filteredLinks = filtered;
        }

        let filteredCensor =  this.censors.filter(x=>x.from<=this.videoPlayer.timer&&x.to>=this.videoPlayer.timer);
        if(filteredCensor.length>0){
          console.log("blurred");
        }
        this.isBlur = filteredCensor.length>0;
      }
    }
    setTimeout(() => {
      this.runTimer();
    }, 0);
  }
  onBarChange(e: any) {
    let seek = parseInt(e.target.value);// 9%
    if (this.video && this.video.nativeElement) {
      this.video.nativeElement.pause();
      this.video.nativeElement.currentTime = (seek * this.video.nativeElement.duration) / 100;
      this.videoPlayer.timer = this.video.nativeElement.currentTime;
    }
  }
  requestFullScreen() {
    if (this.video && this.video.nativeElement) {
      let el = document.getElementsByClassName("video-container")[0];
      if (!document.fullscreenElement) {
        el.requestFullscreen().catch((err) => {
          this.videoPlayer.isFullScreen = document.fullscreen;
          //alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
        });
        this.videoPlayer.isFullScreen = document.fullscreen;
      } else {
        document.exitFullscreen();
        this.videoPlayer.isFullScreen = document.fullscreen;
      }
    }
  }

  onBarMouseDown(){
    if (this.video && this.video.nativeElement) {
      this.video.nativeElement.pause();
    }
  }
  onBarMouseUp(){
    if (this.video && this.video.nativeElement) {
      this.video.nativeElement.play();
    }
  }
}
