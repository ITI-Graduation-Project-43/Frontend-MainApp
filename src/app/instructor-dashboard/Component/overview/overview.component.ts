import { Component, OnInit } from '@angular/core';
import { TimeTrackingService } from 'src/app/Services/time-tracking.service';
import { LocalStorageService } from 'src/app/Shared/Helper/local-storage.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  instructorId: string;
  instructor: any;
  TotalHours: number = 0;
  isLoading: boolean = true;

  constructor(
    private timeTrackingService: TimeTrackingService,
    private localStorageService: LocalStorageService
  ) {
    this.instructorId = this.localStorageService.decodeToken().Id;
    this.instructor = this.localStorageService.getUserInfo();
  }
  ngOnInit() {
    this.isLoading = true;
    this.timeTrackingService
      .GetTotalHours(this.instructorId)
      .subscribe((data: number) => {
        this.TotalHours = data;
        this.isLoading = false;
      });
  }
}
