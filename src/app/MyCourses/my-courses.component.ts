import { Component, OnInit } from '@angular/core';
import { APIService } from '../Shared/Services/api.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  constructor(private apiService: APIService) { }

  studentId: string = '08c8abfe-3896-4bfc-bfaa-1b3ee5240c83';

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getWishList(id: string) {
    this.apiService.getAllItem("");
  }

  getMyLearning(id: string){
    this.apiService.getAllItem("")
  }


}
