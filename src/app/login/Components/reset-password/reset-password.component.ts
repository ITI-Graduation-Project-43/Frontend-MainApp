import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm !: FormGroup;
  load : boolean = false;
  showedPass : boolean = true;
  showedConfirmPass : boolean = true;
  queryParams !: any;
  tokenValid : boolean = false;
  passwordCheckMessage !: string;

  constructor(private http: APIService, private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute) {
    this.queryParams = this.activeRoute.snapshot.queryParams;
    this.TokenValidation(this.queryParams?.Email, this.queryParams?.Token);
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    this.resetPasswordForm = fb.group(
      {
        Password: ['', [Validators.required, Validators.pattern(regex)]],
        ConfirmPassword: ['', [Validators.required]]
      }
    )
  }

  get Password() {
    return this.resetPasswordForm.get('Password')
  }

  get ConfirmPassword() {
    return this.resetPasswordForm.get('ConfirmPassword')
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

  CheckMatched(value: string) {
    if(value !== this.Password?.value) {
      this.ConfirmPassword?.setErrors({"notMatched": true})
    }
  }

  TokenValidation(Email: string, Token: string) {
    if(Email && Token) {
      let observer = {
        next: (data: APIResponseVM) => {
          if(!data.success) {
            this.router.navigateByUrl("/login"); // create page that tell the user that this link is expired
          }
          else {
            this.tokenValid = true;
          }
        },
        error: (error: Error) => {
          console.log(error);
        }
      }
      this.http.addItem(`User/ValidateToken?Email=${Email}&Token=${Token}`, {}).subscribe(observer);
    }
    else {
      this.router.navigateByUrl("/login");
    }
  }

  resetPassword(e: Event, submit: HTMLElement) {
    e.preventDefault();
    if(this.resetPasswordForm.valid && !this.load) {
      submit.classList.add("send");
      this.load = true;
      let observer = {
        next: (data: any) => {
          if(data.success) {
            this.load = false;
            submit.classList.remove("send");
          }
        },
        complete: () => {
          // add popup then redirect to login page
          this.router.navigateByUrl("/login");
        },
        error: (error: Error) => {
          console.log(error);
        }
      }
      this.http.addItem(`User/resetpassword`, {Email: this.queryParams?.Email, Token: this.queryParams?.Token, Password: this.Password?.value}).subscribe(observer);
    }
    else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  showPassword(password: any) {
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
