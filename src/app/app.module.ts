import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CategoryComponent } from './components/category/category.component';
import { NaviComponent } from './components/navi/navi.component';
import { RentalComponent } from './components/rental/rental.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

import {ToastrModule} from "ngx-toastr";
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { UserComponent } from './components/user/user.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { RegisterComponent } from './components/register/register.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandfilterPipe } from './pipes/brandfilter.pipe';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorfilterPipe } from './pipes/colorfilter.pipe';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { UserProfileUpdateComponent } from './components/user-profile-update/user-profile-update.component';
import { CreditCardAddComponent } from './components/credit-card-add/credit-card-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CategoryComponent,
    NaviComponent,
    RentalComponent,
    VatAddedPipe,
    FilterPipePipe,
    CartSummaryComponent,
    CarAddComponent,
    LoginComponent,
    BrandAddComponent,
    ColorAddComponent,
    UserComponent,
    CarUpdateComponent,
    RegisterComponent,
    BrandUpdateComponent,
    BrandfilterPipe,
    ColorUpdateComponent,
    ColorfilterPipe,
    RentalAddComponent,
    UserProfileUpdateComponent,
    CreditCardAddComponent,
    CarDetailComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
