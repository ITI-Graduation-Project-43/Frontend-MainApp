import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component: RegisterFormComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RegisterRoutingModule { }
