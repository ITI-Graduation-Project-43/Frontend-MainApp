import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { ShoppingCartService } from 'src/app/Services/cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APIService } from 'src/app/Shared/Services/api.service';
import { NotificationService } from './../../Shared/Services/notification.service';
import { LocalStorageService } from './../../Shared/Helper/local-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  numberOfCourses: number;
  helper: JwtHelperService = new JwtHelperService();
  login!: boolean;
  Id!: string;
  Role!: string;
  User: any;

  constructor(
    private router: Router,
    private cartService: ShoppingCartService,
    private http: APIService,
    private NotificationService: NotificationService,
    private LocalStorageService: LocalStorageService
  ) {
    this.numberOfCourses = this.cartService.getItems().length;
    this.getUser();
  }

  ngOnInit(): void {
    let obvserverLogin = {
      next: (data: any) => {
        if (data.message == 'login') {
          this.getUser();
          if (this.Role == 'Student') {
            this.router.navigateByUrl('/home');
          }
          if (this.Role == 'Instructor') {
            this.router.navigateByUrl('/instructor');
          }
        }
        if(data.message == 'newName') {
          this.User = this.LocalStorageService.getUserInfo().firstName;
        }
        if(data.message == 'Your account has been deleted, Goodbye' || data.message == 'Your account has been deactivated, see you soon') {
          this.signout();
        }
      },
      error: () => {
        this.NotificationService.notify("Something wrong during load the page content");
      },
    };
    this.NotificationService.notifications.subscribe(obvserverLogin);

    let obvserver = {
      next: (newCourse: Course) => {
        if (newCourse) {
          this.numberOfCourses = this.cartService.getItems().length;
          this.ngAfterViewInit();
        }
      },
      error: () => {
        this.NotificationService.notify("Something wrong during load the page content");
      },
    };
    this.cartService.getNewItem().subscribe(obvserver);
  }

  checkLogin() {
    this.login = this.LocalStorageService.checkTokenExpiration();
    if (this.login) {
      let user = this.LocalStorageService.decodeToken();
      this.Id = user.Id;
      this.Role = user.Role;
      this.User = user.FullName;
    }
  }

  getUser(): void {
    this.checkLogin()
    if(this.login) {
      let obvserver = {
        next: (data: APIResponseVM) => {
          if(data.success) {
            this.LocalStorageService.updateUserInfo(data.items[0])
          }
        },
        error: (error: Error) => {
          console.log(error.message);
        }
      }
      this.http.getItemById(`${this.Role}`, this.Id).subscribe(obvserver)
    }
  }

  ngAfterViewInit(): void {
    let spin = document.querySelector('.numberOfItems');
    if (spin != null) {
      spin.textContent = this.numberOfCourses.toString();
    }
    if (this.numberOfCourses > 0) {
      spin?.classList.add('active');
    }
  }

  showCart() {
    this.cartService.showCart();
  }

  openMenu(options: any) {
    options.classList.toggle('active');
  }

  closeMenu(options: any) {
    options.classList.remove('active');
  }

  signout() {
    this.login = false;
    this.Id = this.Role = '';
    this.numberOfCourses = 0;
    this.cartService.clearCart();
    localStorage.removeItem('MindMission');
    localStorage.removeItem('cart')
    localStorage.removeItem('privacy')
    localStorage.removeItem('creditCard')
    localStorage.removeItem('notifications')
    this.router.navigateByUrl("/login");
  }
}
