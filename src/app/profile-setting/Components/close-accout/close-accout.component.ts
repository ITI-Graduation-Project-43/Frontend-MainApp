import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/Shared/Services/api.service';
import {LocalStorageService} from '../../../Shared/Helper/local-storage.service'
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-close-accout',
  templateUrl: './close-accout.component.html',
  styleUrls: ['./close-accout.component.scss']
})
export class CloseAccoutComponent {
  send: boolean = false;
  confirmDeleteForm !: FormGroup;
  constructor(private http: APIService, private router: Router, private fb: FormBuilder, private LocalStorageService: LocalStorageService, private Notification: NotificationService) {
    this.confirmDeleteForm = fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      password: ['', [Validators.required]],
    })
  }

  get newEmail() {
    return this.confirmDeleteForm.get('email')
  }

  get password() {
    return this.confirmDeleteForm.get('password')
  }

  closeAccount() {
    if(confirm("Are you sure to close your account?")) {
      this.send = true;
      let observer = {
        next: (data: any) => {
          if(data.success) {
          }
        },
        complete: () => {
          this.send = false;
          localStorage.removeItem("MindMission");
        },
        error: () => {
          this.send = false;
          this.Notification.notify("The email is updated successfully");
        }
      }
      this.http.addItem("User/Delete", {}).subscribe(observer);
    }
  }
}
