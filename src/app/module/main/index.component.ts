import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/utils/globals';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers:[Globals]
})
export class IndexComponent implements OnInit {

  constructor(public Globals:Globals) { }

  ngOnInit(): void {
  }

}
