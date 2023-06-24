import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from 'src/app/Models/Enums/CourseLanguage';
import { Level } from 'src/app/Models/Enums/CourseLevel';
import { Category } from 'src/app/Models/category';
import { mapEnumValue } from 'src/app/Shared/Helper/EnumMapper';
import { APIService } from 'src/app/Shared/Services/api.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
  courseId: number = 11;
  course: any[] = [];
  courseImg: File | undefined;
  categories: Category[] = [];
  languages = Object.values(Language).filter(
    (language) => typeof language === 'string'
  );
  levels = Object.values(Level).filter((level) => typeof level === 'string');
  CreateCourse: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private router: Router,
    private notification: NotificationService,
    private route: ActivatedRoute
  ) {
    this.CreateCourse = this.fb.group({
      instructorId: ['aa8dc98a-af68-4c68-8d65-99106ba0cda7'],
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      language: ['', Validators.required],
      price: ['', Validators.required],
      level: ['', Validators.required],
      courseImage: ['ss '],
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

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.courseId = +params['id'];
      this.apiService.getItemById('Course', this.courseId).subscribe(
        (data: APIResponseVM) => {
          this.course = data.items;
          this.course[0].language = mapEnumValue(
            Language,
            this.course[0].language
          );
          this.course[0].level = mapEnumValue(Level, this.course[0].level);
          console.log(this.course);
        },
        (err) => console.log(err)
      );
    });
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
  onFileSelected($event: any) {
    this.courseImg = $event.target.files[0];
  }

  addCourseTeachingInput() {
    this.addFormArrayInput(this.CourseTeachings);
  }
  addTargetStudentInput() {
    let hasEmptyFields = false;
    for (let i = 0; i < this.TargetStudents.length; i++) {
      const formGroup = this.TargetStudents.at(i) as FormGroup;
      if (formGroup.controls?.['title'].value.trim() == '') {
        this.notification.notify('Complete Fields', 'error');
        hasEmptyFields = true;
      }
    }
    if (!hasEmptyFields) {
      const newForm = this.fb.group({
        title: ['', Validators.required],
      });
      this.TargetStudents.push(newForm);
    }
  }
  addCourseRequirmentInput() {
    this.addFormArrayInput(this.CourseRequirements);
  }
  addFormArrayInput(formArray: FormArray) {
    let hasEmptyFields = false;
    for (let i = 0; i < formArray.length; i++) {
      const formGroup = formArray.at(i) as FormGroup;
      if (
        formGroup.controls?.['title'].value.trim() == '' ||
        formGroup.controls?.['description'].value.trim() == ''
      ) {
        this.notification.notify('Complete Fields', 'error');
        hasEmptyFields = true;
      }
    }
    if (!hasEmptyFields) {
      const newForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
      formArray.push(newForm);
    }
  }
  back() {
    this.router.navigate([`instructorCourses/courseOverview/${this.courseId}`]);
  }
  PutCourseSubmit() {
    if (this.CreateCourse.invalid) {
      return;
    }
    const formData = new FormData();
    if (this.courseImg) {
      formData.append('courseImg', this.courseImg);
    }
    const postdata = this.convertToPostCourseDto(this.CreateCourse.value);

    for (const key in postdata) {
      if (Object.prototype.hasOwnProperty.call(postdata, key)) {
        const value = postdata[key];
        console.log(`${key}: ${value}`);
        formData.append(`${key}`, `${value}`);
      }
    }
    const observer = {
      next: (result: any) => {
        this.router.navigate([
          `instructorCourses/courseOverview/${this.courseId}`,
        ]);
      },
      error: (err: any) => {
        console.log(err.message);
      },
    };

    this.apiService
      .replaceItem('Course', this.courseId, formData)
      .subscribe(observer);
    console.log(formData);
  }
  convertToPostCourseDto(
    obj: any,
    result: any = {},
    parentKey: string = 'postCourseDto'
  ) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.convertToPostCourseDto(value[i], result, `${newKey}[${i}]`);
          }
        } else if (typeof value === 'object' && value !== null) {
          this.convertToPostCourseDto(value, result, newKey);
        } else {
          result[newKey] = value;
        }
      }
    }
    return result;
  }
}
