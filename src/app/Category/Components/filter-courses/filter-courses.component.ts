import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category';
import { Course } from 'src/app/Models/course';
import { CategoryService } from 'src/app/Services/category.service';
import { Language } from '../../../Models/Enums/CourseLanguage';
import { Level } from '../../../Models/Enums/CourseLevel';

const PAGE_SIZE = 3;

@Component({
  selector: 'app-filter-courses',
  templateUrl: './filter-courses.component.html',
  styleUrls: ['./filter-courses.component.scss']
})

export class FilterCoursesComponent implements OnInit {
  pageNumber: number = 1;
  subCategories!: Category[];
  constructor(public categoryService: CategoryService) { }

  //ngIf for filtering
  ratingChoices: boolean = true;
  durationChoices: boolean = true;
  subCategoryChoices: boolean = true;
  levelChoices: boolean = true;
  languageChoices: boolean = true;
  priceChoices: boolean = true;

  //filtering objects
  ratingFilters: any = { rating: 'all' };
  durationFilters: any = { upTo5Hours: false, upTo10Hours: false, upTo15Hours: false, upTo20Hours: false, moreThan21Hours: false, };
  languageFilters: any = { Arabic: false, English: false }
  priceFilters: any = { free: false, paid: false }
  levelFilters: any = { Entry: false, Intermediate: false, Expert: false }
  subcategoryFilters: any = {};

  //courses of a page
  relatedCourses: Course[] = [];
  filteredCourses: Course[] = [];

  //img of no data
  noData: boolean = true;

  ngOnInit(): void {
    this.getRelatedCourse();
    this.getSubCategories();
  }

  getRelatedCourse() {
    this.noData = false;
    this.categoryService.getCoursesPage(1, PAGE_SIZE).subscribe((data: Course[]) => {
      this.relatedCourses = this.filteredCourses = data;
    }, (error) => {
      this.noData = true;
    })
  }

  getSubCategories(){
    this.setSubCategoryFiltersObject(this.categoryService.subCategories);
  }

  setSubCategoryFiltersObject(subCategoryArr: Category[]) {
    subCategoryArr.forEach(subCat => {
      this.subcategoryFilters[subCat.name] = false;
    })
  }


  //the following filteration will be simplified after making it in the back-end
  filter() {
    this.filteredCourses = this.relatedCourses;
    this.filterByRating();
    this.filterByDuration();
    this.filterBySubCategory();
    this.filterByLevel();
    this.filterByLanguage();
    this.filterByPrice();
  }

  filterByRating() {
    if (this.ratingFilters.rating != 'all')
      this.filteredCourses = this.filteredCourses.filter(
        (course) => course.avgReview >= +this.ratingFilters.rating
      );
  }

  filterByDuration() {
    this.filteringTemplate(this.durationFilters, this.durationFilterLogic);
  }

  filterBySubCategory() {
    this.filteringTemplate(this.subcategoryFilters, this.subCategoryFilterLogic);
  }

  filterByLevel() {
    this.filteringTemplate(this.levelFilters, this.levelFilterLogic);
  }

  filterByLanguage() {
    this.filteringTemplate(this.languageFilters, this.languageFilterLogic);
  }

  filterByPrice() {
    this.filteringTemplate(this.priceFilters, this.priceFilterLogic)
  }


  ///////////////Filtering Logics
  durationFilterLogic(filterObject: any, filteredCourses: any[]) {
    let durationFiltersArr = [
      -1, filterObject.upTo5Hours, 5, filterObject.upTo10Hours, 10, filterObject.upTo15Hours, 15,
      filterObject.upTo20Hours, 20, filterObject.moreThan21Hours, 100
    ];

    let afterDurationFilteredCourses = [];
    for (let i = 1; i < durationFiltersArr.length; i += 2) {
      if (durationFiltersArr[i]) {
        let tempFilteredCourses = filteredCourses
          .filter(course => course.noOfHours >= durationFiltersArr[i - 1] + 1
            && course.noOfHours <= durationFiltersArr[i + 1]);
        afterDurationFilteredCourses.push(...tempFilteredCourses);
      }
    }
    filteredCourses = afterDurationFilteredCourses;
    return filteredCourses;
  }

  subCategoryFilterLogic(filterObject: any, filteredCourses: any[]) {
    let afterSubCategoriesFilteredCourses = []
    for (const key in filterObject) {
      if (filterObject[key]) {
        let tempFilteredCourses = filteredCourses.filter(crs => crs.subCategoryName == key);
        afterSubCategoriesFilteredCourses.push(...tempFilteredCourses);
      }
    }
    filteredCourses = afterSubCategoriesFilteredCourses;
    return filteredCourses;
  }

  levelFilterLogic(filterObject: any, filteredCourses: any[]) {
    let afterLevelFilteredCourses = [];
    for (const key in filterObject) {
      if (filterObject[key]) {
        let tempFilteredCourses = filteredCourses.filter(course => Level[course.level] == key);
        afterLevelFilteredCourses.push(...tempFilteredCourses);
      }
    }
    filteredCourses = afterLevelFilteredCourses;
    return filteredCourses;
  }

  languageFilterLogic(filterObject: any, filteredCourses: any[]) {
    let afterLanguageFilteredCourses = [];
    for (const key in filterObject) {
      if (filterObject[key]) {
        let tempFilteredCourses = filteredCourses.filter(course => Language[course.language] == key);
        afterLanguageFilteredCourses.push(...tempFilteredCourses);
      }
    }
    filteredCourses = afterLanguageFilteredCourses;
    return filteredCourses;
  }

  priceFilterLogic(filterObject: any, filteredCourses: any[]) {
    let afterPriceFilteredCourses = [];
    for (const key in filterObject) {
      if (filterObject[key]) {
        let tempFilteredCourses: any[] = [];
        switch (key) {
          case 'free':
            tempFilteredCourses = filteredCourses.filter(course => course.price == 0.00);
            break;
          case 'paid':
            tempFilteredCourses = filteredCourses.filter(course => course.price > 0.00);
            break;
        }
        afterPriceFilteredCourses.push(...tempFilteredCourses);
      }
    }
    filteredCourses = afterPriceFilteredCourses;
    return filteredCourses;
  }

  ///////////////Filtering tempelate
  filteringTemplate(filterObject: any, filteringLogic: (filterObject: any, filteredCourses: any[]) => any[]): void {
    for (const key in filterObject) {
      if (filterObject[key]) {
        this.filteredCourses = filteringLogic(filterObject, this.filteredCourses);
        break;
      }
    }
  }


  ///////////////Loading Data
  viewMore() {
    let newPage = ++this.pageNumber;
    this.categoryService.getCoursesPage(newPage, PAGE_SIZE).subscribe((data: Course[]) => {
      let coursesItems: Course[] = data;
      this.relatedCourses.push(...coursesItems);
    })
    this.filter();
  }
}
