import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponseVM } from '../ViewModels/apiresponse-vm';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  httpOption;
  constructor(private http: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
  }

  private handleError(err: HttpErrorResponse) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.error.errmsg
    })
    return throwError(function() {
      return new Error("Error occur, please try again!");
    })
  }

  getAllItem(APIRoute: string): Observable<APIResponseVM> {
    return this.http.get<APIResponseVM>(`${environment.APIURL}/${APIRoute}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  addItem(APIRoute: string, object: any):Observable<APIResponseVM> {
    return this.http.post<APIResponseVM>(`${environment.APIURL}/${APIRoute}`, object)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  updateItem(APIRoute: string, object: any):Observable<APIResponseVM> {
    return this.http.patch<APIResponseVM>(`${environment.APIURL}/${APIRoute}`, object)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  deleteItem(APIRoute: string):Observable<APIResponseVM> {
    return this.http.delete<APIResponseVM>(`${environment.APIURL}/${APIRoute}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }
}
