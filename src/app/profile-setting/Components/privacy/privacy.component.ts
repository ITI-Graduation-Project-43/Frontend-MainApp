import { Component } from '@angular/core';
import { NotificationService } from 'src/app/Shared/Services/notification.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {
  showProfile: boolean = false;
  showCourses: boolean = false;
  constructor(private Notification: NotificationService) {
    let privacy = localStorage.getItem("privacy");
    if(privacy) {
      let privacyObj = JSON.parse(privacy);
      this.showProfile = privacyObj.showProfile;
      this.showCourses = privacyObj.showCourses;
    }
  }

  save(e: Event, showProf: any, showCour: any) {
    e.preventDefault();
    localStorage.setItem("privacy", JSON.stringify({showProfile: showProf.checked, showCourses: showCour.checked}))
    this.Notification.notify("Saved!!")
  }
}
