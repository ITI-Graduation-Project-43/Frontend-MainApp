import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-category-section',
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.scss']
})
export class CategorySectionComponent {
  categories: any[] = [];
  constructor(private http: APIService, private router: Router) {
    let obvserver = {
      next: (data: APIResponseVM) => {
        if(data.success) {
          for(let i = 0; i < 4; i++) {
            this.categories[i] = data.items[i];
          }
        }
      },
      error: (error: Error) => {
        console.log(error);
      }
    }
    this.http.getAllItem("category/type/0").subscribe(obvserver)
  }

  goToCategory(id: number) {
    this.router.navigateByUrl(`/category/${id}`)
  }
}
