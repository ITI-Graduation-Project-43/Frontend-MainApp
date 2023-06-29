import { Component, OnInit } from '@angular/core';
import { TimeTrackingService } from 'src/app/Services/time-tracking.service';
import { LocalStorageService } from 'src/app/Shared/Helper/local-storage.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';

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
    private localStorageService: LocalStorageService,
    private NotificationService: NotificationService
  ) {
    this.instructorId = this.localStorageService.decodeToken().Id;
    this.instructor = this.localStorageService.getUserInfo();
  }
  ngOnInit() {
    let obvserver = {
      next: (data: any) => {
        if(data.message == 'getNewUserInformation') {
          this.instructor = this.localStorageService.getUserInfo();
        }
      }
    };
    this.NotificationService.notifications.subscribe(obvserver);

    this.timeTrackingService
      .GetTotalHours(this.instructorId)
      .subscribe((data: number) => {
        this.TotalHours = data;
        this.isLoading = false;
      });
  }
}
