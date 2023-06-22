import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './Components/profile/profile.component';
import { SecurityComponent } from './Components/security/security.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { PrivacyComponent } from './Components/privacy/privacy.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { CloseAccoutComponent } from './Components/close-accout/close-accout.component';
import { ProfileSettingComponent } from './profile-setting.component';
import { DeactivateAccoutComponent } from './Components/deactivate-accout/deactivate-accout.component';

const routes: Routes = [
  {
    path:'',
    component: ProfileSettingComponent,
    children: [
      {path:'', redirectTo: 'profile', pathMatch: 'full'},
      {path:'profile', component: ProfileComponent},
      {path:'security', component: SecurityComponent},
      // {path:'payment', component: PaymentComponent},
      {path:'privacy', component: PrivacyComponent},
      {path:'notifications', component: NotificationsComponent},
      // {path:'deactivateaccount', component: DeactivateAccoutComponent},
      // {path:'closeaccount', component: CloseAccoutComponent}
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileSettingRoutingModule { }
