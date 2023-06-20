import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APIService } from 'src/app/Shared/Services/api.service';
import {NotificationService} from './../../../Shared/Services/notification.service'
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  helper : JwtHelperService = new JwtHelperService();
  loginForm !: FormGroup;
  Id !: string;
  Role !: string;
  showed : boolean = true;
  loging: boolean = false;
  wrongEmailOrPassword : boolean = false;

  constructor(private http: APIService, private fb: FormBuilder, private NotificationService: NotificationService) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['', [Validators.required]]
    })
  }

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  login(e: Event, submit: HTMLElement) {
    e.preventDefault();
    if(this.loginForm.valid && !this.loging) {
      submit.classList.add("send");
      this.loging = true;
      let observer = {
        next: (data: any) => {
          if(data.success) {
            let token = data.items[0].token;
            let decodedToken = this.helper.decodeToken(token);
            this.Id = decodedToken.Id;
            this.Role = decodedToken.Role;
            this.getUser(token);
            submit.classList.remove("send");
            this.loging = false;
          }
        },
        error: () => {
          this.wrongEmailOrPassword = true;
          this.loginForm.markAllAsTouched();
          submit.classList.remove("send");
          this.loging = false;
        }
      }
      this.http.addItem("User/login", this.loginForm.value).subscribe(observer);
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

  getUser(token: any): void {
    let obvserver = {
      next: (data: any) => {
        if(data) {
          let encryptedUserData = CryptoJS.AES.encrypt(JSON.stringify({User: data.items[0], Token: token}), environment.secretKey).toString();
          localStorage.setItem('MindMission', encryptedUserData);
          this.NotificationService.notify("login");
        }
      },
      error: (error: Error) => {
        console.log(error.message);
      }
    }
    this.http.getItemById(`${this.Role}`, this.Id).subscribe(obvserver)
  }

  showPassword(password: any): void {
    if(this.showed) {
      password.type = "text";
    }
    else {
      password.type = "password";
    }
    this.showed = !this.showed;
  }
}
