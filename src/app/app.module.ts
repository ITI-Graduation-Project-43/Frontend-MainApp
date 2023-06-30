import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Core/header/header.component';
import { FooterComponent } from './Core/footer/footer.component';
import { ShoppingCartComponent } from './Core/shopping-cart/shopping-cart.component';
import { SnackbarComponent } from './Shared/snackbar/snackbar.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ShoppingCartComponent,
    SnackbarComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [SnackbarComponent, RouterModule],
})
export class AppModule {}
