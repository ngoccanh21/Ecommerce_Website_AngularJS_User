import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ChitietspComponent } from './components/chitietsp/chitietsp.component';
import { ChitiettintucComponent } from './components/chitiettintuc/chitiettintuc.component';
import { HomeComponent } from './components/home/home.component';
import { LienheComponent } from './components/lienhe/lienhe.component';
import { LoaisanphamComponent } from './components/loaisanpham/loaisanpham.component';
import { LoginComponent } from './components/login/login.component';
import { TintucComponent } from './components/tintuc/tintuc.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'chitietsp/:id',component:ChitietspComponent},
  {path:'loaisanpham',component:LoaisanphamComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'lienhe',component:LienheComponent},
  {path:'login',component:LoginComponent},
  {path:'tintuc',component:TintucComponent},
  {path:'chitiettintuc/:id',component:ChitiettintucComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
