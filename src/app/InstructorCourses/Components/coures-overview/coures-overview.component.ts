import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Language } from 'src/app/Models/Enums/CourseLanguage';
import { Level } from 'src/app/Models/Enums/CourseLevel';
import { mapEnumValue } from 'src/app/Shared/Helper/EnumMapper';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-coures-overview',
  templateUrl: './coures-overview.component.html',
  styleUrls: ['./coures-overview.component.scss'],
})
export class CouresOverviewComponent implements OnInit {
  courseId: number = 11;
  course: any[] = [];
  constructor(private apiService: APIService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.courseId = +params['id'];
      this.apiService.getItemById('Course', this.courseId).subscribe(
        (data: APIResponseVM) => {
          this.course = data.items;
          this.course[0].language = mapEnumValue(
            Language,
            this.course[0].language
          );
          this.course[0].level = mapEnumValue(Level, this.course[0].level);
          console.log(this.course);
        },
        (err) => console.log(err)
      );
    });
  }
}
