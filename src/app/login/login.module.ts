import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    ForgetPasswordComponent,
    LoginFormComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
