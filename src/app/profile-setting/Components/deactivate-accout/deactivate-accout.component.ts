import { Component } from '@angular/core';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import {LocalStorageService} from '../../../Shared/Helper/local-storage.service'
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deactivate-accout',
  templateUrl: './deactivate-accout.component.html',
  styleUrls: ['./deactivate-accout.component.scss']
})
export class DeactivateAccoutComponent {
  dialogRef !: MatDialogRef<ConfirmationComponent>;
  unSubscribe !: Subscription;
  role !: string;

  constructor(private dialog: MatDialog, private Notification: NotificationService, private LocalStorageService: LocalStorageService) {
    this.role = LocalStorageService.decodeToken().Role;
  }

  confirmation(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {action: "deactivate", title: "Deactivate your account", button: "Deactivate"};
    this.dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.Notification.notify('Your account has been deactivated, see you soon');
      }
    });
  }
}
