import { Component} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor() {
    document.querySelector(".app-header")?.classList.add("dark-background")
  }
}
