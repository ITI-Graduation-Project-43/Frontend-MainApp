import { Component, Input } from '@angular/core';
import { Instructor } from 'src/app/Models/instructor';

@Component({
  selector: 'app-instructor-card',
  templateUrl: './instructor-card.component.html',
  styleUrls: ['./instructor-card.component.scss'],
})
export class InstructorCardComponent {
  @Input() instructor: Instructor[] = [];
  @Input() accounts: any[] = [];

  constructor() {}
  redirectToLink(i: number) {
    window.open(this.accounts[i].accountDomain, '_blank');
  }
}
