import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verfication',
  templateUrl: './verfication.component.html',
  styleUrls: ['./verfication.component.scss']
})
export class VerficationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  onlyNums(event:any){
   if(event.key>0 && event.key<9){

   }
   else{
     event.preventDefault();
   }
  }


}
