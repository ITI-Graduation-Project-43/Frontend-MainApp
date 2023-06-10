import { Component, Input, OnInit } from '@angular/core';
import { EnrollmentItem } from '../../../Models/course';

@Component({
  selector: 'app-enroll-card',
  templateUrl: './enroll-card.component.html',
  styleUrls: ['./enroll-card.component.scss'],
})
export class EnrollCardComponent implements OnInit {
  @Input() enrollmentItems: EnrollmentItem[] = [];
  constructor() {}

  ngOnInit() {}
}
