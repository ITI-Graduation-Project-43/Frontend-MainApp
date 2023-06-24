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
export class UploadService {
  httpOption;
  constructor(protected http: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
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
    return throwError(errorMessage);
  }

  uploadFile(file: File, api: string): Observable<APIResponseVM> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<APIResponseVM>(
        `${environment.APIURL}Azure/${api}`,
        formData,
        this.httpOption
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  deleteFile(fileUrl: string, api: string): Observable<APIResponseVM> {
    return this.http
      .delete<APIResponseVM>(
        `${environment.APIURL}Azure/${api}?fileUrl=${encodeURIComponent(
          fileUrl
        )}`
      )
      .pipe(retry(3), catchError(this.handleError));
  }
}
