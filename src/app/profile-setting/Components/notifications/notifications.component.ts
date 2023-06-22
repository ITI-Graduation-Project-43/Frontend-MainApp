import { Component } from '@angular/core';
import { NotificationService } from 'src/app/Shared/Services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  promotions: boolean = false;
  announcements: boolean = false;
  dontSend: boolean = false;
  constructor(private Notification: NotificationService) {
    let notifications = localStorage.getItem("notifications");
    if(notifications) {
      let notificationsObj = JSON.parse(notifications);
      this.promotions = notificationsObj.promotions;
      this.announcements = notificationsObj.announcements;
      this.announcements = notificationsObj.announcements;
    }
  }

  save(e: Event, promotions: any, announcements: any, dontSend: any) {
    e.preventDefault();
    localStorage.setItem("notifications", JSON.stringify({promotions: promotions.checked, announcements: announcements.checked, dontSend: dontSend.checked}))
    this.Notification.notify("Saved!!")
  }
}
