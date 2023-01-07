import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VerficationComponent } from '../verfication/verfication.component';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  openVerfication(){
    this.route.navigate(['/account/verification']);
  }
}
