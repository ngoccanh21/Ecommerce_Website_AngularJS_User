import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChitietspComponent } from './components/chitietsp/chitietsp.component';
import { LoaisanphamComponent } from './components/loaisanpham/loaisanpham.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LienheComponent } from './components/lienhe/lienhe.component';
import { LoginComponent } from './components/login/login.component';
import { ChitiettintucComponent } from './components/chitiettintuc/chitiettintuc.component';
import { TintucComponent } from './components/tintuc/tintuc.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ChitietspComponent,
    LoaisanphamComponent,
    CartComponent,
    CheckoutComponent,
    LienheComponent,
    LoginComponent,
    ChitiettintucComponent,
    TintucComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
