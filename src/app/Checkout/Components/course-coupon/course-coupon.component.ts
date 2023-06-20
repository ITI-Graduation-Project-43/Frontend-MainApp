import { Component, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { APIService } from 'src/app/Shared/Services/api.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import { CheckoutService } from '../../Services/checkout.service';



@Component({
  selector: 'app-course-coupon',
  templateUrl: './course-coupon.component.html',
  styleUrls: ['./course-coupon.component.scss']
})
export class CourseCouponComponent {
  closeResult = '';
  code!: string;
  @Input() courseId!: number;
  @Input() courseTitle!: string;



  constructor(private modalService: NgbModal,
    private apiService: APIService,
    private notification: NotificationService,
    private checkoutService: CheckoutService) { }

  open(content: any) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  checkCoupon() {
    this.apiService.getAllItem(`Coupon/course/${this.code}?courseId=${this.courseId}`).subscribe((data: APIResponseVM) => {
      if (this.checkoutService.courseCoupons.indexOf({ courseId: this.courseId, couponCode: this.code }) != -1)
        this.checkoutService.courseCoupons.push({ courseId: this.courseId, couponCode: this.code });
      this.notification.notify("valid coupon");
      this.modalService.dismissAll();
      console.log(this.checkoutService.paymentObj);
    }, (error) => {
      this.notification.notify("Invalid coupon");
      this.modalService.dismissAll();
    })
  }

  editCourseDiscount() {
    this.apiService.updateItem("Course", {}).subscribe((data: APIResponseVM) => {

    })
  }
}
