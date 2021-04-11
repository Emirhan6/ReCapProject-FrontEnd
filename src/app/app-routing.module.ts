import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CreditCardAddComponent } from './components/credit-card-add/credit-card-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserProfileUpdateComponent } from './components/user-profile-update/user-profile-update.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path:"", pathMatch:"full" , component:HomepageComponent},
  {path:"cars", component:CarComponent},
  {path:"rentals", component:RentalComponent},
  {path:"rentals/add", component:RentalAddComponent, canActivate:[LoginGuard]},
  {path:"cars/brands/:brandId", component:CarComponent},
  {path:"cars/colors/:colorId", component:CarComponent},
  {path:"cars/add", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/update/:carId", component:CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"users", component:UserComponent},
  {path:"users/update", component:UserProfileUpdateComponent},
  {path:"customers", component:CustomerComponent},
  {path:"users/update/:userId", component:UserComponent},
  {path:"brands/add", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"brands/update/:brandId", component:BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"colors/add", component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"colors/update/:colorId", component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"cars/details", component:CarDetailComponent},
  {path:"cars/getdetailbyid/:carId" , component:CarDetailComponent},
  {path:"creditcards/add", component:CreditCardAddComponent, canActivate:[LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
