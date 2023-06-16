import { Component } from '@angular/core';
import { Instructor } from 'src/app/Models/instructor';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-instructors-section',
  templateUrl: './instructors-section.component.html',
  styleUrls: ['./instructors-section.component.scss']
})
export class InstructorsSectionComponent {
  instructors !: Instructor[];
  constructor(private http: APIService) {
    let obvserver = {
      next: (data: APIResponseVM) => {
        if(data) {
          this.instructors = data.items;
        }
      },
      complete: () => {
        //console.log("completed")
      },
      error: (error: Error) => {
        console.log(error);
      }
    }

    this.http.getAllItem("Instructor/TopTenInstructors?topNumber=10").subscribe(obvserver)
  }
}
