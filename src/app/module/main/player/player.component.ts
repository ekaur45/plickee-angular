import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../shared/api.service';
import { VideoPlayer } from './video-model';
import {default as lottieWeb} from 'lottie-web';
declare const $:any;
const everything = function(element:any) { 
  const shadow = element;

    const audioPlayerContainer = element.querySelector('#audio-player-container');
    const playIconContainer = element.querySelector('#play-icon');
    const seekSlider = element.querySelector('#seek-slider');
    const volumeSlider = element.querySelector('#volume-slider');
    const muteIconContainer = element.querySelector('#mute-icon');
    const audio = shadow.querySelector('video');
    const durationContainer = element.querySelector('#duration');
    const currentTimeContainer = element.querySelector('#current-time');
    const outputContainer = element.querySelector('#volume-output');
    let playState = 'play';
    let muteState = 'unmute';
    let raf:any = null;

    //audio.src = element.getAttribute('data-src');

    // const playAnimation = lottieWeb.loadAnimation({
    //     container: playIconContainer,
    //     path: 'https://assets10.lottiefiles.com/packages/lf20_6vmErDSRUk.json',
    //     renderer: 'svg',
    //     loop: false,
    //     autoplay: false,
    //     name: "Play Animation",
    // });
          
    // const muteAnimation = lottieWeb.loadAnimation({
    //     container: muteIconContainer,
    //     path: 'https://assets5.lottiefiles.com/packages/lf20_30WwocmejE.json',
    //     renderer: 'svg',
    //     loop: false,
    //     autoplay: false,
    //     name: "Mute Animation",
    // });
          
    //playAnimation.goToAndStop(14, true);

    const whilePlaying = () => {
        seekSlider.value = Math.floor(audio.currentTime);
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
        audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
        raf = requestAnimationFrame(whilePlaying);
    }

    const showRangeProgress = (rangeInput:any) => {
        if(rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
        else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    }

    const calculateTime = (secs:any) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    }
        
    const displayDuration = () => {
        durationContainer.textContent = calculateTime(audio.duration);
    }
        
    const setSliderMax = () => {
        seekSlider.max = Math.floor(audio.duration);
    }
        
    const displayBufferedAmount = () => {
        //const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
        //audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
    }

    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
        });
    }

    playIconContainer.addEventListener('click', () => {
        if(playState === 'play') {
            audio.play();
            //playAnimation.playSegments([14, 27], true);
            $("#play-icon").html('<i id="p-play" class="bi bi-pause"></i>')
            requestAnimationFrame(whilePlaying);
            playState = 'pause';
          } else {
            audio.pause();
            $("#play-icon").html('<i id="p-play" class="bi bi-play"></i>')
            //playAnimation.playSegments([0, 14], true);
            cancelAnimationFrame(raf);
            playState = 'play';
        }
    });
        
    muteIconContainer.addEventListener('click', () => {
        if(muteState === 'unmute') {
            //muteAnimation.playSegments([0, 15], true);
            audio.muted = true;
            $("#mute-icon").html('<i id="p-volume" class="bi bi-volume-mute"></i>')
            muteState = 'mute';
        } else {
            //muteAnimation.playSegments([15, 25], true);
            $("#mute-icon").html('<i id="p-volume" class="bi bi-volume-down"></i>')
            audio.muted = false;
            muteState = 'unmute';
        }
    });

    audio.addEventListener('progress', displayBufferedAmount);

    seekSlider.addEventListener('input', (e:any) => {
        showRangeProgress(e.target);
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
        if(!audio.paused) {
            cancelAnimationFrame(raf);
        }
    });

    seekSlider.addEventListener('change', () => {
        audio.currentTime = seekSlider.value;
        if(!audio.paused) {
            requestAnimationFrame(whilePlaying);
        }
    });

    volumeSlider.addEventListener('input', (e:any) => {
        const value = e.target.value;
        showRangeProgress(e.target);
        outputContainer.textContent = value;
        audio.volume = value / 100;
        if(audio.volume == 0){
          $("#mute-icon").html('<i id="p-volume" class="bi bi-volume-mute"></i>');
        }
        if(audio.volume >= 0){
          $("#mute-icon").html('<i id="p-volume" class="bi bi-volume-down"></i>');
        }
        if(audio.volume >= 50){
          $("#mute-icon").html('<i id="p-volume" class="bi bi-volume-up"></i>');
        }
    });

    if('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: 'Komorebi',
            artist: 'Anitek',
            album: 'MainStay',
            artwork: [
                { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '96x96', type: 'image/png' },
                { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '128x128', type: 'image/png' },
                { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '192x192', type: 'image/png' },
                { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '256x256', type: 'image/png' },
                { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '384x384', type: 'image/png' },
                { src: 'https://assets.codepen.io/4358584/1.300.jpg', sizes: '512x512', type: 'image/png' }
            ]
        });
        navigator.mediaSession.setActionHandler('play', () => {
            if(playState === 'play') {
                audio.play();
                $("#play-icon").html('<i id="p-play" class="bi bi-pause"></i>')
                //playAnimation.playSegments([14, 27], true);
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
            } else {
                audio.pause();
                //playAnimation.playSegments([0, 14], true);
                $("#play-icon").html('<i id="p-play" class="bi bi-play"></i>')
                cancelAnimationFrame(raf);
                playState = 'play';
            }
        });
        navigator.mediaSession.setActionHandler('pause', () => {
            if(playState === 'play') {
                audio.play();
                //playAnimation.playSegments([14, 27], true);
                $("#play-icon").html('<i id="p-play" class="bi bi-pause"></i>')
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
            } else {
                audio.pause();
                //playAnimation.playSegments([0, 14], true);
                $("#play-icon").html('<i id="p-play" class="bi bi-play"></i>')
                cancelAnimationFrame(raf);
                playState = 'play';
            }
        });
        navigator.mediaSession.setActionHandler('seekbackward', (details) => {
            audio.currentTime = audio.currentTime - (details.seekOffset || 10);
        });
        navigator.mediaSession.setActionHandler('seekforward', (details) => {
            audio.currentTime = audio.currentTime + (details.seekOffset || 10);
        });
        navigator.mediaSession.setActionHandler('seekto', (details) => {
            if (details.fastSeek && 'fastSeek' in audio) {
              audio.fastSeek(details.seekTime);
              return;
            }
            audio.currentTime = details.seekTime;
        });
        navigator.mediaSession.setActionHandler('stop', () => {
            audio.currentTime = 0;
            seekSlider.value = 0;
            audioPlayerContainer.style.setProperty('--seek-before-width', '0%');
            currentTimeContainer.textContent = '0:00';
            if(playState === 'pause') {
                //playAnimation.playSegments([0, 14], true);
                $("#play-icon").html('<i id="p-play" class="bi bi-play"></i>')
                cancelAnimationFrame(raf);
                playState = 'play';
            }
        });
    }
}
// class AudioPlayer extends HTMLElement {
//   constructor() {
//       super();
//       const template = document.querySelector('#template');
//       if(template){
//         const templateContent = template.childNodes[0];
//         const shadow = this.attachShadow({mode: 'open'});
//         shadow.appendChild(templateContent.cloneNode(true));
//       }
//   }

//   connectedCallback() {
//       everything(this);
//   }
// }


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
        setTimeout(() => {
          everything(document.getElementById('template'))
          //customElements.define('audio-player', AudioPlayer);
        }, 1);
        //this.getVideo();
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
      //this.initialize();
      this.getLinks()
      this.getVideoCensor()
      this._video = x.data;
      //customElements.define('audio-player', AudioPlayer);
      //this.runTimer()
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
