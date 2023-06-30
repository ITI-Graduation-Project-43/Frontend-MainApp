import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../Shared/Helper/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let tokenizedRequest = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.localStorageService.encryptedToken}`
      }
    })
    return next.handle(tokenizedRequest);
  }
}
