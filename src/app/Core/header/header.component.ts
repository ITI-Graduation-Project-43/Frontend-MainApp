import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { ShoppingCartService } from 'src/app/Services/cart.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Student } from 'src/app/Models/student';
import { Instructor } from 'src/app/Models/instructor';
import { APIService } from 'src/app/Shared/Services/api.service';
import { NotificationService } from './../../Shared/Services/notification.service';
import { LocalStorageService } from './../../Shared/Helper/local-storage.service';
import { Router } from '@angular/router';

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
  User!: Student | Instructor;

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
          this.router.navigateByUrl('/home');
        }
      },
      complete: () => {},
      error: (error: Error) => {
        console.log(error);
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
      complete: () => {
        // console.log("Complete");
      },
      error: (error: Error) => {
        console.log(error);
      },
    };
    this.cartService.getNewItem().subscribe(obvserver);
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

  getUser(): void {
    this.login = this.LocalStorageService.checkTokenExpiration();
    if (this.login) {
      let user = this.LocalStorageService.decodeToken();
      this.Id = user.Id;
      this.Role = user.Role;
      let obvserver = {
        next: (data: any) => {
          if (data) {
            this.User = data.items[0];
          }
        },
        complete: () => {},
        error: (error: Error) => {
          console.log(error);
        },
      };
      this.http.getItemById(`${this.Role}`, this.Id).subscribe(obvserver);
    }
  }

  showCart() {
    this.cartService.showCart();
  }

  openMenu(options: any) {
    options.classList.toggle('active');
  }

  signout() {
    this.login = false;
    localStorage.removeItem('MindMission');
    this.router.navigateByUrl('/home');
  }
}
