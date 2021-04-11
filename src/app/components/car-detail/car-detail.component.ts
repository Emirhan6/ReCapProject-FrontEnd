import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetail: CarDetails;
  cars:Car[]=[];
  carImages: CarImage[] = [];
  imageBaseUrl = 'https://localhost:44389/';

  constructor(
     private activatedRoute: ActivatedRoute,
     private router: Router,
     private carService: CarService,
     private carImageService: CarImageService,
     private authService: AuthService
  ) {
  }

  ngOnInit(): void {
     this.activatedRoute.params.subscribe((params) => {
        if (params['carId']) {
           this.getPhotosByCarId(params['carId']);
           this.getCarDetailById(params['carId']);
        }
     });
  }

  getCarDetailById(id: number) {
     this.carService.getCarsDetailsByCar(id).subscribe(response => {
        this.carDetail =  response.data.find(car => car.carId == id);
     });
  }

  getPhotosByCarId(carId: number) {
     this.carImageService.getCarImagesById(carId).subscribe((response) => {
        this.carImages = response.data;
     });
  }

  getCurrentSliderImageClass(sliderImage: CarImage): string {
     if (this.carImages[0] === sliderImage) {
        return 'carousel-item active';
     }

     return 'carousel-item';
  }

  isAuthenticate(): boolean {
     return this.authService.isAuthenticated();
  }

}
