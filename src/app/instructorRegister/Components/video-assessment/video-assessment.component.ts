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
    let assessmentFormData = sessionStorage.getItem("assessment");
    this.myForm = this.fb.group({
      assessment: [assessmentFormData, Validators.required],
    });
    document.querySelector(".app-header")?.classList.remove("dark-background")
  }
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const selectedValue = this.myForm.get('assessment')?.value;
    sessionStorage.setItem('assessment', selectedValue, );
    this.router.navigateByUrl('instructorRegister/expandReach');
  }
}
