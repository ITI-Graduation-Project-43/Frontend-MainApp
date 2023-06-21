import { Component, OnInit } from '@angular/core';
import { APIService } from '../Shared/Services/api.service';
import { LocalStorageService } from '../Shared/Helper/local-storage.service';
import { Course } from '../Models/course';
import { APIResponseVM } from '../Shared/ViewModels/apiresponse-vm';
import { WishList } from '../Models/wishlist';
import { InstructorService } from '../Services/instructor.service';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.scss'],
})
export class InstructorCoursesComponent implements OnInit {
  constructor(
    private apiService: InstructorService,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.getWishList('4ae72bce-ddd7-45da-ac42-780deb784c9d');
    this.getMyCourses('4ae72bce-ddd7-45da-ac42-780deb784c9d');
  }
  // InstructorId: string = this.localStorageService.decodeToken().Id;
  wishList: WishList[] = [];
  MyCourses: Course[] = [];
  list: any[] = [];

  btnTitle: string = 'Wishlist';
  mainTitle: string = 'Live';
  currentMainTitle: string = '';

  getMyCourses(id: string) {
    this.apiService.getAllCourses(id).subscribe((data: APIResponseVM) => {
      this.MyCourses = data.items;
      this.list = this.MyCourses;
      console.log(this.list);
    });
  }
  getWishList(id: string) {
    // this.apiService
    //   .getItemById('Wishlist/Student', id)
    //   .subscribe((data: APIResponseVM) => {
    //     this.wishList = data.items;
    //     console.log(this.wishList);
    //   });
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
        break;
      case 'My courses':
        this.list = this.MyCourses;
        break;
    }
  }
}
