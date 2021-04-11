import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm:FormGroup;
  brands:Brand;
  brandId:Brand;
  brandName:Brand;

  constructor(private brandService:BrandService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandById(params['brandId']);
      }
    });
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandId:[this.brandUpdateForm ? this.brands.brandId : '',Validators.required],
      brandName:[this.brandUpdateForm  ? this.brands.brandName : '',Validators.required],
    })
  }

  getBrandById(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brands = response.data;
      this.createBrandUpdateForm();
    });
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let colorModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(colorModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
      });
    }
  }

}
