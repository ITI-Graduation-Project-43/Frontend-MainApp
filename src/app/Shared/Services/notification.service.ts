import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications = new Subject<{ message: any; type: string }>();

  constructor() {}

  notify(message: any, type: string = 'success') {
    this.notifications.next({ message, type });
  }
}
