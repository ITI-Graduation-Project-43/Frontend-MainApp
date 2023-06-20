import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

const routes:Routes = [
  {path:'', component: LoginFormComponent},
  {path:'forgetpassword', component: ForgetPasswordComponent},
  {path:'resetpassword', component: ResetPasswordComponent},
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginRoutingModule { }
