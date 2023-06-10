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
  entryLevelCourses: Course[] = [];
  topInstructors: any[] = [];

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
      let loops: number = 3;
      if (this.relatedCourses.length < 3)
        loops = this.relatedCourses.length;

      for (let i = 0; i < loops; i++) {
        if (this.relatedCourses[i].level != 0)
          continue;
        this.relatedCourses[i].avgReview = Math.floor(this.relatedCourses[i].avgReview)
        this.entryLevelCourses.push(this.relatedCourses[i]);
      }
    })

    //******************************************************************************** */

    //Top 4 Instructors
    this.apiService.getAllItem("Instructor/TopTenInstructors?topNumber=4").subscribe((data:APIResponseVM)=>{
      this.topInstructors = data.items;
    })
  }
}
