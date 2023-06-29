import { Component, Input, OnInit } from '@angular/core';
import { Discussion } from 'src/app/Models/discussion';
import { SignalRService } from 'src/app/Services/signalR.service';
import { APIService } from 'src/app/Shared/Services/api.service';

@Component({
  selector: 'app-course-discussion',
  templateUrl: './course-discussion.component.html',
  styleUrls: ['./course-discussion.component.scss'],
})
export class CourseDiscussionComponent implements OnInit {
  discussions: Discussion[] = [];
  newDiscussionContent: string = '';
  newDiscussionParentId?: number;

  @Input() lessonId: number = 0;
  @Input() studentId: string = '';

  constructor(
    private signalRService: SignalRService,
    private apiService: APIService
  ) {}

  ngOnInit() {
    this.loadDisscussion();
    this.signalRService.startConnection().then(() => {
      this.signalRService.addTransferChartDataListener((discussion) => {
        this.discussions.push(discussion);
      });
    });
  }
  async loadDisscussion() {
    this.apiService.getItemById('Discussion/Lesson', 64).subscribe(
      (res) => {
        if (res.success && res.items) {
          this.discussions = res.items;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  startReply(parentId: number) {
    this.newDiscussionParentId = parentId;
  }

  addDiscussion() {
    const newDiscussion: Discussion = {
      id: 0,
      lessonId: this.lessonId,
      userId: this.studentId,
      upvotes: 0,
      content: this.newDiscussionContent,
      parentDiscussionId: this.newDiscussionParentId,
      username: '',
      datetime: new Date(),
      parentContent: '',
    };

    this.apiService.addItem('Discussion', newDiscussion).subscribe(
      (res) => {
        if (res.success && res.items) {
          this.discussions.push(res.items[0]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.newDiscussionContent = '';
  }
}
