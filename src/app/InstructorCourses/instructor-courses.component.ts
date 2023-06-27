import { Component, OnInit } from '@angular/core';
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
    private localStorage: LocalStorageService
  ) {}

  empty: boolean = false;
  loading: boolean = true;


  ngOnInit(): void {
    document.querySelector(".app-header")?.classList.remove("dark-background");
    this.getWaitList(this.localStorage.decodeToken()?.Id);
    this.getMyCourses(this.localStorage.decodeToken()?.Id);
  }

  // InstructorId: string = this.localStorageService.decodeToken().Id;
  waitList: WishList[] = [];
  myCourses: Course[] = [];
  list: any[] = [];

  btnTitle: string = 'Waitlist';
  mainTitle: string = 'Live';
  currentMainTitle: string = '';

  getMyCourses(id: string) {
    this.apiService.getItemById("Course/instructor/approved",id).subscribe((data: APIResponseVM) => {
      this.myCourses = data.items;
      this.list = this.myCourses;
      this.loading = false;
    });
  }

  getWaitList(id: string) {
    this.apiService.getItemById("Course/instructor/waiting",id).subscribe((data: APIResponseVM) => {
      this.waitList = data.items;
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
      case 'Waitlist':
        this.list = this.waitList;
        this.checkEmptyList(this.list);
        break;
      case 'Live':
        this.list = this.myCourses;
        this.checkEmptyList(this.list);
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
