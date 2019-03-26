import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DiscussService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }
  /*1. 得到"classic" 討論區的列表 */
  Getdiscussion(pagenumber): Observable<Object>{
    let GetedToken = this.cookieService.get('Token');
    const getdiscussionOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + GetedToken.toString(), 
        'Access-Control-Allow-Origin':'*'
      })
    }
  return this.http.get<Object>(`http://127.0.0.1:3000/classicDiscuss/?page=${pagenumber}`,getdiscussionOptions)  
    .pipe(
      catchError(this.handleError)
    );
  }

  /*2. 得到 "classic" 每個列表的詳細資訊 */
  GetdiscussInfo(index):Observable<Object>{
    let GetedToken = this.cookieService.get('Token');
    const getdiscussInfoOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + GetedToken.toString(), 
        'Access-Control-Allow-Origin':'*'
      })
    } 
    return this.http.get<Object>(`http://127.0.0.1:3000/classicInfo/?id=${index}`,getdiscussInfoOptions)
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
