import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-excercise-card',
  templateUrl: './excercise-card.component.html',
  styleUrls: ['./excercise-card.component.scss'],
})
export class ExcerciseCardComponent {
  @Input() loading: boolean = true;
}
