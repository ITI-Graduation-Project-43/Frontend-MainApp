import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-category-title',
  templateUrl: './category-title.component.html',
  styleUrls: ['./category-title.component.scss']
})
export class CategoryTitleComponent implements OnInit {
  mainCategory!: Category | undefined;
  categoryId!:number;
  constructor(private categoryService:CategoryService, private activeRoute: ActivatedRoute){
      this.getCategoryId();
    }

  ngOnInit(): void {
    this.getTheCategory();
  }

  getCategoryId() {
    this.activeRoute.paramMap.subscribe(
      (route: any) => {
        this.categoryId = this.categoryService.categoryId = route.params['id'];
        this.getTheCategory();
      },
      (erorr) => {
        console.log(erorr);
      }
    );
  }

  getTheCategory(){
    this.categoryService.getMainCategory(this.categoryId).subscribe((data:Category[])=>{
      this.mainCategory = this.categoryService.mainCategory = data[0] as Category;
    })
  }

}
