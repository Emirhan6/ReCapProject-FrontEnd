import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import {Car} from 'src/app/models/car'
import { CarImage } from 'src/app/models/carImage';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  car:Car[]=[];
  carImages: CarImage[] = [];

  constructor(private carService:CarService, 
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetails(params["carId"]);
      }
    })
  }

  getCarDetails(carId:number)
  {
    this.carService.getCarDetail(carId).subscribe(response => {
      this.car = response.data;
      console.log(response);
    })
  }

  addToCart(car:Car){
    this.toastrService.success("Sepete Eklendi", car.carName)
    this.cartService.addToCart(car);
 }

}
