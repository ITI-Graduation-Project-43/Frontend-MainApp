import { Component, OnInit } from '@angular/core';
import { APIService } from '../Shared/Services/api.service';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { Course } from '../Models/course';
import { Category } from '../Models/category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(private apiService: APIService, private activeRoute: ActivatedRoute, private router: Router) { }

  //Category Id
  CategoryId: number = -1;

  //Main Category
  mainCategory: any;




  //Arrays of viewed data
  latestCourses: Course[] = [];
  relatedCourses: Course[] = [];
  filteredCourses: any[] = [];
  entryLevelCourses: Course[] = [];
  topInstructors: any[] = [];



  //filtering objects
  ratingFilters: any = {
    rating: 'all',
  }

  durationFilters: any = {
    upTo5Hours: false,
    upTo10Hours: false,
    upTo15Hours: false,
    upTo20Hours: false,
    moreThan21Hours: false,
  }




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

    //Main Category
    this.activeRoute.params.subscribe((route: any) => {
      if (isNaN(+(route.id)))
        this.router.navigateByUrl('header');

      this.CategoryId = route.id;
    }, (erorr => {
      this.router.navigateByUrl('header');
    }))

    this.apiService.getItemById("Category/Parent", this.CategoryId).subscribe((data: APIResponseVM) => {
      this.mainCategory = data.items;
    }, (erorr => {
      this.router.navigateByUrl('header');
    }))
    //**************************************************************************** */

    //Subcategories
    this.apiService.getAllItem(`Category/ParentSubCategories/${this.CategoryId}`).subscribe((data: APIResponseVM) => {
      this.subcategories = data.items;
    }, (error) => {
      console.log(error.message);
    })

    //***************************************************************************** */

    //Recent Courses
    this.apiService.getAllItem("course/recent/3").subscribe((data: APIResponseVM) => {
      this.latestCourses = data.items;
      this.latestCourses.forEach(crs => {
        crs.avgReview = Math.floor(crs.avgReview);
      })
    }, (error) => {
      console.log(error.message);
    })

    //******************************************************************************** */

    //Related Courses
    this.apiService.getAllItem(`Course/category/${this.CategoryId}`).subscribe((data: APIResponseVM) => {
      this.relatedCourses = data.items;
      this.relatedCourses.forEach(crs => crs.avgReview = Math.floor(crs.avgReview));
      let loops: number = 3;
      if (this.relatedCourses.length < 3)
        loops = this.relatedCourses.length;

      for (let i = 0; i < loops; i++) {
        if (this.relatedCourses[i].level != 0)
          continue;
        this.entryLevelCourses.push(this.relatedCourses[i]);
      }
      this.filteredCourses = this.relatedCourses;
    })

    //******************************************************************************** */

    //Top 4 Instructors
    this.apiService.getAllItem("Instructor/TopTenInstructors?topNumber=4").subscribe((data: APIResponseVM) => {
      this.topInstructors = data.items;
    })

    //******************************************************************************** */
  }

  filter() {
    this.filteredCourses = this.relatedCourses;
    if (this.ratingFilters.rating != 'all')
      this.filteredCourses = this.filteredCourses
        .filter(course => course.avgReview >= +this.ratingFilters.rating);


    let durationFiltersArr = [
      0,
      this.durationFilters.upTo5Hours, 5,
      this.durationFilters.upTo10Hours, 10,
      this.durationFilters.upTo15Hours, 15,
      this.durationFilters.upTo20Hours, 20,
      this.durationFilters.moreThan21Hours, 21
    ]

    let afterDurationFilteredCourses = [];
    for (let i = 1; i < durationFiltersArr.length; i += 2) {
      if (durationFiltersArr[i] == true) {
        let tempFilteredCourses = this.filteredCourses
          .filter(course => course.noOfHours >= durationFiltersArr[i - 1]
            && course.noOfHours <= durationFiltersArr[i + 1]);
        afterDurationFilteredCourses.push(...tempFilteredCourses);
      }
    }
    if (afterDurationFilteredCourses.length) {
      this.filteredCourses = afterDurationFilteredCourses;
    }

  }
}
