import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from './customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiURL = 'api/customer/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.httpClient
      .get<Customer[]>(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  create(customer): Observable<Customer> {
    return this.httpClient
      .post<Customer>(this.apiURL, JSON.stringify(customer), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(customerId): Observable<Customer> {
    return this.httpClient
      .get<Customer>(this.apiURL + customerId)
      .pipe(catchError(this.errorHandler));
  }

  update(customerId, customer): Observable<Customer> {
    return this.httpClient
      .put<Customer>(
        this.apiURL + customerId,
        JSON.stringify(customer),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(customerId) {
    return this.httpClient
      .delete<Customer>(this.apiURL + customerId, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
