import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse,  } from '@angular/common/http';
import { Observable, of , throwError} from 'rxjs';
import { catchError, map, tap, retry, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 
    'Authorization': 'Basic d2djQ2xpZW50OnRyaHRyanl0MzI0Mw==', 
    'Access-Control-Allow-Origin':'*'})
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //isLoggedIn = false;
  //store the URL so we can redirect after logging in
  redirectUrl : string;
  username: string ;
  password: string ;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  //Get AccessToken
  ObtainAccessToken(username, password):Observable<any>{
    this.username = username;
    this.password = password;
    let params = new URLSearchParams();
    params.append('username',username);
    params.append('password',password);    
    params.append('grant_type','password');

    return this.http.post('http://127.0.0.1:3000/login',params.toString(),httpOptions)
      .pipe(
        catchError(this.handleError)
      )
      /*.subscribe(
        (data) => {
          //this.SaveaccessToken(data);
          this.login(data)
        }
      )*/
  }
  //Save AccessToken and RefreshToken
  /*SaveaccessToken(Data){
    document.cookie = `AccessToken=${Data.access_token}&RefreshToken=${Data.refresh_token}`
    console.log('AccessToken is =>', Data.access_token);
    console.log('RefreshToken is =>',Data.refresh_token);
    console.log('document.cookie is =>',document.cookie);
    this.GetAccessTokenfromCookie();
  }
  //Get AccessToken from Cookie
  GetAccessTokenfromCookie() {
      let ca: Array<string> = document.cookie.split(';');
      let caLen: number = ca.length;
      console.log('ca is=>',ca);
      let cookieName = `AccessToken=`;
      let GetedCookie: string;
      for (let i: number = 0; i < caLen; i += 1) {
        GetedCookie = ca[i].replace(/^\s+/g, '');
        console.log('GetedCookie is =>', GetedCookie);
        if (GetedCookie.indexOf(cookieName) == 0) {
            console.log('Second GetdCookie is =>', GetedCookie.substring(12));
            let part = (GetedCookie.substring(12)).split('&');
            let AccessedToken = part[0];
            let RefreshToken = part[1].substring(13);
            console.log('3.accessedtoken is =>',AccessedToken);
            console.log('3.refreshtoken is =>',RefreshToken);
            this.login(AccessedToken);
        }   
      } 
      return '';   
  }*/
  //Use geted accessToken to Login API
  login(AccessedToken):Observable<any>{
    const Body = {
      username : this.username,
      password : this.password,
      grant_type : "password"
    }
    let JsonBody = JSON.stringify(Body);
    console.log('JsonBody is =>',JsonBody);
    console.log('second accessToken is =>',AccessedToken.access_token);
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ AccessedToken.access_token.toString(), 
        'Content-type': 'application/json; charset=utf-8', 
        'Access-Control-Allow-Origin':'*'
      })
    };
    return this.http.post('http://192.168.50.50:8080/store/api/oauth/login',JsonBody,httpOptions2)
      .pipe(
        catchError(this.handleError)
      )
      /*.subscribe(
        (data) => {
          if(data){
            this.searchService.setToken(data);
            //this.router.navigate(["..//accountlist"],{ relativeTo: this.route });
            this.isLoggedIn = true;
          }
        },
        (error) => { 
          console.log('error in login is =>', error)
          if(error == '401'){
            //this.refresh();
          }
        }
      )*/
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.cookieService.delete('Token');
    this.router.navigate(['/login']);
  }
  //Get RefreshToken from Cookie if accessToken has expired
  /*refresh(){
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    console.log('ca is=>',ca);
    let cookieName = `AccessToken=`;
    let GetedCookie: string;
    for (let i: number = 0; i < caLen; i += 1) {
      GetedCookie = ca[i].replace(/^\s+/g, '');
      console.log('GetedCookie is =>', GetedCookie);
      if (GetedCookie.indexOf(cookieName) == 0) {
          console.log('Second GetdCookie is =>', GetedCookie.substring(12));
          let part = (GetedCookie.substring(12)).split('&');
          let AccessedToken = part[0];
          let RefreshToken = part[1].substring(13);
          console.log('3.accessedtoken is =>',AccessedToken);
          console.log('3.refreshtoken is =>',RefreshToken);
          this.GetNewAccessToken(RefreshToken);
      }   
    } 
    return ''; 
  }*/
  //Use Refresh token to "Get Access Token API" to get new accessToken
  /*GetNewAccessToken(RefreshToken){
    const httpOptions3 = {
      headers : new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 
        'Authorization': 'Basic 2djQ2xpZW50OnRyaHRyanl0MzI0Mw==', 
        'Access-Control-Allow-Origin':'*'})
    }
    let params2 = new URLSearchParams();
    params2.append('grant_type','refresh_token');
    params2.append('refresh_token',`${RefreshToken}`); 
    console.log('params2 is =>',params2);
    this.http.post('http://192.168.50.50:8080/store/api/oauth/token',params2.toString(),httpOptions3)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(
        (data) => {
          console.log('第二次得到的 access token =>',data);
          this.SaveaccessToken(data);
        },
        (error) => { 
          console.log('第二次 error in login is =>', error)
          if(error == '401'){
            this.router.navigate(["..//login"],{ relativeTo: this.route });
          }
        }
    )
  }*/
  //Errorhandling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      console.log('error.status is =>', error.status);
    } 
    // return an observable with a user-facing error message
    return  throwError(`${error.status}`);
  };
}
