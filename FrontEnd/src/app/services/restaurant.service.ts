import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  /*1. Get restaurant lists */
  Getrestaurant(pagenumber, classification){
    let GetedToken = this.cookieService.get('Token');
    const getrestaurantOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + GetedToken.toString(), 
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };
    return this.http.get<Object>(`http://127.0.0.1:3000/restaurantlists/?page=${pagenumber}&classification=${classification}`, getrestaurantOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /* Error handling */
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