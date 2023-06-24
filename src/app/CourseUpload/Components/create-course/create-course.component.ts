import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Category } from 'src/app/Models/category';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import { Language } from '../../../Models/Enums/CourseLanguage';
import { Level } from '../../../Models/Enums/CourseLevel';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { NotificationService } from 'src/app/Shared/Services/notification.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  languages = Object.values(Language).filter(
    (language) => typeof language === 'string'
  );
  levels = Object.values(Level).filter((level) => typeof level === 'string');
  CreateCourse: FormGroup;
  categories: Category[] = [];
  file: any = null;
  courseImg: File | undefined;
  // addCourseTeachingButton: boolean = true;
  // addTargetStudentButton: boolean = true;
  // addCourseRequirementButton: boolean = true;
  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private router: Router,
    private notification: NotificationService
  ) {
    this.CreateCourse = this.fb.group({
      instructorId: ['43e4ac2d-03c4-4f6a-b554-4567810fbf7e'],
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      language: ['', Validators.required],
      price: ['', Validators.required],
      level: ['', Validators.required],
      courseImage: [''],
      learningItems: this.fb.array([
        this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
        }),
      ]),
      enrollmentItems: this.fb.array([
        this.fb.group({
          title: ['', Validators.required],
        }),
      ]),
      courseRequirements: this.fb.array([
        this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
        }),
      ]),
    });
  }
  ngOnInit(): void {
    this.apiService
      .getAllItem('category/type/2')
      .subscribe((data: APIResponseVM) => {
        this.categories = data.items;
      });
  }

  get title() {
    return this.CreateCourse.get('title');
  }
  get categoryId() {
    return this.CreateCourse.get('categoryId');
  }
  get shortDescription() {
    return this.CreateCourse.get('shortDescription');
  }
  get description() {
    return this.CreateCourse.get('description');
  }
  get language() {
    return this.CreateCourse.get('language');
  }
  get price() {
    return this.CreateCourse.get('price');
  }
  get level() {
    return this.CreateCourse.get('level');
  }
  get CourseTeachings() {
    return this.CreateCourse.get('learningItems') as FormArray;
  }
  get TargetStudents() {
    return this.CreateCourse.get('enrollmentItems') as FormArray;
  }
  get CourseRequirements() {
    return this.CreateCourse.get('courseRequirements') as FormArray;
  }

  addCourseTeachingInput() {
    const newForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.CourseTeachings.push(newForm);
  }
  addTargetStudentInput() {
    const newForm = this.fb.group({
      title: ['', Validators.required],
    });
    this.TargetStudents.push(newForm);
  }
  addCourseRequirmentInput() {
    const newForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.CourseRequirements.push(newForm);
  }

  onFileSelected($event: any) {
    this.courseImg = $event.target.files[0];
  }

  CreateCourseSubmit() {
    if (this.CreateCourse.invalid) {
      this.notification.notify('Enter Valid Data or Check all Fields', 'error');
      return;
    }
    const formData = new FormData();
    if (this.courseImg) {
      formData.append('courseImg', this.courseImg);
    }
    formData.append('postCourseDto', JSON.stringify(this.CreateCourse.value));

    console.log(this.CreateCourse.value);
    console.log('Form data:', formData);
    const observer = {
      next: (result: any) => {
        this.router.navigate(['createCourse/step2']);
      },
      error: (err: any) => {
        console.log(err.message);
      },
    };

    this.apiService.addItem('Course', formData).subscribe(observer);
    console.log(formData);
  }

  /*  checkCourseTeachings(event: any): any {
    for (let i = 0; i < this.CourseTeachings.length; i++) {
      const formGroup = this.CourseTeachings.at(i) as FormGroup; // specify the type of the formGroup
      if (
        formGroup.controls?.['title'].value.trim() == '' ||
        formGroup.controls?.['description'].value.trim() == ''
      ) {
        this.addCourseTeachingButton = true;
        return this.addCourseTeachingButton;
      } else {
        this.addCourseTeachingButton = false;
        return this.addCourseTeachingButton;
      }
    }
  }
  checkTargetStudents(event: any): boolean {
    if (event.target.value.trim() == '') {
      this.addTargetStudentButton = true;
      return this.addTargetStudentButton;
    } else {
      this.addTargetStudentButton = false;
      return this.addTargetStudentButton;
    }
  }
  checkCourseRequirement(event: any): boolean {
    if (event.target.value.trim() == '') {
      this.addCourseRequirementButton = true;
      return this.addCourseRequirementButton;
    } else {
      this.addCourseRequirementButton = false;
      return this.addCourseRequirementButton;
    }
  }*/
}
