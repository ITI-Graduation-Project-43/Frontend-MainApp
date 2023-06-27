import { Component } from '@angular/core';

@Component({
  selector: 'app-home-instructor',
  templateUrl: './home-instructor.component.html',
  styleUrls: ['./home-instructor.component.scss']
})
export class HomeInstructorComponent {
  constructor() {
    document.querySelector(".app-header")?.classList.remove("dark-background")
  }
}
