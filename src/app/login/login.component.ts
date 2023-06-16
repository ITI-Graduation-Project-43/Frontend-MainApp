import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { APIService } from '../Shared/Services/api.service';
import {NotificationService} from './../Shared/Services/notification.service'
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  helper : JwtHelperService = new JwtHelperService();
  loginForm!: FormGroup;

  constructor(private http: APIService, private fb: FormBuilder, private NotificationService: NotificationService) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9+_.-]+@(.+)$')]],
      password: ['', [Validators.required]]
    })
  }

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  login(e: Event) {
    e.preventDefault();
    let observer = {
      next: (data: any) => {
        let decodedToken = this.helper.decodeToken(data.items[0].token);
        let encryptedToken = CryptoJS.AES.encrypt(data.items[0].token, environment.secretKey).toString();
        localStorage.setItem('MindMission', encryptedToken);
        if (decodedToken && decodedToken.Role == "Student") {
        }
        if(decodedToken && decodedToken.Role == "Instructor") {
        }
      },
      complete: () => {
        this.NotificationService.notify("login", "login");
      },
      error: () => {
        alert("error");
      }
  }
    this.http.addItem("User/login", this.loginForm.value).subscribe(observer)
  }
}
