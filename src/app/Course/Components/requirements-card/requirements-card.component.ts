import { Component, Input, OnInit } from '@angular/core';
import { CourseRequirement } from 'src/app/Models/course';

@Component({
  selector: 'app-requirements-card',
  templateUrl: './requirements-card.component.html',
  styleUrls: ['./requirements-card.component.scss'],
})
export class RequirementsCardComponent implements OnInit {
  @Input() courseRequirements: CourseRequirement[] = [];
  @Input() loading: boolean = true;

  constructor() {}

  ngOnInit() {}
}
