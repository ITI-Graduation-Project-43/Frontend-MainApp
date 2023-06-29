import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "../../Shared/Helper/local-storage.service"
import { NotificationService } from './../../Shared/Services/notification.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number;
  role !: any;
  constructor(private LocalStorageService : LocalStorageService, private NotificationService: NotificationService) {
    this.currentYear = new Date().getFullYear();
    this.role = this.LocalStorageService.decodeToken()?.Role;
  }

  ngOnInit(): void {
    let obvserverLogin = {
      next: (data: any) => {
        if(data.message == 'login' || data.message == 'signout') {
          this.role = this.LocalStorageService.decodeToken()?.Role;
        }
      },
    };
    this.NotificationService.notifications.subscribe(obvserverLogin);
  }
}
