import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorService } from 'src/app/Services/instructor.service';
import { TimeTrackingService } from 'src/app/Services/time-tracking.service';
import { LocalStorageService } from 'src/app/Shared/Helper/local-storage.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  instructorId: string;
  instructor: any;
  TotalHours: number = 0;

  constructor(
    private instructorService: InstructorService,
    private timeTrackingService: TimeTrackingService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {

    this.instructorId = this.localStorageService.decodeToken().Id;
    this.instructor = this.localStorageService.getUserInfo();

  }
  ngOnInit() {
    // this.instructorService
    //   .getItemById('Instructor', this.instructorId)
    //   .subscribe(
    //     (data: APIResponseVM) => {
    //       this.instructor = data.items;
    //     },
    //     (error) => {
    //       this.router.navigateByUrl('');
    //     }
    //   );

    this.timeTrackingService
      .GetTotalHours(this.instructorId)
      .subscribe((data: number) => {
        this.TotalHours = data;
      });
  }
}
