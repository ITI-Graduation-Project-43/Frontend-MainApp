import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../Shared/Services/api.service';
import { Category } from '../Models/category';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { Observable, filter, map, observable } from 'rxjs';
import { Course } from '../Models/course';
import { Instructor } from '../Models/instructor';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryId:number = 0;
  mainCategoryResponse: Category[] = [];
  subCategories:Category[] = [];
  mainCategory!: Category | undefined;

  constructor(private apiService:APIService) {}

  getMainCategory(id:number) : Observable<Category[]> {
    return this.apiService.getItemById("Category", this.categoryId)
    .pipe(
      map((data: APIResponseVM) => data.items as Category[]));
  }

  getSubCategories() : Observable<Category[]> {
    return this.apiService.getAllItem(`Category/ParentSubCategories/${this.categoryId}`)
    .pipe(
      map((data: APIResponseVM) => data.items as Category[]));
  }

  getFeatureThisWeek() : Observable<Course[]> {
    return this.apiService.getAllItem(`Course/featureThisWeek/${this.categoryId}`)
    .pipe(
      map((data: APIResponseVM) => data.items as Course[]));
  }

  getCoursesPage(pageNumber:number,pageSize:number) : Observable<Course[]> {
    return this.apiService
    .getAllItem(`Course/category/${this.categoryId}?PageNumber=${pageNumber}&PageSize=${pageSize}`)
    .pipe(
      map((data: APIResponseVM) => data.items as Course[]));
  }

  getEntryLevelCourses() : Observable<Course[]> {
    return this.apiService
    .getAllItem(`Course/category/${this.categoryId}?PageNumber=1&PageSize=10`)
    .pipe(
      map((data: APIResponseVM) => data.items as Course[]));
  }

  getTopInstructors() : Observable<Instructor[]> {
    return this.apiService
    .getAllItem(`Instructor/TopTenInstructors?topNumber=4`)
    .pipe(
      map((data: APIResponseVM) => data.items as Instructor[]));
  }

  getLatestCourses() : Observable<Course[]>{
    return this.apiService
    .getAllItem(`course/recent/3`)
    .pipe(
      map((data: APIResponseVM) => data.items as Course[]));
  }
}
