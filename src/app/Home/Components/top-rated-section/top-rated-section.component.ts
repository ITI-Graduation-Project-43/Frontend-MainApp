import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-top-rated-section',
  templateUrl: './top-rated-section.component.html',
  styleUrls: ['./top-rated-section.component.scss']
})
export class TopRatedSectionComponent implements OnInit {
  constructor(private http: APIService) {

  }

  ngOnInit(): void {
    let obvserver = {
      next: (data: APIResponseVM) => {
        if(data) {
          console.log(data.items);
        }
      },
      complete: () => {
        console.log("completed")
      },
      error: (error: Error) => {
        console.log(error);
      }
    }
    this.http.getAllItem("Course/top/3").subscribe(obvserver);
  }
}
