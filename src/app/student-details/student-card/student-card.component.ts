import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
})
export class StudentCardComponent {
  @Input() student: any[] = [];

  constructor() {}
  redirectToGitHub() {
    window.open(this.student[0].accounts.GitHub, '_blank');
  }
  redirectToLinkedin() {
    window.open(this.student[0].accounts.Linkedin, '_blank');
  }
  redirectToTwitter() {
    window.open(this.student[0].accounts.Twitter, '_blank');
  }
}
