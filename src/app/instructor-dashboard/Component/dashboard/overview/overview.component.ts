import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorService } from 'src/app/Services/instructor.service';
import { TimeTrackingService } from 'src/app/Services/time-tracking.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  instructorId: string = '4ae72bce-ddd7-45da-ac42-780deb784c9d';
  instructor: any[] = [];
  TotalHours: number = 0;

  constructor(
    private instructorService: InstructorService,
    private timeTrackingService: TimeTrackingService,
    private router: Router
  ) {}
  ngOnInit() {
    this.instructorService
      .getItemById('Instructor', this.instructorId)
      .subscribe(
        (data: APIResponseVM) => {
          this.instructor = data.items;
        },
        (error) => {
          this.router.navigateByUrl('');
        }
      );

    this.timeTrackingService
      .GetTotalHours(this.instructorId)
      .subscribe((data: number) => {
        this.TotalHours = data;
      });
  }
}
