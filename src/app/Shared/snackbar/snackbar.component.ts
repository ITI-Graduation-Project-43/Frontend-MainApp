import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../Services/notification.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit, OnDestroy {
  message: string | null = '';
  type: string = 'success';
  sub!: Subscription;
  fadeIn: boolean = true;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.sub = this.notificationService.notifications.subscribe(
      (notification) => {
        this.message = notification.message;
        this.type = notification.type;
        this.fadeIn = true;
        setTimeout(() => {
          this.fadeIn = false;
          setTimeout(() => (this.message = null), 400);
        }, 2400);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
