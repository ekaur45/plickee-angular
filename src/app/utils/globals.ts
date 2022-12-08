
import { Injectable } from "@angular/core";


@Injectable()
export class Globals {

  public get User(){
    var user = localStorage.getItem("user");
    if(user){
      return JSON.parse(user);
    }
    return {};
  }  
}