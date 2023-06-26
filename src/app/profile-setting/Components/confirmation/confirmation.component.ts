import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {LocalStorageService} from '../../../Shared/Helper/local-storage.service'
import { APIService } from 'src/app/Shared/Services/api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnDestroy{
  showed : boolean = true;
  sending: boolean = false;
  wrongEmailOrPassword : boolean = false;
  confirmForm !: FormGroup;
  unSubscribe !: Subscription

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: APIService, private dialogRef: MatDialogRef<ConfirmationComponent>, private fb: FormBuilder, private LocalStorageService: LocalStorageService) {
    this.confirmForm = fb.group({
      password: ['', [Validators.required]]
    })
  }

  get password() {
    return this.confirmForm.get('password')
  }

  cancel() {
    this.dialogRef.close(false);
  }

  ok(e: Event) {
    e.preventDefault();
    if(this.confirmForm.valid && !this.sending) {
      this.sending = true;
      let observer = {
        next: (data: any) => {
          if(data.success) {
            this.sending = false;
          }
        },
        complete: () => {
          this.dialogRef.close(true);
        },
        error: () => {
          this.wrongEmailOrPassword = true;
          this.sending = false;
        }
      }
      this.confirmForm.value.email = this.LocalStorageService.decodeToken().Email;
      this.unSubscribe = this.http.addItem(`User/${this.data.action}`, this.confirmForm.value).subscribe(observer);
    }
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

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }
}
