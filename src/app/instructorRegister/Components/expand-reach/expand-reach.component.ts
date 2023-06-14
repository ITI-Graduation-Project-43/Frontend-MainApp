import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private Cookie: CookieService
  ) {
    this.myForm = this.fb.group({
      reach: ['', Validators.required],
    });
  }
  goback() {
    this.router.navigateByUrl('instructorRegister/videoAssessment');
  }
  onSubmit() {
    if (this.myForm.invalid) {
      return;
    }
    const selectedValue = this.myForm.get('reach')?.value;
    this.Cookie.set('reach', selectedValue, { expires: 7 });
    this.router.navigateByUrl('homeinstructor'); // update with instructor profile
  }
}
