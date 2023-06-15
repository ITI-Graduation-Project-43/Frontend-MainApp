import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-assessment',
  templateUrl: './video-assessment.component.html',
  styleUrls: ['./video-assessment.component.scss'],
})
export class VideoAssessmentComponent {
  myForm: FormGroup;
  options = [
    { value: 'beginner', label: 'I’m a beginner' },
    { value: 'knowledge', label: 'I have some knowledge' },
    { value: 'experienced', label: 'I’m experienced' },
    { value: 'pro', label: 'I have videos ready to upload' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.myForm = this.fb.group({
      assessment: ['', Validators.required],
    });
  }
  goback() {
    this.router.navigateByUrl('instructorRegister');
  }
  onSubmit() {
    if (this.myForm.invalid) {
      return;
    }
    const selectedValue = this.myForm.get('assessment')?.value;
    localStorage.setItem('assessment', selectedValue, );
    this.router.navigateByUrl('instructorRegister/expandReach');
  }
}
