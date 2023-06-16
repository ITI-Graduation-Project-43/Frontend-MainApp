import { Component, Input } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { WishList } from 'src/app/Models/wishlist';
import { Enrollment } from 'src/app/Models/enrollment';


@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course:any;
}
