import { Component, OnDestroy } from '@angular/core';
import { APIService } from 'src/app/Shared/Services/api.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {LocalStorageService} from '../../../Shared/Helper/local-storage.service'
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { FormGroup } from '@angular/forms';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-close-accout',
  templateUrl: './close-accout.component.html',
  styleUrls: ['./close-accout.component.scss']
})
export class CloseAccoutComponent implements OnDestroy {
  numberOfStudentCourses : number = 0;
  confirmDeleteForm !: FormGroup;
  dialogRef !: MatDialogRef<ConfirmationComponent>;
  unSubscribe !: Subscription;
  role !: string;

  constructor(private http: APIService, private dialog: MatDialog, private Notification: NotificationService, private LocalStorageService: LocalStorageService) {
    this.role = LocalStorageService.decodeToken().Role;
    this.getStudentCourses();
  }

  getStudentCourses() {
    let observer = {
      next: (data: APIResponseVM) => {
        if(data.success) {
          this.numberOfStudentCourses = data.items.length;
        }
      }
    }
    this.unSubscribe = this.http.getAllItem(`Enrollment/Student/${this.LocalStorageService.getUserInfo().id}`).subscribe(observer);
  }

  confirmation(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {action: "delete", title: "Close your account", button: "Close Account"};
    this.dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.Notification.notify("Your account has been deleted, Goodbye");
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }
}
