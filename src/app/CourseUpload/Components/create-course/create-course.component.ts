import { Component, OnInit } from '@angular/core';
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
  addCourseTeachingButton: boolean = true;
  addTargetStudentButton: boolean = true;
  addCourseRequirementButton: boolean = true;
  constructor(private fb: FormBuilder, private apiService: APIService) {
    this.CreateCourse = this.fb.group({
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
      courseTeaching: fb.array(['']),
      targetStudent: fb.array(['']),
      courseRequirement: fb.array(['']),
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
    return this.CreateCourse.get('courseTeaching') as FormArray;
  }
  get TargetStudents() {
    return this.CreateCourse.get('targetStudent') as FormArray;
  }
  get CourseRequirements() {
    return this.CreateCourse.get('courseRequirement') as FormArray;
  }

  addCourseTeachingInput() {
    this.CourseTeachings.push(new FormControl(''));
    this.addCourseTeachingButton = true;
  }
  addTargetStudentInput() {
    this.TargetStudents.push(new FormControl(''));
    this.addTargetStudentButton = true;
  }
  addCourseRequirmentInput() {
    this.CourseRequirements.push(new FormControl(''));
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Do something with the image data, such as displaying it in an <img> tag
        const imageData = reader.result;
        console.log(imageData);
      };
    }
  }
}
