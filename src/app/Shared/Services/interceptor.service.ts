import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let decrypted = CryptoJS.AES.decrypt(localStorage.getItem("Origami") || '', environment.secretKey).toString(CryptoJS.enc.Utf8);
    let tokenizedRequest = req.clone({
      setHeaders:{
        Authorization: `Bearer ${decrypted}`
      }
    })
    return next.handle(tokenizedRequest);
  }
}
