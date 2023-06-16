import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  helper : JwtHelperService = new JwtHelperService();
  data !: string | null;
  encryptedToken !: string;

  constructor() {
    this.decryptLocalStorageData();
  }

  private decryptLocalStorageData() {
    this.data = localStorage.getItem('MindMission');
    if(this.data) {
      this.encryptedToken = CryptoJS.AES.decrypt(this.data, environment.secretKey).toString(CryptoJS.enc.Utf8)
    }
  }

  checkTokenExpiration(): boolean {
    this.decryptLocalStorageData();
    if(this.data) {
      return !this.helper.isTokenExpired(this.encryptedToken);
    }
    return false;
  }

  decodeToken() {
    this.decryptLocalStorageData()
    return this.helper.decodeToken(this.encryptedToken);
  }
}
