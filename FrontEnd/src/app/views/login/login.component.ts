import { Component } from '@angular/core';
import { LoginService } from '../../auth/auth.service';
import { SearchService } from '../../services/accountsearch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService, 
    private searchService: SearchService,
    private cookieService : CookieService
  ) {}
  
  /* 1. 用帳號密碼去打第一支 API，得到 Accesstoken */
  ObtainAccessToken(username: string, password : number):void{
    this.loginService.ObtainAccessToken(username, password)
      .subscribe(
        (data) => {
          console.log('回來的 token 是 =>', data);
          this.cookieService.set('Token',`${data.token}`);
          //this.login(data);
          //從 login service 得到 redirect URL, 若得不到，代表登入成功，就登入我們設定的頁面。
          let redirect = this.loginService.redirectUrl ? 
          this.loginService.redirectUrl : '/accountlist';
          // Redirect the user
          this.router.navigate([redirect]);
        },
        (error) => { 
          console.log('error in login is =>', error)
          if(error == '401'){
            console.log('錯誤是 401')
          }
        }
      )
  }
  
  /* 2. 拿 Ａccesstoken 去打第二支 Login API，並且登入頁面 */
  login(AccessedToken):void {
    this.loginService.login(AccessedToken)
      .subscribe(
        (data) => {
          if(data){
            this.cookieService.set('refreshtoken',`${data.result.userTokenSession.token}`);
            console.log('cookie has been set');
            //從 login service 得到 redirect URL, 若得不到，代表登入成功，就登入我們設定的頁面。
            let redirect = this.loginService.redirectUrl ? 
            this.loginService.redirectUrl : '/accountlist';
            // Redirect the user
            this.router.navigate([redirect]);
          }
        },
        (error) => { 
          console.log('error in login is =>', error)
          if(error == '401'){
            console.log('錯誤是 401')
          }
        }
      )
  }
}
