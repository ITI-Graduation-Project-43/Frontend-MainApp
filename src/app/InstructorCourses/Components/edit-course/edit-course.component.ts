import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from 'src/app/Models/Enums/CourseLanguage';
import { Level } from 'src/app/Models/Enums/CourseLevel';
import { Category } from 'src/app/Models/category';
import { mapEnumValue } from 'src/app/Shared/Helper/EnumMapper';
import { APIService } from 'src/app/Shared/Services/api.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { UploadService } from 'src/app/Shared/Services/upload.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
  renderImage: any;
  inputFileShowStatus: boolean = true;
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
    private route: ActivatedRoute,
    private uploadService: UploadService
  ) {
    this.CreateCourse = this.fb.group({
      id: [this.courseId],
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
          this.course[0].courseImage = this.course[0].imageUrl;
          this.renderImage = this.course[0].imageUrl;
          this.inputFileShowStatus = false;
          this.course[0].enrollmentItems = this.course[0].enrollmentItems.map(
            (item: any) => ({
              title: item.description,
            })
          );
          const {
            id,
            instructorId,
            description,
            shortDescription,
            courseImage,
            learningItems,
            enrollmentItems,
            courseRequirements,
            price,
            level,
            language,
            categoryId,
            title,
          } = this.course[0];

          const extractedObject = {
            id,
            instructorId,
            description,
            shortDescription,
            courseImage,
            learningItems,
            enrollmentItems,
            courseRequirements,
            price,
            level,
            language,
            categoryId,
            title,
          };
          if (extractedObject.enrollmentItems.length > 0) {
            for (
              let i = 0;
              i < extractedObject.enrollmentItems.length - 1;
              i++
            ) {
              const newForm = this.fb.group({
                title: ['', Validators.required],
              });
              this.TargetStudents.push(newForm);
            }
          }
          if (extractedObject.courseRequirements.length > 0) {
            for (
              let i = 0;
              i < extractedObject.courseRequirements.length - 1;
              i++
            ) {
              const newForm = this.fb.group({
                title: ['', Validators.required],
                description: ['', Validators.required],
              });
              this.CourseRequirements.push(newForm);
            }
          }
          if (extractedObject.learningItems.length > 0) {
            for (let i = 0; i < extractedObject.learningItems.length - 1; i++) {
              const newForm = this.fb.group({
                title: ['', Validators.required],
                description: ['', Validators.required],
              });
              this.CourseTeachings.push(newForm);
            }
          }
          this.CreateCourse.setValue(extractedObject);
          console.log(extractedObject);
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
    const file = $event.target.files[0];
    this.uploadService.uploadFile(file, 'Image').subscribe(
      (response) => {
        if (response.success) {
          (this.CreateCourse.value.courseImage =
            (response.items[0] as string) || null),
            (this.renderImage = (response.items[0] as string) || null),
            this.notification.notify('File uploaded successfully');
          this.inputFileShowStatus = false;
        } else {
          this.notification.notify('File upload error', 'error');
        }
      },
      (error) => {
        this.notification.notify('File upload error', 'error');
      }
    );
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
    this.CreateCourse.value.courseImage = this.renderImage;
    const postCourseDto = JSON.parse(JSON.stringify(this.CreateCourse.value));
    console.log(postCourseDto);

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
      .replaceItem('Course', this.courseId, postCourseDto)
      .subscribe(observer);
  }

  onDeleteImage() {
    this.courseImg = undefined;
    this.CreateCourse.value.courseImage = '';
    this.inputFileShowStatus = true;
  }
}
