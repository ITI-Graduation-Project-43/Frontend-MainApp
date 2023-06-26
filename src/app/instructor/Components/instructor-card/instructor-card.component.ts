import { Component, Input } from '@angular/core';
import { Instructor } from 'src/app/Models/instructor';

@Component({
  selector: 'app-instructor-card',
  templateUrl: './instructor-card.component.html',
  styleUrls: ['./instructor-card.component.scss'],
})
export class InstructorCardComponent {
  @Input() instructor: Instructor[] = [];

  constructor() {}
  redirectToGitHub() {
    window.open(this.instructor[0].accounts.GitHub, '_blank');
  }
  redirectToLinkedin() {
    window.open(this.instructor[0].accounts.Linkedin, '_blank');
  }
  redirectToTwitter() {
    window.open(this.instructor[0].accounts.Twitter, '_blank');
  }
}
