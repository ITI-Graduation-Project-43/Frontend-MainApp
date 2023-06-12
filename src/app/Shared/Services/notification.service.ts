import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications = new Subject<{ message: string; type: string }>();

  constructor() {}

  notify(message: string, type: string = 'success') {
    this.notifications.next({ message, type });
  }
}
