import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AddStoreFormat } from '../views/storemanage/addstore/AddStoreFormat';
@Injectable({
  providedIn: 'root'
})

export class StoresearchService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }
  
  /*1. 得到“店家列表”的店家資料 */
  Getstores(pagenumber): Observable<Object>{
    let GetedToken = this.cookieService.get('refreshtoken');
    console.log('Token send into get is=>', GetedToken);
    console.log('Pagenumber is =>', pagenumber);
    const getstoreOptions = {
      headers: new HttpHeaders({ 
        'Authorization': 'Bearer ' + GetedToken.toString(), 
        'Access-Control-Allow-Origin':'*'
      })
    };
    return this.http.get<Object>(`http://127.0.0.1:3000/storeInfo/?page=${pagenumber}`, getstoreOptions)
      .pipe(
          catchError(this.handleError)
      );
  }
  /*2. 搜尋店家 */
  searchStores(){
    return this.http.get('http://127.0.0.1:3000/searchstores')
      .pipe(
        catchError(this.handleError)
      );
  }
  /*3. 新增店家 */
  AddStores(storeInfo: Object): Observable<Object>{
    let GetedToken = this.cookieService.get('refreshtoken');
    let StoreInfo = JSON.stringify(storeInfo);
    console.log('Token send into get is=>', GetedToken);
    let addStoreOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + GetedToken.toString(), 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    }
    return this.http.post<Object>('http://127.0.0.1:3000/register',StoreInfo,addStoreOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  /*3. 得到每個店家的 “店家資料” */
  Geteachstore(id){
    
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
