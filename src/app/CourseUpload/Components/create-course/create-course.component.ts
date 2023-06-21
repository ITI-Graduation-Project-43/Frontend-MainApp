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
  CourseImage: any = null;
  addCourseTeachingButton: boolean = true;
  addTargetStudentButton: boolean = true;
  addCourseRequirementButton: boolean = true;
  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private router: Router
  ) {
    this.CreateCourse = this.fb.group({
      imageUrl: [null],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      category: ['', Validators.required],
      shortDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(2048),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(2048),
        ],
      ],
      language: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      level: ['', [Validators.required]],
      learningItems: fb.array([
        this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
        }),
      ]),
      enrollmentItems: fb.array(['']),
      courseRequirements: fb.array([
        this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
        }),
      ]),
    });
  }
  ngOnInit(): void {
    this.apiService.getAllItem('category').subscribe((data: APIResponseVM) => {
      this.categories = data.items;
    });
  }

  get title() {
    return this.CreateCourse.get('title');
  }
  get category() {
    return this.CreateCourse.get('category');
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
    this.addCourseTeachingButton = true;
  }
  addTargetStudentInput() {
    this.TargetStudents.push(new FormControl(''));
    this.addTargetStudentButton = true;
  }
  addCourseRequirmentInput() {
    const newForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.CourseRequirements.push(newForm);
    this.addCourseRequirementButton = true;
  }
  checkCourseTeachings(event: any): boolean {
    if (event.target.value.trim() == '') {
      this.addCourseTeachingButton = true;
      return this.addCourseTeachingButton;
    } else {
      this.addCourseTeachingButton = false;
      return this.addCourseTeachingButton;
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
  }

  onFileSelected($event: any) {
    this.file = $event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => (this.CourseImage = reader.result);

    reader.readAsDataURL(this.file);
  }

  CreateCourseSubmit() {
    if (this.CreateCourse.invalid) return;
    const form = new FormData();
    if (this.file) {
      form.append('imageUrl', this.file, this.file?.name);
    }
    form.append('name', this.title?.value);
    const observer = {
      next: (result: any) => {
        this.router.navigate(['createCourse/step2']);
      },
      error: (err: any) => {
        console.log(err.message);
      },
    };

    this.apiService.addItem('Course', this.CreateCourse.value).subscribe(observer);
    console.log(this.CreateCourse.value);
  }
}
