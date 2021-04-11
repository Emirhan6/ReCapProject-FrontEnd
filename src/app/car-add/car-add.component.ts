import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;
  // brands: Brand[] = [];
  // colors: Color[] = [];
  
  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService) { }

    ngOnInit(): void {
      // this.getBrands();
      // this.getColors();
      this.createCarAddForm();
    }
  
    createCarAddForm() {
      this.carAddForm = this.formBuilder.group({
        carName:['',Validators.required], 
        brandId: ['', Validators.required],
        colorId: ['', Validators.required],
        modelYear: ['', Validators.required],
        dailyPrice: ['', Validators.required],
        descriptions: ['', Validators.required],
        findeksPoint:['',Validators.required]
      });
    }
  
    add() {
      let carModule = Object.assign({}, this.carAddForm.value);
      if (this.carAddForm.valid) {
        this.carService.add(carModule).subscribe(
          (response) => {
            console.log(response);
            this.toastrService.success(response.message, 'Başarılı');
          },
          (responseError) => {
            if (responseError.error.ValidationErrors != undefined) {
              for (
                let i = 0;
                i < responseError.error.ValidationErrors.length;
                i++
              ) {
                this.toastrService.error(
                  responseError.error.ValidationErrors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            } else {
              this.toastrService.error(responseError.error.Message, 'Uyarı');
            }
          }
        );
      } else {
        this.toastrService.error('Formunuz eksik', 'Dikkat!');
      }
    }
  
    // getColors() {
    //   this.colorService.getColors().subscribe((response) => {
    //     this.colors = response.data;
    //   });
    // }
  
    // getBrands() {
    //   this.brandService.getBrands().subscribe((response) => {
    //     this.brands = response.data;
    //   });
    // }

}
