import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/Shared/Services/api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  forgetPasswordForm !: FormGroup;
  load : boolean = false;
  constructor(private http: APIService, private fb: FormBuilder, private router: Router) {
    this.forgetPasswordForm = fb.group({
      Email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9+_.-]+@(.+)$')]]
    })
  }

  get Email() {
    return this.forgetPasswordForm.get('Email')
  }

  forgetPassword(e: Event, submit: HTMLElement) {
    e.preventDefault();
    if(this.forgetPasswordForm.valid && !this.load) {
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
          this.router.navigateByUrl("/home"); // replace with popup
        },
        error: (error: Error) => {
          console.log(error);
        }
      }
      this.http.addItem(`User/ForgetPassword?Email=${this.Email?.value}`, this.forgetPasswordForm.value).subscribe(observer);
    }
    else {
      this.forgetPasswordForm.markAllAsTouched();
    }
  }
}
