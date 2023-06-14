import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-share-knowledge',
  templateUrl: './share-knowledge.component.html',
  styleUrls: ['./share-knowledge.component.scss'],
})
export class ShareKnowledgeComponent {
  myForm: FormGroup;
  options = [
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
    { value: 'both', label: 'Both' },
    { value: 'other', label: 'Other' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private Cookie: CookieService
  ) {
    this.myForm = this.fb.group({
      teaching: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      return;
    }
    const selectedValue = this.myForm.get('teaching')?.value;
    this.Cookie.set('teaching', selectedValue, { expires: 7 });
    this.router.navigateByUrl('instructorRegister/videoAssessment');
  }
}
