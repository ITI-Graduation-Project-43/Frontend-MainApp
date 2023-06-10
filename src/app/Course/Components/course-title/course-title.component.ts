import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-title',
  templateUrl: './course-title.component.html',
  styleUrls: ['./course-title.component.scss'],
})
export class CourseTitleComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() loading: boolean = true;
}
