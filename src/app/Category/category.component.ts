import { Component, OnInit } from '@angular/core';
import { APIService } from '../Shared/Services/api.service';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { Course } from '../Models/course';
import { Category } from '../Models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from '../Models/Enums/CourseLanguage';
import { Level } from '../Models/Enums/CourseLevel';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private apiService: APIService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }


  //Pagination
  currentPageNumber: number = 1;
  pageSize: number = 10;

  //Category Id
  CategoryId: number = -1;

  //Main Category
  mainCategory: any;

  //Feature this week
  featureThisWeekCourse: Course[] = [];

  //Arrays of viewed data
  latestCourses: Course[] = [];
  relatedCourses: Course[] = [];
  filteredCourses: any[] = [];
  entryLevelCourses: Course[] = [];
  topInstructors: any[] = [];

  //filtering objects
  ratingFilters: any = { rating: 'all' };
  durationFilters: any = { upTo5Hours: false, upTo10Hours: false, upTo15Hours: false, upTo20Hours: false, moreThan21Hours: false, };
  languageFilters: any = { Arabic: false, English: false }
  priceFilters: any = { free: false, paid: false }
  levelFilters: any = { Entry: false, Intermediate: false, Expert: false }
  subcategoryFilters: any = {}


  //ngIf for filtering
  ratingChoices: boolean = true;
  durationChoices: boolean = true;
  subCategoryChoices: boolean = true;
  levelChoices: boolean = true;
  languageChoices: boolean = true;
  priceChoices: boolean = true;

  //subcategories
  subcategories: Category[] = [];

  ngOnInit(): void {
    this.initPage();
  }

  initPage() {

    //Main Category
    this.checkCategoryId();
    this.loadMainCategory();

    //**************************************************************************** */
    //Feature this week

    this.loadFeatureThisWeek();

    //**************************************************************************** */
    //Subcategories

    this.loadSubCategories();
    this.setSubCategoryFiltersObject(this.subcategories);

    //***************************************************************************** */
    //Recent Courses

    this.loadRecentCourses();

    //******************************************************************************** */
    //Related Courses

    //this.loadCoursesPage(this.currentPageNumber, this.pageSize);
    this.loadCoursesPage(this.currentPageNumber, this.pageSize);
    this.loadEntryLevelCourses();

    //******************************************************************************** */
    //Top 4 Instructors

    this.loadTop4Instructors();

    //******************************************************************************** */
  }

  ///////////////Hero filter function
  filter() {
    this.filteredCourses = this.relatedCourses;
    this.filterByRating();
    this.filterByDuration();
    this.filterBySubCategory();
    this.filterByLevel();
    this.filterByLanguage();
    this.filterByPrice();
  }


  ///////////////Filtering functions
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
  NewCoursesPage(direction: string) {
    switch (direction) {
      case 'prev':
        this.currentPageNumber -= 1;
        if (!this.currentPageNumber) return;
        break;

      case 'first':
        this.currentPageNumber = 1;
        break;

      case 'second':
        this.currentPageNumber = 2;
        break;

      case 'third':
        this.currentPageNumber = 3;
        break;

      case 'next':
        this.currentPageNumber += 1;
        break;
    }
    this.loadCoursesPage(this.currentPageNumber, this.pageSize);
    this.filter();
  }

  async loadCoursesPage(pageNumber: number, pageSize: number): Promise<Course[]> {
    const data: APIResponseVM | undefined = await this.apiService
      .getAllItem(`Course/category/${this.CategoryId}?PageNumber=${pageNumber}&PageSize=${pageSize}`)
      .toPromise();
    this.relatedCourses = data?.items ?? [];
    this.filteredCourses = this.relatedCourses;
    return this.relatedCourses;
  }

  loadMainCategory() {
    this.apiService.getItemById("Category/Parent", this.CategoryId).subscribe((data: APIResponseVM) => {
      this.mainCategory = data.items;
    }, (erorr => {
      this.router.navigateByUrl('header');
    }))
  }

  loadSubCategories() {
    this.apiService.getAllItem(`Category/ParentSubCategories/${this.CategoryId}`).subscribe((data: APIResponseVM) => {
      this.subcategories = data.items;
    }, (error) => {
      console.log(error.message);
    })
  }

  async loadEntryLevelCourses(): Promise<void> {
    let courseArr: Course[] = await this.loadCoursesPage(this.currentPageNumber, this.pageSize);
    for (let i = 0; i < courseArr.length; i++) {
      if (courseArr[i].level != 0)
        continue;
      this.entryLevelCourses.push(courseArr[i]);
      if (this.entryLevelCourses.length == 3)
        break;
    }
  }

  loadTop4Instructors() {
    this.apiService
      .getAllItem('Instructor/TopTenInstructors?topNumber=4')
      .subscribe((data: APIResponseVM) => {
        this.topInstructors = data.items;
      });
  }

  loadRecentCourses() {
    this.apiService.getAllItem('course/recent/3').subscribe(
      (data: APIResponseVM) => {
        this.latestCourses = data.items;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  loadFeatureThisWeek() {
    this.apiService.getAllItem("Course/featureThisWeek").subscribe((data: APIResponseVM) => {
      this.featureThisWeekCourse = data.items as Course[];
    })
  }


  ///////////////Helper Methodes
  checkCategoryId() {
    this.activeRoute.params.subscribe(
      (route: any) => {
        if (isNaN(+route.id)) this.router.navigateByUrl('header');
        this.CategoryId = route.id;
      },
      (erorr) => {
        this.router.navigateByUrl('header');
      }
    );
  }

  setSubCategoryFiltersObject(categoryArr: Category[]) {
    categoryArr.forEach(subCat => {
      this.subcategoryFilters[subCat.name] = false;
    })

    this.apiService.getItemById('Category/Parent', this.CategoryId).subscribe(
      (data: APIResponseVM) => {
        this.mainCategory = data.items;
      },
      (erorr) => {
        this.router.navigateByUrl('header');
      }
    );
    //**************************************************************************** */

    //Feature this week
    this.apiService
      .getAllItem('Course/featureThisWeek')
      .subscribe((data: APIResponseVM) => {
        this.featureThisWeekCourse = data.items as Course[];
        this.featureThisWeekCourse[0].avgReview = Math.floor(
          this.featureThisWeekCourse[0].avgReview
        );
      });

    //**************************************************************************** */

    //Subcategories
    this.apiService
      .getAllItem(`Category/ParentSubCategories/${this.CategoryId}`)
      .subscribe(
        (data: APIResponseVM) => {
          this.subcategories = data.items;
          this.subcategories.forEach((subCat) => {
            this.subcategoryFilters[subCat.name] = false;
          });
        },
        (error) => {
          console.log(error.message);
        }
      );

    //***************************************************************************** */

    //Recent Courses
    this.apiService.getAllItem('course/recent/3').subscribe(
      (data: APIResponseVM) => {
        this.latestCourses = data.items;
        this.latestCourses.forEach((crs) => {
          crs.avgReview = Math.floor(crs.avgReview);
        });
      },
      (error) => {
        console.log(error.message);
      }
    );

    //******************************************************************************** */

    //Related Courses
    this.apiService
      .getAllItem(`Course/category/${this.CategoryId}?PageNumber=1&PageSize=5`)
      .subscribe((data: APIResponseVM) => {
        this.relatedCourses = data.items;
        this.relatedCourses.forEach(
          (crs) => (crs.avgReview = Math.floor(crs.avgReview))
        );

        for (let i = 0; i < this.relatedCourses.length; i++) {
          if (this.relatedCourses[i].level != 0) continue;
          this.entryLevelCourses.push(this.relatedCourses[i]);
          if (this.entryLevelCourses.length == 3) break;
        }
        this.filteredCourses = this.relatedCourses;
      });

    //******************************************************************************** */

    //Top 4 Instructors
    this.apiService
      .getAllItem('Instructor/TopTenInstructors?topNumber=4')
      .subscribe((data: APIResponseVM) => {
        this.topInstructors = data.items;
      });

    //******************************************************************************** */
  }
}
