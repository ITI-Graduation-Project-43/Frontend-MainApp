import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/Shared/Services/api.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
@Component({
  selector: 'app-expand-reach',
  templateUrl: './expand-reach.component.html',
  styleUrls: ['./expand-reach.component.scss'],
})
export class ExpandReachComponent {
  myForm: FormGroup;
  options = [
    { value: 'beginner', label: 'Not at the moment' },
    { value: 'rocky', label: 'I have a small following' },
    { value: 'pro', label: 'I have a sizeable following' },
  ];
  registering: boolean = false;
  registerForm : any;

  constructor(private http: APIService, private fb: FormBuilder, private router: Router, private notificationService: NotificationService) {
    let reachFormData = sessionStorage.getItem("reach");
    let registerFormSessionStorage = sessionStorage.getItem("registerForm")
    if(registerFormSessionStorage) {
      this.registerForm = JSON.parse(registerFormSessionStorage);
    }
    this.myForm = this.fb.group({
      reach: [reachFormData, Validators.required],
    });
    document.querySelector(".app-header")?.classList.remove("dark-background");
    console.log(this.registerForm);
  }
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const selectedValue = this.myForm.get('reach')?.value;
    sessionStorage.setItem('reach', selectedValue);
    if(this.registerForm && !this.registering)
    this.registering = true;
    let observer = {
      next: (data: APIResponseVM) => {
        if(data.success) {
          this.registering = false;
          sessionStorage.clear()
          this.notificationService.notify("Signup successfully");
          this.router.navigateByUrl("/login");
        }
      },
      error: () => {
        this.registering = false;
      }
    }
    this.http.addItem("User/Register/Instructor", this.registerForm).subscribe(observer);
  }
}
