import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands : Brand[]=[];
  currentBrand:Brand;
  dataLoaded:false;
  filterText="";
  constructor(private brandService:BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand= brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  delete(brand:Brand) {
    this.brandService.delete(brand).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.getBrands();
    });
  }

}
