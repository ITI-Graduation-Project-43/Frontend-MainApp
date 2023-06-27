import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from 'src/app/Shared/Services/api.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  submit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private notification: NotificationService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }
  ngOnInit(): void {}
  onSubmit() {
    if (this.form.invalid) {
      this.notification.notify(
        'Complete Fields First with Valid data',
        'error'
      );

      return;
    } else {
      this.submit = true;
      this.apiService.addItem('Message', this.form.value).subscribe((data) => {
        this.notification.notify('Message has been sent');
        this.form.reset();
        this.submit = false;
      });
    }
  }

  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get message() {
    return this.form.get('message');
  }
}
