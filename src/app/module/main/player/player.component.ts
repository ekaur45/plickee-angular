import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VideoPlayer } from './video-model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit,AfterViewInit  {
  @ViewChild('playerVideo',{static:false}) video?: ElementRef<HTMLVideoElement>;
  
  videoPlayer:VideoPlayer;
  constructor() { 
    this.videoPlayer = new  VideoPlayer();
  }
  ngAfterViewInit(): void {
    this.initialize();
    this.runTimer()
  }

  ngOnInit(): void {

  }
  initialize(){
    let element = null;
    if(this.video&&this.video.nativeElement){
      element = this.video.nativeElement;
      let _this = this;
      element.onplay = ()=>{
          console.log("played");
          this.videoPlayer.isPlaying = true;
      }
      element.onloadedmetadata = ()=>{
        if(this.video &&this.video.nativeElement){
          this.videoPlayer.totalTime = this.video.nativeElement.duration;
        }
      }
      element.onpause = ()=>{
        this.videoPlayer.isPlaying = false;
      }
    }    
  }
  playClick(){
    let element = null;
    if(this.video&&this.video.nativeElement){
      element = this.video.nativeElement;
      let _this = this;
      element.play();
    } 
  }
  pauseClick(){
    let element = null;
    if(this.video&&this.video.nativeElement){
      element = this.video.nativeElement;
      let _this = this;
      element.pause();
    } 
  }
  runTimer(){    
    if(this.video&&this.video.nativeElement){
      if(this.videoPlayer.isPlaying)
        this.videoPlayer.timer  = this.video.nativeElement.currentTime;
    }
    setTimeout(() => {
      this.runTimer();
    },0);
  }
}
