import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
   cars: Car;
   carId:number;
   carName:string;
   brands: Brand[] = [];
   colors: Color[] = [];

   constructor(private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) {
   }

   ngOnInit(): void {
      this.getBrands();
      this.getColors();
      this.createCarUpdateForm();
      this.activatedRoute.params.subscribe(param => {
         this.getCarById(param['carId']);
      });
   }

   getCarById(carId: number) {
      this.carService.getCarById(carId).subscribe(response => {
         this.cars = response.data;

         this.createCarUpdateForm();
      });
   }

   getBrands() {
      this.brandService.getBrands().subscribe(response => {
         this.brands = response.data;
      });
   }

   getColors() {
      this.colorService.getColors().subscribe(response => {
         this.colors = response.data;
      });
   }

   createCarUpdateForm() {
      this.carUpdateForm = this.formBuilder.group({
         carId:[this.carUpdateForm ? this.cars.carId : '',Validators.required],
         carName:[this.carUpdateForm  ? this.cars.carName : '',Validators.required],
         brandId: [this.carUpdateForm ? this.cars.brandId : '', Validators.required],
         colorId: [this.carUpdateForm ? this.cars.colorId : '', Validators.required],
         dailyPrice: [this.carUpdateForm ? this.cars.dailyPrice : '', Validators.required],
         modelYear: [this.carUpdateForm ? this.cars.modelYear : '', Validators.required],
         descriptions: [this.carUpdateForm ? this.cars.descriptions : '', Validators.required],
         findeksPoint: [this.carUpdateForm ? this.cars.findeksPoint : '', Validators.required]
      });
   }

   update() {
      if (this.carUpdateForm.valid) {
        let carModel = Object.assign({}, this.carUpdateForm.value);
        this.carService.update(carModel).subscribe((response) => {
          this.toastrService.success(response.message, 'Başarılı');
        });
      }
    }
}
