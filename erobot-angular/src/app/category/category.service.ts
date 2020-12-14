import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiURL = "api/category/";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }
   
  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  create(Category): Observable<Category> {
    return this.httpClient.post<Category>(this.apiURL, JSON.stringify(Category), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
   
  find(categoryId): Observable<Category> {
    return this.httpClient.get<Category>(this.apiURL + categoryId)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  update(categoryId, Category): Observable<Category> {
    return this.httpClient.put<Category>(this.apiURL + categoryId, JSON.stringify(Category), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  delete(categoryId){
    return this.httpClient.delete<Category>(this.apiURL+ categoryId, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
