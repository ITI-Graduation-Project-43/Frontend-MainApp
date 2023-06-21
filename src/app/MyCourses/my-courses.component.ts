import { Component, OnInit } from '@angular/core';
import { APIService } from '../Shared/Services/api.service';
import { LocalStorageService } from '../Shared/Helper/local-storage.service';
import { Course } from '../Models/course';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { WishList } from '../Models/wishlist';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  constructor(private apiService: APIService, private localStorageService: LocalStorageService) { }

  studentId: string = this.localStorageService.decodeToken().Id;
  wishList: WishList[] = [];
  enrollments: Course[] = [];
  list: any[] = [];

  btnTitle: string = "Wishlist";
  mainTitle: string = "My courses";
  currentMainTitle: string = '';
  message:string = '';
  buttonText:string = '';
  loading: boolean = true;
  empty: boolean = false;

  ngOnInit(): void {
    this.getWishList(this.localStorageService.decodeToken().Id);
    this.getMyLearning(this.localStorageService.decodeToken().Id);
  }

  getWishList(id: string) {
    this.apiService.getItemById("Wishlist/Student", `${id}`).subscribe((data: APIResponseVM) => {
      this.wishList = data.items;
    });
  }

  getMyLearning(id: string) {
    this.apiService.getItemById("Enrollment/Student", `${id}?PageNumber=1&PageSize=20`).subscribe((data: APIResponseVM) => {
      this.enrollments = data.items;
      this.list = this.enrollments;
      this.buttonText = "Get started";
      this.checkEmptyList(this.list);
      this.loading = false;
    });
  }

  swap() {
    this.swapListsNames();
    this.swapListsContent();
  }

  swapListsNames() {
    this.currentMainTitle = this.mainTitle;
    this.mainTitle = this.btnTitle;
    this.btnTitle = this.currentMainTitle;
  }

  swapListsContent() {
    switch (this.mainTitle) {
      case 'Wishlist':
        this.list = this.wishList;
        this.checkEmptyList(this.list);
        this.buttonText = "Add to cart";
        break;
      case 'My courses':
        this.list = this.enrollments;
        this.checkEmptyList(this.list);
        this.buttonText = "Get started";
        break;
    }
  }

  checkEmptyList(list:any[]){
    if(list.length == 0){
      this.empty = true;
    }else{
      this.empty = false;
    }
  }
}
