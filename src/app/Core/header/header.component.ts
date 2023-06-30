import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { ShoppingCartService } from 'src/app/Services/cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APIService } from 'src/app/Shared/Services/api.service';
import { NotificationService } from './../../Shared/Services/notification.service';
import { LocalStorageService } from './../../Shared/Helper/local-storage.service';
import { Router } from '@angular/router';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import { Category } from 'src/app/Models/category';

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
  isShowDivIf = true;
  categories !: Category[];
  subCategories !: any;
  topics !: any;

  constructor(
    private router: Router,
    private cartService: ShoppingCartService,
    private http: APIService,
    private NotificationService: NotificationService,
    private LocalStorageService: LocalStorageService,
  ) {
    this.getCategories();
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
      this.User = this.LocalStorageService.getUserInfo().firstName || this.LocalStorageService.decodeToken().FullName;
      if(this.Role == 'Instructor') {
        this.router.navigateByUrl("/instructor");
      }
    }
  }

  getUser(): void {
    this.checkLogin()
    if(this.login) {
      let obvserver = {
        next: (data: APIResponseVM) => {
          if(data.success) {
            this.LocalStorageService.updateUserInfo(data.items[0]);
            this.NotificationService.notify("getNewUserInformation", "hide");
          }
        },
        error: (error: Error) => {
          console.log(error.message);
        }
      }
      this.http.getItemById(`${this.Role}`, this.Id).subscribe(obvserver);
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

  openCategory(category: HTMLElement) {
    category.classList.add("open");
  }

  closeCategory(category: HTMLElement) {
    category.classList.remove("open");
  }

  getCategories() {
    let obvserver = {
      next: (data: APIResponseVM) => {
        if(data.success) {
          this.categories = data.items;
          this.subCategories = null;
        }
      },
      error: (error: Error) => {
        // console.log(error.message);
      }
    }
    this.http.getAllItem(`category/type/0?PageNumber=1&PageSize=${20}`).subscribe(obvserver);
  }

  getSubCategories(selected: HTMLElement, categoryId: number) {
    for(let category of Array.from(document.querySelectorAll(".categories li"))) {
      category.classList.remove("active");
    }
    selected.classList.add("active");
    let obvserver = {
      next: (data: APIResponseVM) => {
        if(data.success) {
          this.subCategories = data.items;
          this.topics = null;
        }
      },
      error: (error: Error) => {
        console.log(error.message);
      }
    }
    this.http.getAllItem(`Category/ParentSubCategories/${categoryId}`).subscribe(obvserver);

  }

  getTopics(selectedSubCategory: HTMLElement, subCategoryId: number) {
    for(let subcategory of Array.from(document.querySelectorAll(".subcategories li"))) {
      subcategory.classList.remove("active");
    }
    selectedSubCategory.classList.add("active");
    let obvserver = {
      next: (data: APIResponseVM) => {
        if(data.success) {
          this.topics = data.items;
        }
      },
      error: (error: Error) => {
        console.log(error.message);
      }
    }
    this.http.getAllItem(`Category/ParentSubCategories/${subCategoryId}?PageNumber=1&PageSize=${2000}`).subscribe(obvserver);
  }

  showCart() {
    this.cartService.showCart();
  }

  openMenu(menu: HTMLElement) {
    menu.classList.add("open");
  }

  closeMenu(menu: HTMLElement) {
    menu.classList.remove("open");
  }

  openProfileMenu(options: any) {
    options.classList.toggle('active');
  }

  closeProfileMenu(options: any) {
    options.classList.remove('active');
  }

  signout() {
    this.login = false;
    this.Id = this.Role = '';
    this.numberOfCourses = 0;
    this.cartService.clearCart();
    localStorage.clear();
    this.router.navigateByUrl("/login");
    this.NotificationService.notify('signout', 'hide');
  }

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
    let body = document.querySelector("body");
    body?.classList.add("overlay");
    if(body?.classList.contains("overlay")) {
      body?.addEventListener("click", (e) => {
        let currentElement = e.target as HTMLElement;
        if(currentElement.classList.contains("overlay")) {
          this.isShowDivIf = true;
          body?.classList.remove("overlay")
        }
      })
    }
  }
}
