import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Shared/Helper/local-storage.service';
import { APIService } from 'src/app/Shared/Services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  informationForm !: FormGroup
  saving : boolean = false;
  user : any;
  userLinks : any;
  userLinkForm !: FormGroup;

  constructor(private http: APIService, private router: Router , private fb: FormBuilder, private LocaStorageService: LocalStorageService) {
    this.user = this.LocaStorageService.getUserInfo();
    this.loadUserLinks();
    this.informationForm = fb.group({
      firstName: [this.user.firstName, [Validators.required, Validators.pattern(/^[a-zA-Z]{3,10}$/)]],
      lastName: [this.user.lastName, [Validators.required, Validators.pattern(/^[a-zA-Z]{3,10}$/)]],
      // professionalHeadline: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      bio: [this.user.bio, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)]],
    })
  }

  get firstName() {
    return this.informationForm.get('firstName')
  }
  get lastName() {
    return this.informationForm.get('lastName')
  }
  // get professionalHeadline() {
  //   return this.informationForm.get('professionalHeadline')
  // }
  get bio() {
    return this.informationForm.get('bio')?.value
  }

  loadUserLinks() {
    let observer = {
      next: (data: any) => {
        if(data.success) {
          this.userLinkForm = this.fb.group({
            website: [''],
            linkedin: [data.items[1].accountLink],
            twitter: [data.items[2].accountLink],
            youtube: [''],
          })
        }
      },
      complete: () => {
      },
      error: () => {
      }
    }
    this.http.getItemById("UserAccount/UserAccount", this.user.id).subscribe(observer);
  }

  save(e: Event, submit: HTMLElement) {
    e.preventDefault();
  }
}
