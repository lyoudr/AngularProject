import { Injectable } from '@angular/core';
import { 
  HttpClient, 
  HttpHeaders, 
  HttpErrorResponse, 
  HttpRequest,
  HttpEventType,
  HttpResponse 
} from '@angular/common/http';
import { Subject } from 'rxjs';
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

  /*2. Upload images */
  public upload(files: Set<File>): { [key: string]: { progress: Observable<number> , returneddata : Observable<any> } } {
    // this will be the our resulting map
    const status: { 
      [key: string]: { 
        progress: Observable<number>, 
        returneddata : Observable<any> 
      }
    } = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append("file", file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest("POST", 'http://127.0.0.1:3000/postimages', formData, {
        reportProgress: true,
        responseType: 'text'
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();
      const returneddata = new Subject<any>();

      // send the http-request and subscribe for progress-updates

      let startTime = new Date().getTime();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage
          const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
          returneddata.next(event.body);
          returneddata.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable(),
        returneddata : returneddata.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }

  /*3. GetBig Data */
  public GetBigData(): Observable<any> {
    let GetedToken = this.cookieService.get('Token');
    const getBigDataOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + GetedToken.toString(), 
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };
    return this.http.get<any>('http://127.0.0.1:3000/getbigdata', getBigDataOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /*3. GetBig Data2 */
  public GetBigData2(): Observable<any> {
    let GetedToken = this.cookieService.get('Token');
    const getBigDataOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + GetedToken.toString(), 
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };
    return this.http.get<any>('http://127.0.0.1:3000/getbigdata2', getBigDataOptions)
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