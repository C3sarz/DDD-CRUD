import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Report} from 'src/app/reports/report';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'ngsw-bypass': 'true',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private endpoint = 'http://localhost:5000/api/Report';
  // private handleError: HandleError;
  
  constructor(
    private http: HttpClient){
    // httpErrorHandler: HttpErrorHandler) {
    // this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

    /** GET heroes from the server */
    getReports(): Observable<Report[]> {
      return this.http.get<Report[]>(this.endpoint ,httpOptions);
    }
}
