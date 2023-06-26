import { Component } from '@angular/core';

@Component({
  selector: 'app-creation-done',
  templateUrl: './creation-done.component.html',
  styleUrls: ['./creation-done.component.scss']
})
export class CreationDoneComponent {

  constructor() {
    document.querySelector(".app-header")?.classList.remove("dark-background")

  }
}
