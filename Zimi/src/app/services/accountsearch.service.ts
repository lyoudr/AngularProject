import { Injectable , inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Accountarray } from '../views/accountlist/accountarray';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
    headers: new HttpHeaders({ 
        'Content-Type': 'application/json'
    })
};

@Injectable({ providedIn: 'root' })


export class SearchService {

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ){}
    
    getToken(){
        //從 cookie 中取得 login 的 token，再用此 token 去打會員列表 API
        let GetedToken = this.cookieService.get('Token');
        const getaccountOptions = {
            headers: new HttpHeaders({ 
                'Authorization': 'Bearer ' + GetedToken.toString(), 
                'Access-Control-Allow-Origin':'*'
            })
        };
        return getaccountOptions; 
    }
    /* 1. Get Account */
    getaccount(pagenumber): Observable<Object> {
        return this.http.get<Object>(`http://127.0.0.1:3000/accountlist/?page=${pagenumber}`, this.getToken())
        .pipe(
            //tap(_=>this.log('fetched accounts')),
            catchError(this.handleError('getaccount',[]))
        );
    }
    /* 2. Search Account By Name of Phone */
    searchAccount(): Observable<Object> {
        return this.http.get<Object>(`http://127.0.0.1:3000/searchaccount`, this.getToken())
        .pipe(
            catchError(this.handleError<Object>('searchAccount', []))
        );
    }
    /* 3. View the AccountInfo detail */
    getAccountInfo(id : string): Observable<Accountarray>{
        return this.http.get<Accountarray>(`http://127.0.0.1:3000/getUserInfo?account=${id}`,this.getToken())
        .pipe(
            catchError(this.handleError<Accountarray>(`getAccountInfo id=${id}`))
        );
    }
    /* 4. 營運後台取得 user all 虛擬幣餘額 */
    getAccountcoin(id : string): Observable<Object> {
        return this.http.get<Object>(`http://127.0.0.1:3000/getCoin?account=${id}`,this.getToken())
        .pipe(
            catchError(this.handleError<Object>(`getAccountcoin id=${id}`))
        );
    }
    /* 5. 營運後台取得 user 停權紀錄 */ 
    getAccountdeactive(id : string): Observable<Object> {
        return this.http.get<Object>(`http://127.0.0.1:3000/user/api/oauth/operation/getUserDeactiveRecord?account=${id}`,this.getToken())
        .pipe(
            catchError(this.handleError<Object>(`getAccountcoin id=${id}`))
        );
    }
    /* 6. Error handling */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        //this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }
}