import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import {NotificationService} from './../../../Shared/Services/notification.service'
import { APIService } from 'src/app/Shared/Services/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  helper : JwtHelperService = new JwtHelperService();
  registerForm !: FormGroup;
  registering: boolean = false;
  showedPass : boolean = true;
  showedConfirmPass : boolean = true;
  passwordCheckMessage !: string;

  constructor(private http: APIService, private router: Router , private fb: FormBuilder, private NotificationService: NotificationService) {
    this.registerForm = fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,10}$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,10}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)]],
      ConfirmPassword: ['', [Validators.required]]
    })
  }

  get firstName() {
    return this.registerForm.get('firstName')
  }
  get lastName() {
    return this.registerForm.get('lastName')
  }
  get email() {
    return this.registerForm.get('email')
  }
  get password() {
    return this.registerForm.get('password')
  }
  get ConfirmPassword() {
    return this.registerForm.get('ConfirmPassword')
  }

  checkPasswordStrong(value: string) {
    if(value.toLowerCase() === value) {
      this.passwordCheckMessage = "The password must contains one upper character at least"
      return;
    }
    if(value.toUpperCase() === value) {
      this.passwordCheckMessage = "The password must contains one lower character at least"
      return;
    }
    if(!(/.*\d.*/).test(value)) {
      this.passwordCheckMessage = "The password must contains one number at least"
      return;
    }
    if(!(/.*[\W_].*/).test(value)) {
      this.passwordCheckMessage = "The password must contains one specail character at least"
      return;
    }
  }

  checkEmail(value: string) {
    if(this.email?.valid) {
      this.http.addItem(`User/Email?Email=${value}`, {}).subscribe(data => {
        if(!data.success) {
          this.registerForm.get("email")?.setErrors({"isFound": true})
        }
      });
    }
  }

  CheckMatched(value: string) {
    if(value !== this.password?.value) {
      this.ConfirmPassword?.setErrors({"notMatched": true})
    }
  }

  register(e: Event, submit: HTMLElement) {
    e.preventDefault();
    if(this.registerForm.valid && !this.registering) {
      submit.classList.add("send");
      this.registering = true;
      let observer = {
        next: (data: any) => {
          if(data.success) {
            submit.classList.remove("send");
            this.registering = false;
          }
        },
        complete: () => {
          submit.classList.remove("send");
          this.registering = false;
          this.router.navigateByUrl("/login");
        },
        error: () => {
          this.registerForm.markAllAsTouched();
          submit.classList.remove("send");
          this.registering = false;
        }
      }
      delete this.registerForm.value.ConfirmPassword;
      this.http.addItem("User/Register/Student", this.registerForm.value).subscribe(observer);
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }

  showPassword(password: any): void {
    if(this.showedPass) {
      password.type = "text";
    }
    else {
      password.type = "password";
    }
    this.showedPass = !this.showedPass;
  }

  showConfirmPassword(password: any) {
    if(this.showedConfirmPass) {
      password.type = "text";
    }
    else {
      password.type = "password";
    }
    this.showedConfirmPass = !this.showedConfirmPass;
  }
}
