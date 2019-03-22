import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  browserRefresh: boolean;
  cookieValue: string;
  constructor(
    private loginService: LoginService, 
    private router: Router,
    private cookieService: CookieService
  ) { }
  

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
  
  checkLogin(url: string): boolean {
    if (this.cookieService.get('Token')){
      console.log('從 cookie 拿到的 LogIn token 是 =>', this.cookieService.get('Token'))
      return true;
    }
    
    console.log('isLoggedIn is false');
    // Store the attempted URL for redirecting
    this.loginService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }

}
