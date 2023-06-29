import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponseVM } from '../ViewModels/apiresponse-vm';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  httpOption;
  constructor(protected http: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Content-Type': ' multipart/form-data',
      }),
    };
  }

  protected handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    // console.error(errorMessage);
    return throwError(errorMessage);
  }

  getAllItem(APIRoute: string): Observable<APIResponseVM> {
    const url = `${environment.APIURL}${APIRoute}`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }

  getItemById(APIRoute: string, id: any): Observable<APIResponseVM> {
    const url = `${environment.APIURL}${APIRoute}/${id}`;
    return this.http
      .get<APIResponseVM>(url)
      .pipe(retry(3), catchError(this.handleError));
  }

  addItem(APIRoute: string, object: any): Observable<APIResponseVM> {
    return this.http
      .post<APIResponseVM>(`${environment.APIURL}${APIRoute}`, object)
      .pipe(retry(3), catchError(this.handleError));
  }

  updateItem(APIRoute: string, object: any): Observable<APIResponseVM> {
    return this.http
      .patch<APIResponseVM>(`${environment.APIURL}${APIRoute}`, object)
      .pipe(retry(3), catchError(this.handleError));
  }
  replaceItem(
    APIRoute: string,
    id: number,
    object: any
  ): Observable<APIResponseVM> {
    return this.http
      .put<APIResponseVM>(`${environment.APIURL}${APIRoute}/${id}`, object)
      .pipe(retry(3), catchError(this.handleError));
  }

  deleteItem(APIRoute: string): Observable<APIResponseVM> {
    return this.http
      .delete<APIResponseVM>(`${environment.APIURL}${APIRoute}`)
      .pipe(retry(3), catchError(this.handleError));
  }
}
