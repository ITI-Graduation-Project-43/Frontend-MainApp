import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Shared/Helper/local-storage.service';
import { APIService } from 'src/app/Shared/Services/api.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  informationForm !: FormGroup
  saving : boolean = false;
  user : any;
  role !: string;
  userLinks : any;
  userLinkForm !: FormGroup;
  linksForm !: FormGroup;
  bioLength : number;
  accounts !: {id: number, accountName: string, accountDomain: string}[]

  constructor(private http: APIService, private router: Router , private fb: FormBuilder, private LocaStorageService: LocalStorageService, private Notification: NotificationService) {
    this.user = this.LocaStorageService.getUserInfo();
    this.bioLength = this.user.bio.length;
    this.informationForm = fb.group({
      firstName: [this.user.firstName, [Validators.required, Validators.pattern(/^[a-zA-Z]{3,30}$/)]],
      lastName: [this.user.lastName, [Validators.required, Validators.pattern(/^[a-zA-Z]{3,30}$/)]],
      //professionalHeadline: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      bio: [this.user.bio, [Validators.maxLength(100000000)]],
    })

    this.linksForm = fb.group({});
  }

  ngOnInit(): void {
    this.getAllAccounts();
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

  getAllAccounts() {
    let observer = {
      next: (data: any) => {
        if(data.success) {
          this.accounts = data.items;
          for (let account of this.accounts) {
            let userAccountFound = false;
            for (let userAccount of this.user.accounts) {
              if (userAccount.accountId == account.id) {
                this.linksForm.addControl(userAccount.accountName, new FormControl(userAccount.accountDomain));
                userAccountFound = true;
                break;
              }
            }
            if (!userAccountFound) {
              this.linksForm.addControl(account.accountName, new FormControl());
              this.user.accounts.push({accountId: account.id, accountName: account.accountName, accountDomain: ''})
            }
          }
        }
      },
      complete: () => {
      },
      error: () => {
      }
    }
    this.http.getAllItem(`Account`).subscribe(observer);
  }

  save(e: Event) {
    e.preventDefault();
    if((this.informationForm.valid && this.informationForm.dirty) && (!this.linksForm.valid || !this.linksForm.dirty)) {
      this.updateBasicsInformation();
      console.log("only basics")
    }
    else if((this.linksForm.valid && this.linksForm.dirty) && (!this.informationForm.valid || !this.informationForm.dirty)) {
      this.updatePersonalLinks();
      console.log("only links")
    }
    else {
      this.updateBasicsInformation(true);
      console.log("both basics and links");
    }
  }

  updateBasicsInformation(isLinksUpdated: boolean = false) {
    if(this.informationForm.valid && this.informationForm.dirty && !this.saving) {
      this.saving = true;
      let observer = {
        next: (data: any) => {
          if(data.success) {
            this.saving = false;
            if(isLinksUpdated) {
              this.updatePersonalLinks();
            }
            this.copyBasicsDataToUser();
            this.LocaStorageService.updateUserInfo(this.user);
          }
        },
        complete: () => {
          if(!isLinksUpdated) {
            this.Notification.notify("Save!")
          }
        },
        error: () => {
          this.Notification.notify("something wrong!", 'fail');
        }
      }
      this.http.updateItem(`Student/${this.user.id}`, this.informationForm.value).subscribe(observer);
    };
  }

  //Transfer the link data from links form to user.accounts
  private copyLinksDataToUserAccounts() {
    for(let link in this.linksForm.value) {
      for(let userlink of this.user.accounts) {
        if(userlink.accountName == link) {
          userlink.accountDomain = this.linksForm.value[link];
        }
      }
    }
  }

  updatePersonalLinks() {
    if(this.linksForm.valid && this.linksForm.dirty && !this.saving) {
      this.saving = true;
      this.copyLinksDataToUserAccounts();
      let observer = {
        next: (data: any) => {
          if(data.success) {
            this.saving = false;
            this.LocaStorageService.updateUserInfo(this.user);
          }
        },
        complete: () => {
          this.Notification.notify("Save!")
        },
        error: () => {
          this.Notification.notify("something wrong!", 'fail');
        }
      }
      this.http.updateItem(`UserAccount/Accounts`, {userId: this.user.id, userAccounts: this.user.accounts}).subscribe(observer);
    }
  }

  //Transfer the basic data from links form to user.accounts
  private copyBasicsDataToUser() {
    for(let property in this.informationForm.value) {
      this.user[property] = this.informationForm.value[property];
    }
  }

  bold(textarea: HTMLElement) {
    textarea.classList.toggle("fw-bold");
  }

  italic(textarea: HTMLElement) {
    textarea.classList.toggle("fst-italic");
  }

  lengthBio(textareaBio: any) {
    this.bioLength = textareaBio.value.length;
    if(this.bioLength > 1000) {
      textareaBio.value = textareaBio.value.slice(0, 1000);
      this.bioLength = 1000
    }
  }
}
