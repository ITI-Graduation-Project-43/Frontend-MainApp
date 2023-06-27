import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../Services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  helper : JwtHelperService = new JwtHelperService();
  data !: string | null;
  decryptedData !: string;
  user !: any;
  encryptedToken !: string;

  constructor(private NotificationService: NotificationService) {
    this.decryptLocalStorageData();
  }

  private decryptLocalStorageData() {
    this.data = localStorage.getItem('MindMission');
    if(this.data) {
      this.decryptedData = CryptoJS.AES.decrypt(this.data, environment.secretKey).toString(CryptoJS.enc.Utf8);
      this.encryptedToken = (JSON.parse(this.decryptedData)).Token;
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
    return this.helper.decodeToken(this.encryptedToken)
  }

  getUserInfo(): any {
    this.decryptLocalStorageData();
    return JSON.parse(this.decryptedData).User;
  }

  updateUserInfo(user: any) {
    let encryptedUserData = CryptoJS.AES.encrypt(JSON.stringify({User: user, Token: this.encryptedToken}), environment.secretKey).toString();
    localStorage.setItem("MindMission", encryptedUserData);
    this.NotificationService.notify("new", "hide");
  }
}
