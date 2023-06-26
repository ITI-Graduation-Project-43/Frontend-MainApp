import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../Shared/Helper/local-storage.service'
import { APIService } from '../Shared/Services/api.service';
import { NotificationService } from '../Shared/Services/notification.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit {
  User !: any;
  send : boolean = false;
  role !: string;

  constructor(private http: APIService, private LocalStorageService: LocalStorageService, private Notification: NotificationService) {
    if(this.LocalStorageService.checkTokenExpiration()) {
      this.User = this.LocalStorageService.getUserInfo();
      this.role = this.LocalStorageService.decodeToken().Role;
      if(this.User.profilePicture == '') {
        this.User.profilePicture = '../../assets/images/user_avater.jpg'
      }
    }
  }

  ngOnInit(): void {
    let UpdateUserObserver = {
      next: (data: any) => {
        if (data.message == 'new') {
          this.User = this.LocalStorageService.getUserInfo();
        }
      },

    };
    this.Notification.notifications.subscribe(UpdateUserObserver);
  }

  changeImage(e: any) {
    const file = e.target.files[0];
    if(file?.type.includes('image')) {
      const imageData: FormData = new FormData();
      imageData.append('ProfilePictureFile', file, file.name);
      this.send = true;
        let observer = {
          next: (data: any) => {
            if(data.success) {
              this.User.profilePicture = data.items[0];
              this.LocalStorageService.updateUserInfo(this.User)
              this.send = false;
            }
          },
          complete: () => {
            this.Notification.notify("The image is updated successfully");
          },
          error: () => {
            this.Notification.notify("Something wrong occur", "error");
          }
        }
        this.http.addItem(`${this.role}/UploadImage?id=${this.User.id}`, imageData).subscribe(observer);
      }
  }
}
