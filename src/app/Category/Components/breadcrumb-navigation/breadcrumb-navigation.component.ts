import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-breadcrumb-navigation',
  templateUrl: './breadcrumb-navigation.component.html',
  styleUrls: ['./breadcrumb-navigation.component.scss']
})
export class BreadcrumbNavigationComponent implements OnInit {
  subCategories:Category[] = [];
  constructor(public categoryService:CategoryService){}
  ngOnInit(): void {
    this.categoryService.getSubCategories().subscribe((data:Category[])=>{
      this.subCategories = this.categoryService.subCategories = data as Category[];
    });
  }

  newCategory(id:number){
    location.replace(`/category/${id}`);
  }


}
