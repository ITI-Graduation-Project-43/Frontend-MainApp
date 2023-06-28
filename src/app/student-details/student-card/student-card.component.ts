import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
})
export class StudentCardComponent {
  @Input() student: any[] = [];
  @Input() accounts: any[] = [];

  constructor() {}

  redirectToLink(i: number) {
    window.open(this.accounts[i].accountDomain, '_blank');
  }
}
