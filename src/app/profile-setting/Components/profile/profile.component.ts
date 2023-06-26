import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Shared/Helper/local-storage.service';
import { APIService } from 'src/app/Shared/Services/api.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  informationForm !: FormGroup
  saving : boolean = false;
  newImage : boolean = false;
  user : any;
  role !: string;
  userLinks : any;
  userLinkForm !: FormGroup;
  linksForm !: FormGroup;
  imageData: FormData = new FormData();
  bioLength : number;
  accounts !: {id: number, accountName: string, accountDomain: string}[]

  constructor(private http: APIService, public fb: FormBuilder, private LocalStorageService: LocalStorageService, private Notification: NotificationService) {
    this.user = this.LocalStorageService.getUserInfo();
    this.role = this.LocalStorageService.decodeToken().Role;
    this.bioLength = this.user.bio.length;
    this.createInformationForm();
    this.linksForm = fb.group({});
  }

  ngOnInit(): void {
    let UpdateUserObserver = {
      next: (data: any) => {
        if (data.message == 'new') {
          this.user = this.LocalStorageService.getUserInfo();
          this.role = this.LocalStorageService.decodeToken().Role;
          this.bioLength = this.user.bio.length;
          this.createInformationForm();
          this.getAllAccounts();
        }
      },

    };
    this.Notification.notifications.subscribe(UpdateUserObserver);
  }

  createInformationForm() {
    this.informationForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required, Validators.pattern(/^[a-zA-Z]{3,30}$/)]],
      lastName: [this.user.lastName, [Validators.required, Validators.pattern(/^[a-zA-Z]{3,30}$/)]],
      description: [this.user.description, [Validators.maxLength(2048)]],
      title: [this.user.title, [Validators.maxLength(255)]],
      bio: [this.user.bio, [Validators.maxLength(1000)]],
    })

  }

  get firstName() {
    return this.informationForm.get('firstName')
  }

  get lastName() {
    return this.informationForm.get('lastName')
  }

  get description() {
    return this.informationForm.get('description')
  }

  get title() {
    return this.informationForm.get('title')
  }

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
            if(Object.keys(this.user.accounts).length > 0) {
              for (let userAccount of this.user.accounts) {
                if (userAccount.accountId == account.id) {
                  this.linksForm.addControl(userAccount.accountName, new FormControl(userAccount.accountDomain));
                  userAccountFound = true;
                  break;
                }
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
    if((this.informationForm.valid && this.informationForm.dirty) && (!this.linksForm.valid || !this.linksForm.dirty)) { // basics only
      this.updateBasicsInformation(this.newImage);
    }
    else if((this.linksForm.valid && this.linksForm.dirty) && (!this.informationForm.valid || !this.informationForm.dirty)) { // links only
      this.updatePersonalLinks(this.newImage);
    }
    else if(this.newImage && (!this.linksForm.valid || !this.linksForm.dirty) && (!this.informationForm.valid || !this.informationForm.dirty)) { // image only
      this.uploadImage();
    }
    else { // the rest
      this.updateBasicsInformation(true, this.newImage);
    }
  }

  updateBasicsInformation(isLinksUpdated: boolean = false, isImageUpated: boolean = false) {
    if(this.informationForm.valid && this.informationForm.dirty && !this.saving) {
      this.saving = true;
      let observer = {
        next: (data: any) => {
          if(data.success) {
            this.saving = false;
            if(isLinksUpdated && !isImageUpated) {
              this.updatePersonalLinks(isImageUpated);
            }
            else if(!isLinksUpdated && isImageUpated) {
              this.uploadImage();
            }
            else {
              this.updatePersonalLinks(isImageUpated);
            }
            this.copyBasicsDataToUser();
            this.LocalStorageService.updateUserInfo(this.user);
          }
        },
        complete: () => {
          if(!isLinksUpdated && !isImageUpated) {
            this.Notification.notify("Save!")
          }
        },
        error: () => {
          this.Notification.notify("something wrong!", 'error');
        }
      }
      if(this.role == "Student") {
        delete this.informationForm.value.description;
        delete this.informationForm.value.title;
        this.http.updateItem(`Student/${this.user.id}`, this.informationForm.value).subscribe(observer);
      }
      else {
        this.http.updateItem(`Instructor/${this.user.id}`, this.informationForm.value).subscribe(observer);
      }
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

  updatePersonalLinks(isImageUpated: boolean = false) {
    if(this.linksForm.valid && this.linksForm.dirty && !this.saving) {
      this.saving = true;
      this.copyLinksDataToUserAccounts();
      let observer = {
        next: (data: APIResponseVM) => {
          if(data.success) {
            this.user.accounts = data.items
            this.LocalStorageService.updateUserInfo(this.user);
            if(isImageUpated) {
              this.uploadImage();
            }
            else {
              this.saving = false;
            }
          }
        },
        complete: () => {
          if(!isImageUpated) {
            this.Notification.notify("Save!")
          }
        },
        error: () => {
          this.Notification.notify("something wrong!", 'error');
        }
      }
      //To remove links that have not any id in DB
      for(let i = 0; i < this.user.accounts.length; i++) {
        if(this.user.accounts[i].accountDomain == null) {
          this.user.accounts.splice(i, 1);
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

  changeImage(e: any) {
    const file = e.target.files[0];
    if(file?.type.includes('image')) {
      this.previewImage(file)
    }
  }

  private previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.user.profilePicture = reader.result;
      this.imageData.append('ProfilePictureFile', file, file.name);
      this.newImage = true;
    };
    reader.readAsDataURL(file);
  }

  uploadImage() {
    if(this.newImage) {
      this.saving = true;
      let observer = {
        next: (data: any) => {
          if(data.success) {
            this.LocalStorageService.updateUserInfo(this.user)
            this.saving = false;
          }
        },
        complete: () => {
          this.Notification.notify("Saved!");
        },
        error: () => {
          this.Notification.notify("Something wrong occur", "error");
        }
      }
      this.http.addItem(`${this.role}/UploadImage?id=${this.user.id}`, this.imageData).subscribe(observer);
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
