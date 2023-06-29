import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APIService } from 'src/app/Shared/Services/api.service';
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

  constructor(private http: APIService, private router: Router , private fb: FormBuilder) {
    let registerFormSessionStorage =  sessionStorage.getItem("registerForm");
    let registerFormData;
    if(registerFormSessionStorage) {
      registerFormData = JSON.parse(registerFormSessionStorage);
    }
    this.registerForm = fb.group({
      firstName: [registerFormData?.firstName, [Validators.required, Validators.pattern(/^[a-zA-Z]{3,30}$/)]],
      lastName: [registerFormData?.lastName, [Validators.required, Validators.pattern(/^[a-zA-Z]{3,30}$/)]],
      email: [registerFormData?.email, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      password: [registerFormData?.password, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)]],
      ConfirmPassword: [registerFormData?.password, [Validators.required]]
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

  register(e: Event) {
    e.preventDefault();
    if(this.registerForm.valid) {
      delete this.registerForm.value.ConfirmPassword;
      sessionStorage.setItem("registerForm", JSON.stringify(this.registerForm.value));
      this.router.navigateByUrl("instructorRegister/shareknowledge")
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
