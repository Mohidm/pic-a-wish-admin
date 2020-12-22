import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth:AuthService, public route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean>  | Promise< boolean> {
      // const isAuth = this.auth.getToken()
      let authSts=true
      if(!localStorage.getItem('token')){
        authSts=false
        this.route.navigate(["/"])
      }
    return authSts;
  }
  
}
