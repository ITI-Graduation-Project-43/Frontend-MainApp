import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  constructor(private route: ActivatedRoute) {
    document.querySelector('.app-header')?.classList.remove('dark-background');
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe((f) => {
      const element = document.querySelector('#' + f);
      if (element)
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
    });
  }
}
