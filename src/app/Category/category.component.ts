import { Component, OnInit } from '@angular/core';
import { APIService } from '../Shared/Services/api.service';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { Course } from '../Models/course';
import { Category } from '../Models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from '../Models/Enums/CourseLanguage';
import { Level } from '../Models/Enums/CourseLevel';
import { Instructor } from '../Models/instructor';

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
  pageSize: number = 3;

  //Category Id
  CategoryId: number = -1;

  //Main Category
  mainCategoryItems: any;

  mainCategory!: Category | undefined;

  //Feature this week
  featureThisWeekItems: Course[] = [];
  featureThisWeekCourse!: Course | undefined;
  loadFeature : boolean = true;

  //Arrays of viewed data
  latestCourses: Course[] = [];
  relatedCourses: Course[] = [];
  filteredCourses: any[] = [];
  entryLevelCourses: Course[] = [];
  topInstructorsItems: Instructor[] = [];
  topInstructors!: Instructor | undefined;

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
    document.querySelector(".app-header")?.classList.add("dark-background")
  }

  initPage() {

    //Main Category
    this.checkCategoryId();
    this.loadMainCategoryItems();

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
  viewMore() {
    let newPage = ++this.currentPageNumber;
    this.apiService.getAllItem(`Course/category/${this.CategoryId}?PageNumber=${newPage}&PageSize=${this.pageSize}`)
      .subscribe((data: APIResponseVM) => {
        let coursesItems: Course[] = data.items;
        this.relatedCourses.push(...coursesItems);
      })
    this.filter();
  }

  async loadCoursesPage(pageNumber: number, pageSize: number): Promise<Course[]> {
    const data: APIResponseVM | undefined = await this.apiService
      .getAllItem(`Course/category/${this.CategoryId}?PageNumber=${pageNumber}&PageSize=${pageSize}`)
      .toPromise();
    this.relatedCourses = await data?.items ?? [];
    this.filteredCourses = this.relatedCourses;
    return this.relatedCourses;
  }

  loadMainCategoryItems() {
    this.apiService.getItemById("Category/Parent", this.CategoryId).subscribe((data: APIResponseVM) => {
      this.mainCategoryItems = data.items;
      this.mainCategory = this.mainCategoryItems[0] as Category;
    }, (erorr => {
      console.log(erorr);
    }))
  }

  loadSubCategories() {
    this.apiService.getAllItem(`Category/ParentSubCategories/${this.CategoryId}`).subscribe((data: APIResponseVM) => {
      this.subcategories = data.items;
    }, (error) => {
      console.log(error.message);
    })
  }

  async loadEntryLevelCourses() {

    this.apiService.getAllItem(`Course/category/${this.CategoryId}?PageNumber=1&PageSize=10`)
      .subscribe((data: APIResponseVM) => {
        let courseArr: Course[] = data.items;
        for (let i = 0; i < courseArr.length; i++) {
          if (courseArr[i].level != 0)
            continue;
          this.entryLevelCourses.push(courseArr[i]);
          if (this.entryLevelCourses.length == 3)
            break;
        }
      })
  }

  loadTop4Instructors() {
    this.apiService
      .getAllItem('Instructor/TopTenInstructors?topNumber=4')
      .subscribe((data: APIResponseVM) => {
        this.topInstructorsItems = data.items as Instructor[];
        this.topInstructors = this.topInstructorsItems[0] as Instructor;
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
      this.featureThisWeekItems = data.items as Course[];
      this.featureThisWeekCourse = this.featureThisWeekItems[0] as Course;
      this.loadFeature = false;
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
        console.log(erorr);
      }
    );
  }

  setSubCategoryFiltersObject(categoryArr: Category[]) {
    categoryArr.forEach(subCat => {
      this.subcategoryFilters[subCat.name] = false;
    })

    this.apiService.getItemById('Category/Parent', this.CategoryId).subscribe(
      (data: APIResponseVM) => {
        this.mainCategoryItems = data.items;
      },
      (erorr) => {
        console.log(erorr);
      }
    );
  }
}
