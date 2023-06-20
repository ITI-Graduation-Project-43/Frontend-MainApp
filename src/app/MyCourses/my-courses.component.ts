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

  btnTitle:string = "Wishlist";
  mainTitle:string = "My courses";
  currentMainTitle:string = '';

  ngOnInit(): void {
    this.getWishList('08c8abfe-3896-4bfc-bfaa-1b3ee5240c83');
    this.getMyLearning('08c8abfe-3896-4bfc-bfaa-1b3ee5240c83');
  }

  getWishList(id: string) {
    this.apiService.getItemById("Wishlist/Student", id).subscribe((data: APIResponseVM) => {
      this.wishList = data.items;
      console.log(this.wishList)
    });
  }

  getMyLearning(id: string) {
    this.apiService.getItemById("Enrollment/Student", id).subscribe((data: APIResponseVM) => {
      this.enrollments = data.items;
      this.list = this.enrollments;
      console.log(this.enrollments)
    });
  }

  swap(){
    this.swapListsNames();
    this.swapListsContent();
  }

  swapListsNames(){
    this.currentMainTitle = this.mainTitle;
    this.mainTitle = this.btnTitle;
    this.btnTitle = this.currentMainTitle;
  }

  swapListsContent(){
    switch(this.mainTitle){
      case 'Wishlist':
        this.list = this.wishList;
        break;
      case 'My courses':
        this.list = this.enrollments
        break;
    }
  }

  
}
