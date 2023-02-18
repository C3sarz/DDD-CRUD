import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReportAggregate } from 'src/app/reports/report';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  // Backend
  private url = 'http://localhost:5000/api';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Host': 'http://localhost:4200',
    })
  };

  // Error handling (From Angular)
  private handleError(error: HttpErrorResponse) {

    // Client-side HTTP error.
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    }
    // Server-side error
    else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('HTTP request error: ' + error.statusText));
  }

  constructor(
    private http: HttpClient) {
  }

  /// Get all reports from backend
  getReports(): Observable<ReportAggregate[]> {
    return this.http.get<ReportAggregate[]>(
      this.url + '/Report',
      this.httpOptions
    )
      .pipe(catchError(this.handleError));
  }

  /// Get report by ID
  getReport(id: number): Observable<ReportAggregate> {
    return this.http.get<ReportAggregate>(
      this.url + '/Report/' + id,
      this.httpOptions
    )
      .pipe(catchError(this.handleError));
  }

  /// Create new Report
  createReport(report: ReportAggregate): Observable<ReportAggregate> {
    return this.http.post<ReportAggregate>(
      this.url + '/Report/',
      report,
      this.httpOptions
    )
      .pipe(catchError(this.handleError));
  }

  /// Update or create Report
  upsertReport(report: ReportAggregate): Observable<ReportAggregate> {
    return this.http.put<ReportAggregate>(
      this.url + '/Report/',
      report,
      this.httpOptions
    )
      .pipe(catchError(this.handleError));
  }

  /// Delete a report by ID
  deleteReport(id: number): Observable<ReportAggregate> {
    return this.http.delete<ReportAggregate>(
      this.url + '/Report/' + id,
      this.httpOptions
    )
      .pipe(catchError(this.handleError));
  }
}
