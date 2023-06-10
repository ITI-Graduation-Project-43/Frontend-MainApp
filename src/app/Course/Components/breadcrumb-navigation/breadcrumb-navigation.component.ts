import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-navigation',
  templateUrl: './breadcrumb-navigation.component.html',
  styleUrls: ['./breadcrumb-navigation.component.scss'],
})
export class BreadcrumbNavigationComponent {
  @Input() categoryName: string = '';
  @Input() subCategoryName: string = '';
  @Input() topicName: string = '';
  @Input() loading: boolean = true;
}
