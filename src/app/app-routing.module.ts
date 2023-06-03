import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './Core/header/header.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: "", redirectTo: 'header', pathMatch: 'full' },
  {path: "header", component: HeaderComponent},
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
