import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {
    let teachingFormData =  sessionStorage.getItem("teaching");
    this.myForm = this.fb.group({
      teaching: [teachingFormData, Validators.required],
    });
    document.querySelector(".app-header")?.classList.remove("dark-background")
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const selectedValue = this.myForm.get('teaching')?.value;
    sessionStorage.setItem('teaching', selectedValue);
    this.router.navigateByUrl('instructorRegister/videoAssessment');
  }
}
