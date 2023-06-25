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
      return;
    } else {
      this.apiService.addItem('Message', this.form.value).subscribe((data) => {
        this.notification.notify('Message has been sent');
        // Submit the complaint form data to the server
        console.log('Form submitted successfully:', this.form.value);
        this.form.reset();
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
