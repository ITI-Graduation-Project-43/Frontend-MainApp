import { Component } from '@angular/core';
import {LocalStorageService} from '../Shared/Helper/local-storage.service'

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent {
  User !: any;

  constructor(private LocalStorageService: LocalStorageService) {
    if(this.LocalStorageService.checkTokenExpiration()) {
      this.User = this.LocalStorageService.getUserInfo();
    }
  }
}
