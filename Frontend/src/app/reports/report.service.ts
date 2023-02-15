import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Report} from 'src/app/reports/report';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Host' : 'http://localhost:4200',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private endpoint = 'http://localhost:5000/api/Report';


  // Error handling (From Angular)
  private handleError(error: HttpErrorResponse) {

    // Client-side HTTP error.
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
  constructor(
    private http: HttpClient){
  }

    // Get all reports from backend
    getReports(): Observable<Report[]> {
      return this.http.get<Report[]>(this.endpoint ,httpOptions).pipe(
        catchError(this.handleError)
      );
    }
}
