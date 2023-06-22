import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingComponent } from './profile-setting.component';
import { RouterModule } from '@angular/router';
import { ProfileSettingRoutingModule } from './profile-setting-routing.module';
import { ProfileComponent } from './Components/profile/profile.component';
import { SecurityComponent } from './Components/security/security.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { PrivacyComponent } from './Components/privacy/privacy.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { CloseAccoutComponent } from './Components/close-accout/close-accout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeactivateAccoutComponent } from './Components/deactivate-accout/deactivate-accout.component';
import { ConfirmCloseAccountComponent } from './Components/confirm-close-account/confirm-close-account.component';



@NgModule({
  declarations: [
    ProfileSettingComponent,
    ProfileComponent,
    SecurityComponent,
    PaymentComponent,
    PrivacyComponent,
    NotificationsComponent,
    CloseAccoutComponent,
    DeactivateAccoutComponent,
    ConfirmCloseAccountComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProfileSettingRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileSettingModule { }
