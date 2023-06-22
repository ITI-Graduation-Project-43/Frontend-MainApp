import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/Shared/Services/api.service';
import {LocalStorageService} from '../../../Shared/Helper/local-storage.service'
import { NotificationService } from 'src/app/Shared/Services/notification.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent {
  openChangeEmail : boolean = false;
  newEmailFlag : boolean = false;
  send : boolean = false;
  showedEmailPass : boolean = true;
  showedPass : boolean = true;
  showedNewPass : boolean = true;
  showedConfirmPass : boolean = true;
  wrongPassword !: boolean;
  wrongCurrentPassword !: boolean;
  passwordCheckMessage !: string;
  emailAddress !: string;
  changePasswordForm !: FormGroup;
  changeEmailForm !: FormGroup;


  constructor(private http: APIService, private router: Router , private fb: FormBuilder, private Notification: NotificationService, private LocalStorageService: LocalStorageService) {
    if(this.LocalStorageService.checkTokenExpiration()) {
      this.emailAddress = this.LocalStorageService.decodeToken().Email;
    }
    this.changeEmailForm = fb.group({
      newEmail: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      password: ['', [Validators.required]],
    })
    this.changePasswordForm = fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)]],
      confirmPassword: ['', [Validators.required]]
    })
  }
  get newEmail() {
    return this.changeEmailForm.get('newEmail')
  }

  get password() {
    return this.changeEmailForm.get('password')
  }

  get currentPassword() {
    return this.changePasswordForm.get('currentPassword')
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword')
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword')
  }

  changeEmail() {
    this.openChangeEmail = !this.openChangeEmail;
  }

  checkEmail(value: string) {
    if(this.newEmail?.valid && value?.trim() != this.emailAddress.trim()) {
      this.send = true;
      this.http.addItem(`User/Email?Email=${value}`, {}).subscribe(data => {
        this.send = false;
        if(!data.success) {
          this.changeEmailForm.get("newEmail")?.setErrors({"isFound": true});
          this.newEmailFlag = false;
        }
        else {
          this.newEmailFlag = true;
        }
      });
    }
  }

  changeEmailAddress(e: Event) {
    e.preventDefault();
    if(this.changeEmailForm.valid) {
      this.changeEmailForm.value.oldEmail = this.emailAddress;
      this.send = true;
      let observer = {
        next: (data: any) => {
          if(data.success) {
            this.emailAddress = this.newEmail?.value;
          }
        },
        complete: () => {
          this.send = false;
          this.newEmailFlag = false;
          this.changeEmailForm.reset();
          this.Notification.notify("The email is updated successfully");
          localStorage.removeItem("MindMission");
        },
        error: () => {
          this.changeEmailForm.markAllAsTouched();
          this.send = false;
          this.wrongPassword = true;
        }
      }
      this.http.addItem("User/Change/Email", this.changeEmailForm.value).subscribe(observer);
    }
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
    if(value !== this.newPassword?.value) {
      this.confirmPassword?.setErrors({"notMatched": true})
    }
  }

  changePassword(e: Event) {
    e.preventDefault();
    if(this.changePasswordForm.valid) {
      delete this.changePasswordForm.value.confirmPassword
      this.changePasswordForm.value.Email = this.emailAddress;
      this.send = true;
      let observer = {
        next: (data: any) => {
          if(data.success) {
            this.changePasswordForm.reset();
            this.Notification.notify("The password is updated successfully");
          }
        },
        complete: () => {
          this.send = false;
        },
        error: () => {
          this.changePasswordForm.markAllAsTouched();
          this.send = false;
          this.wrongCurrentPassword = true;
        }
      }
      this.http.addItem("User/Change/Password", this.changePasswordForm.value).subscribe(observer);
    }
  }

  showPassword(password: any, inputName: string): void {
    switch(inputName) {
      case 'showedPass':
        if(this.showedPass) {
          password.type = "text";
        }
        else {
          password.type = "password";
        }
        this.showedPass = !this.showedPass;
        break;

      case 'showedNewPass':
        if(this.showedNewPass) {
          password.type = "text";
        }
        else {
          password.type = "password";
        }
        this.showedNewPass = !this.showedNewPass;
        break;

      case 'showedConfirmPass':
        if(this.showedConfirmPass) {
          password.type = "text";
        }
        else {
          password.type = "password";
        }
        this.showedConfirmPass = !this.showedConfirmPass;
        break;

      case 'showedEmailPass':
        if(this.showedEmailPass) {
          password.type = "text";
        }
        else {
          password.type = "password";
        }
        this.showedEmailPass = !this.showedEmailPass;
        break;
    }
  }
}
