import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // let user:any = localStorage.getItem("user");
      // if(user){
      //   user = JSON.parse(user);
      //   if(user.role == 'admin'){
      //     return true;
      //   }
      // }
      // this.router.navigate(['/admin/no-access']);
    return true;
  }
  
}
